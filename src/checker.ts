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
  // Strip outer IPv6 brackets [::1] => ::1
  const host = hostname.toLowerCase().trim().replace(/^\[|\]$/g, '')

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

  // IPv6 & IPv4-Mapped IPv6 check
  if (
    host === '::1' ||
    host === '::' ||
    host.startsWith('::ffff:') ||
    host.startsWith('fc') ||
    host.startsWith('fd') ||
    host.startsWith('fe80')
  ) {
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

export async function checkUrl(rawAddress: string, timeoutSec = 10, lang: 'zh' | 'en' = 'zh'): Promise<CheckResult> {
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
      reason: lang === 'en' ? 'Invalid URL format' : '網址格式不正確，請輸入合法的 HTTP 或 HTTPS 網址',
      exit_code: 2,
    }
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return {
      url: address,
      target_host: url.hostname,
      patch_status: 'unknown',
      php_version: null,
      reason: lang === 'en' ? 'Use an http:// or https:// URL' : '僅支援 http:// 或 https:// 網址',
      exit_code: 2,
    }
  }

  if (url.username || url.password || url.hash) {
    return {
      url: address,
      target_host: url.hostname,
      patch_status: 'unknown',
      php_version: null,
      reason: lang === 'en' ? 'URL credentials and fragments are not supported' : '不支援帶有帳密憑證或錨點 (#) 的網址',
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
      reason: lang === 'en'
        ? `Blocked by SSRF security policy: private or loopback host (${url.hostname}) is prohibited`
        : `SSRF 安全防護阻擋：禁止探測本機回環或內網私有 IP (${url.hostname})`,
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

      // Don't read response body
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
      errorMsg = err.message || (lang === 'en' ? 'Connection failed or timeout' : '連線失敗或逾時')
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

  let reason = errorMsg || (lang === 'en' ? 'PHP version not found in HTTP headers' : '未在伺服器回應標頭中發現 PHP 版本標記（可能已關閉標頭曝光）')
  if (detectedVersion && !errorMsg) {
    if (lang === 'en') {
      reason =
        finalStatus === 'ok'
          ? `PHP ${detectedVersion}: advertised version meets an upstream fixed release. Installed build not verified.`
          : `PHP ${detectedVersion}: ${finalStatus === 'potentially_vulnerable' ? 'Potentially vulnerable. ' : ''}` +
            'HTTP headers cannot tell whether this version contains a backported fix.'
    } else {
      reason =
        finalStatus === 'ok'
          ? `PHP ${detectedVersion}：伺服器宣告之版本符合官方修復標準（8.2.35、8.3.36、8.4.27、8.5.12 以上）。注意：HTTP 標頭無法驗證底層安裝檔是否遭竄改。`
          : `PHP ${detectedVersion}：【潛在受威脅】此版本低於官方修復基準或為已終止支援之舊分支。注意：HTTP 標頭無法確認 Linux 發行版是否已套用 backport 修補。`
    }
  }

  let remediation: string | undefined = undefined
  if (finalStatus === 'potentially_vulnerable') {
    if (lang === 'en') {
      remediation =
        'Remediation Recommendations:\n' +
        '1. Upstream PHP: Upgrade to 8.2.35, 8.3.36, 8.4.27, or 8.5.12.\n' +
        '2. Debian / Ubuntu: sudo apt-get update && sudo apt-get --only-upgrade install php*-fpm (or libapache2-mod-php*)\n' +
        '3. RHEL / Rocky: sudo dnf upgrade php*'
    } else {
      remediation =
        '即用型修復建議：\n' +
        '1. 官方版本：立即升級至 PHP 8.2.35、8.3.36、8.4.27 或 8.5.12 以上。\n' +
        '2. Debian / Ubuntu：執行 sudo apt-get update && sudo apt-get --only-upgrade install php*-fpm (或 libapache2-mod-php*)\n' +
        '3. RHEL / Rocky / AlmaLinux：執行 sudo dnf upgrade php*'
    }
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
    remediation,
    exit_code: exitCodeMap[finalStatus] ?? 3,
    headers_summary: rawHeadersText || (lang === 'en' ? 'None detected' : '未偵測到標頭'),
    checked_at: new Date().toISOString(),
  }
}
