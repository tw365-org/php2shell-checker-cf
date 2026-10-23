const assert = require('node:assert/strict')
const { test } = require('node:test')

// Test SSRF blocking rules logic
function isPrivateOrBlockedHost(hostname) {
  const host = hostname.toLowerCase().trim().replace(/^\[|\]$/g, '')
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
  assert.equal(isPrivateOrBlockedHost('[::1]'), true)
  assert.equal(isPrivateOrBlockedHost('[::ffff:7f00:1]'), true)
  assert.equal(isPrivateOrBlockedHost('fe80::1'), true)
  assert.equal(isPrivateOrBlockedHost('fc00::1'), true)
})

test('SSRF Guard permits public domains', () => {
  assert.equal(isPrivateOrBlockedHost('example.com'), false)
  assert.equal(isPrivateOrBlockedHost('php.net'), false)
  assert.equal(isPrivateOrBlockedHost('1.1.1.1'), false)
  assert.equal(isPrivateOrBlockedHost('8.8.8.8'), false)
})

// ----------------------------------------------------
// Test Retro Theme Whitelist & Fallback Logic
// ----------------------------------------------------
const VALID_THEMES = ['obsidian', 'vt100', 'amber', 'dracula', 'solarized', 'win95']
const THEME_FAVICONS = {
  obsidian: '#10b981',
  vt100: '#33ff33',
  amber: '#ffb000',
  dracula: '#bd93f9',
  solarized: '#2aa198',
  win95: '#000080'
}

function resolveTheme(param) {
  return (param && VALID_THEMES.includes(param)) ? param : 'obsidian'
}

function getThemeFaviconColor(theme) {
  return THEME_FAVICONS[resolveTheme(theme)]
}

test('Theme Engine validates whitelisted themes and falls back to obsidian', () => {
  assert.equal(resolveTheme('obsidian'), 'obsidian')
  assert.equal(resolveTheme('vt100'), 'vt100')
  assert.equal(resolveTheme('amber'), 'amber')
  assert.equal(resolveTheme('dracula'), 'dracula')
  assert.equal(resolveTheme('solarized'), 'solarized')
  assert.equal(resolveTheme('win95'), 'win95')
  assert.equal(resolveTheme('unknown-theme'), 'obsidian')
  assert.equal(resolveTheme(null), 'obsidian')
  assert.equal(resolveTheme(''), 'obsidian')
})

test('Theme Engine maps correct vector Favicon hex colors', () => {
  assert.equal(getThemeFaviconColor('vt100'), '#33ff33')
  assert.equal(getThemeFaviconColor('amber'), '#ffb000')
  assert.equal(getThemeFaviconColor('win95'), '#000080')
  assert.equal(getThemeFaviconColor('dracula'), '#bd93f9')
  assert.equal(getThemeFaviconColor('invalid'), '#10b981')
})


test('Client scripts in src/ui.ts parse with zero syntax errors', () => {
  const fs = require('node:fs')
  const path = require('node:path')
  const uiPath = path.join(__dirname, '..', 'src', 'ui.ts')
  const uiContent = fs.readFileSync(uiPath, 'utf8')
  
  const scriptRegex = /<script(?![^>]*src=)>([\s\S]*?)<\/script>/g
  let match
  let count = 0
  while ((match = scriptRegex.exec(uiContent)) !== null) {
    let scriptCode = match[1]
    scriptCode = scriptCode.split('\\`').join('`')
    scriptCode = scriptCode.split('\\${').join('__ESCAPED_DOLLAR__')
    scriptCode = scriptCode.replace(/\${[^}]+}/g, '""')
    scriptCode = scriptCode.split('__ESCAPED_DOLLAR__').join('${')
    
    assert.doesNotThrow(() => {
      new Function(scriptCode)
    }, `Inline script #${count + 1} has syntax error`)
    count++
  }
  assert.ok(count >= 2, 'Should find and validate at least 2 inline scripts')
})


// ----------------------------------------------------
// Strict URL Normalization & Validation Tests
// ----------------------------------------------------
function validateStrictAddress(raw) {
  const address = (raw || '').trim()
  if (!address || /\s/.test(address)) {
    return { ok: false, exit_code: 2, error: 'Whitespace prohibited' }
  }
  let url
  try {
    const target = (address.startsWith('http://') || address.startsWith('https://')) ? address : `https://${address}`
    url = new URL(target)
  } catch {
    return { ok: false, exit_code: 2, error: 'Invalid URL format' }
  }
  if (!url.hostname || url.hostname.includes(' ') || (!url.hostname.includes('.') && url.hostname !== 'localhost' && !/^(\d{1,3}\.){3}\d{1,3}$/.test(url.hostname))) {
    return { ok: false, exit_code: 2, error: 'Invalid hostname' }
  }
  return { ok: true, url: url.toString(), host: url.hostname }
}

test('Strict URL Validator rejects addresses with spaces (php.n e t 44555)', () => {
  assert.equal(validateStrictAddress('php.n e t 44555').ok, false)
  assert.equal(validateStrictAddress('php.n e t 44555').exit_code, 2)
  assert.equal(validateStrictAddress('php.net 8080').ok, false)
  assert.equal(validateStrictAddress('php.net 44555').ok, false)
  assert.equal(validateStrictAddress('   ').ok, false)
  assert.equal(validateStrictAddress('').ok, false)
})

test('Strict URL Validator accepts valid domain names, ports and URLs', () => {
  assert.equal(validateStrictAddress('php.net').ok, true)
  assert.equal(validateStrictAddress('https://php.net').ok, true)
  assert.equal(validateStrictAddress('example.com:8443').ok, true)
  assert.equal(validateStrictAddress('1.1.1.1').ok, true)
  assert.equal(validateStrictAddress('localhost').ok, true)
})
