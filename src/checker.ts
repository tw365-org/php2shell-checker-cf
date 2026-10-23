import { CheckResult, PatchStatus } from './types'

// Official PHP releases fixing both CVEs (CVE-2026-109618 and CVE-2026-109619), published 2026-10-21.
export const FIXED_IN: Record<string, number> = {
  '8.2': 35,
  '8.3': 36,
  '8.4': 27,
  '8.5': 12,
}

export const OLDER_BRANCHES = new Set([
  '5.4', '5.5', '5.6',
  '7.0', '7.1', '7.2', '7.3', '7.4',
  '8.0', '8.1',
])

/**
 * Validates if a hostname or IP is safe to query (SSRF Defense).
 */
export function isPrivateOrBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim()

  // Common local domains
  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === 'metadata.google.internal' ||
    host === 'instance-data'
  ) {
    return true
  }

  // IPv4 regex check
  const ipv4Match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host)
  if (ipv4Match) {
    const octets = [
      Number(ipv4Match[1]),
      Number(ipv4Match[2]),
      Number(ipv4Match[3]),
      Number(ipv4Match[4]),
    ]
    if (octets.some((o) => o > 255)) return true

    const [a, b] = octets
    // 127.0.0.0/8 Loopback
    if (a === 127) return true
    // 0.0.0.0/8
    if (a === 0) return true
    // 10.0.0.0/8 Private
    if (a === 10) return true
    // 172.16.0.0/12 Private
    if (a === 172 && b >= 16 && b <= 31) return true
    // 192.168.0.0/16 Private
    if (a === 192 && b === 168) return true
    // 169.254.0.0/16 Link-Local / Cloud Metadata
    if (a === 169 && b === 254) return true
    // 100.64.0.0/10 Carrier-grade NAT
    if (a === 100 && b >= 64 && b <= 127) return true
  }

  // IPv6 check
  if (host === '::1' || host === '::' || host.startsWith('fc') || host.startsWith('fd') || host.startsWith('fe80')) {
    return true
  }

  return false
}

export function versionStatus(version: string | null): PatchStatus {
  if (!version) return 'unknown'
  const match = /^(\d+)\.(\d+)\.(\d+)([-+~].*)?$/.exec(version.trim())
  if (!match) return 'unknown'

  // Prerelease / dev builds
  if (/(?:^|[-+~.])(?:dev|alpha|beta|rc)/i.test(match[4] || '')) return 'unknown'

  const branch = `${Number(match[1])}.${Number(match[2])}`
  if (OLDER_BRANCHES.has(branch)) return 'potentially_vulnerable'

  const fixed = FIXED_IN[branch]
  if (fixed === undefined) return 'unknown'
  if (Number(match[3]) < fixed) return 'potentially_vulnerable'

  return 'ok'
}

export async function checkUrl(rawAddress: string, timeoutSec = 10): Promise<CheckResult> {
  const address = rawAddress.trim()
  let url: URL
  try {
    if (!address.startsWith('http://') && !address.startsWith('https://')) {
      url = new URL(`https://${address}`)
    } else {
      url = new URL(address)
    }
  } catch {
    return {
      url: address,
      target_host: 'invalid',
      patch_status: 'unknown',
      php_version: null,
      reason: 'Invalid URL format',
      exit_code: 2,
    }
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return {
      url: address,
      target_host: url.hostname,
      patch_status: 'unknown',
      php_version: null,
      reason: 'Use an http:// or https:// URL',
      exit_code: 2,
    }
  }

  if (url.username || url.password || url.hash) {
    return {
      url: address,
      target_host: url.hostname,
      patch_status: 'unknown',
      php_version: null,
      reason: 'URL credentials and fragments are not supported',
      exit_code: 2,
    }
  }

  // SSRF Protection
  if (isPrivateOrBlockedHost(url.hostname)) {
    return {
      url: address,
      target_host: url.hostname,
      patch_status: 'unknown',
      php_version: null,
      reason: `Blocked by SSRF security policy: private or loopback host (${url.hostname}) is prohibited`,
      exit_code: 2,
    }
  }

  const headersGathered: string[] = []
  let errorMsg: string | null = null

  for (const method of ['HEAD', 'GET']) {
    try {
      const response = await fetch(url.toString(), {
        method,
        redirect: 'manual',
        headers: {
          'User-Agent': 'php2shell-checker/1.0 (+https://github.com/tw365-org/php2shell-checker-cf)',
        },
        signal: AbortSignal.timeout(Math.min(Math.max(timeoutSec, 1), 30) * 1000),
      })

      const serverHeader = response.headers.get('server') || ''
      const poweredByHeader = response.headers.get('x-powered-by') || ''
      if (serverHeader) headersGathered.push(`Server: ${serverHeader}`)
      if (poweredByHeader) headersGathered.push(`X-Powered-By: ${poweredByHeader}`)

      // Don't read the response body to avoid loading unnecessary bytes
      if (response.body) {
        try {
          await response.body.cancel()
        } catch {
          // ignore
        }
      }

      // If HEAD returns standard response, stop; only fallback to GET if 405 or 501
      if (![405, 501].includes(response.status)) {
        break
      }
    } catch (err: any) {
      errorMsg = err.message || 'Connection failed or timeout'
      break
    }
  }

  const rawHeadersText = headersGathered.join('\n')
  let detectedVersion: string | null = null
  let finalStatus: PatchStatus = 'unknown'

  for (const match of rawHeadersText.matchAll(/\bPHP[ /]([^\s,;)]+)/gi)) {
    const candidateVersion = match[1]
    const candidateStatus = versionStatus(candidateVersion)

    if (detectedVersion === null || candidateStatus === 'potentially_vulnerable' || finalStatus === 'ok') {
      detectedVersion = candidateVersion
      finalStatus = candidateStatus
    }
    if (finalStatus === 'potentially_vulnerable') break
  }

  let reason = errorMsg || 'PHP version not found in HTTP headers'
  if (detectedVersion && !errorMsg) {
    reason =
      finalStatus === 'ok'
        ? `PHP ${detectedVersion}: advertised version meets an upstream fixed release. Installed build not verified.`
        : `PHP ${detectedVersion}: ${finalStatus === 'potentially_vulnerable' ? 'Potentially vulnerable. ' : ''}` +
          'HTTP headers cannot tell whether this version contains a backported fix.'
  }

  const exitCodeMap: Record<PatchStatus, number> = {
    ok: 0,
    potentially_vulnerable: 1,
    unknown: 3,
  }

  return {
    url: address,
    target_host: url.hostname,
    patch_status: finalStatus,
    php_version: detectedVersion,
    reason,
    exit_code: exitCodeMap[finalStatus] ?? 3,
    headers_summary: rawHeadersText || 'None detected',
    checked_at: new Date().toISOString(),
  }
}
