// Cloudflare Workers Web Crypto Native Auth Helper

export async function sha256(str: string): Promise<string> {
  const enc = new TextEncoder()
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256(`${password}:${salt}`)
}

export function generateSalt(): string {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(str: string): string {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4) b64 += '='
  return atob(b64)
}

export async function createJwt(payload: Record<string, any>, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encHeader = base64UrlEncode(JSON.stringify(header))
  const encPayload = base64UrlEncode(JSON.stringify(payload))
  const data = `${encHeader}.${encPayload}`

  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuf = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  const signature = base64UrlEncode(
    String.fromCharCode(...new Uint8Array(signatureBuf))
  )

  return `${data}.${signature}`
}

export async function verifyJwt(token: string, secret: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [headerB64, payloadB64, signatureB64] = parts
    const data = `${headerB64}.${payloadB64}`

    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    // Decode signature
    const sigStr = base64UrlDecode(signatureB64)
    const sigBytes = new Uint8Array(sigStr.length)
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i)
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data))
    if (!isValid) return null

    const payload = JSON.parse(base64UrlDecode(payloadB64))
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null // Expired
    }
    return payload
  } catch {
    return null
  }
}
