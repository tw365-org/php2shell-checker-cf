const assert = require('node:assert/strict')
const { test } = require('node:test')

// Test SSRF blocking rules logic
function isPrivateOrBlockedHost(hostname) {
  const host = hostname.toLowerCase().trim()
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
    if (a === 127) return true
    if (a === 0) return true
    if (a === 10) return true
    if (a === 172 && b >= 16 && b <= 31) return true
    if (a === 192 && b === 168) return true
    if (a === 169 && b === 254) return true
    if (a === 100 && b >= 64 && b <= 127) return true
  }

  if (host === '::1' || host === '::' || host.startsWith('fc') || host.startsWith('fd') || host.startsWith('fe80')) {
    return true
  }

  return false
}

test('SSRF Guard blocks localhost and local aliases', () => {
  assert.equal(isPrivateOrBlockedHost('localhost'), true)
  assert.equal(isPrivateOrBlockedHost('sub.localhost'), true)
  assert.equal(isPrivateOrBlockedHost('my-corp.local'), true)
  assert.equal(isPrivateOrBlockedHost('database.internal'), true)
  assert.equal(isPrivateOrBlockedHost('metadata.google.internal'), true)
})

test('SSRF Guard blocks private IPv4 loopback and RFC1918 ranges', () => {
  assert.equal(isPrivateOrBlockedHost('127.0.0.1'), true)
  assert.equal(isPrivateOrBlockedHost('127.1.2.3'), true)
  assert.equal(isPrivateOrBlockedHost('10.0.0.1'), true)
  assert.equal(isPrivateOrBlockedHost('172.16.0.5'), true)
  assert.equal(isPrivateOrBlockedHost('172.31.255.255'), true)
  assert.equal(isPrivateOrBlockedHost('192.168.1.1'), true)
  assert.equal(isPrivateOrBlockedHost('169.254.169.254'), true)
})

test('SSRF Guard blocks IPv6 loopback & link-local', () => {
  assert.equal(isPrivateOrBlockedHost('::1'), true)
  assert.equal(isPrivateOrBlockedHost('fe80::1'), true)
  assert.equal(isPrivateOrBlockedHost('fc00::1'), true)
})

test('SSRF Guard permits public domains', () => {
  assert.equal(isPrivateOrBlockedHost('example.com'), false)
  assert.equal(isPrivateOrBlockedHost('php.net'), false)
  assert.equal(isPrivateOrBlockedHost('1.1.1.1'), false)
  assert.equal(isPrivateOrBlockedHost('8.8.8.8'), false)
})
