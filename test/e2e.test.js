const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const { test, before, after } = require('node:test')

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:8787'
let devServerChild = null

async function isServerReady(url) {
  try {
    const res = await fetch(`${url}/health`, { signal: AbortSignal.timeout(1500) })
    return res.ok
  } catch {
    return false
  }
}

async function waitForServer(url, maxWaitMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < maxWaitMs) {
    if (await isServerReady(url)) return true
    await new Promise((r) => setTimeout(r, 600))
  }
  return false
}

before(async () => {
  const alreadyRunning = await isServerReady(BASE_URL)
  if (alreadyRunning) {
    console.log(`[E2E] Reusing active Cloudflare Worker service at ${BASE_URL}`)
    return
  }

  console.log(`[E2E] Spawning local wrangler dev server on port 8787...`)
  devServerChild = spawn('npx', ['wrangler', 'dev', '--port', '8787'], {
    shell: true,
    stdio: 'pipe',
  })

  devServerChild.on('error', (err) => {
    console.error('[E2E] Failed to spawn wrangler dev:', err)
  })

  const ready = await waitForServer(BASE_URL)
  if (!ready) {
    if (devServerChild) devServerChild.kill()
    throw new Error(`[E2E] Timed out waiting for wrangler dev to start at ${BASE_URL}`)
  }
  console.log(`[E2E] Dev server ready at ${BASE_URL}`)
})

after(() => {
  if (devServerChild) {
    console.log('[E2E] Terminating spawned wrangler dev process...')
    devServerChild.kill()
  }
})

// ----------------------------------------------------
// 1. Health & Core Infrastructure Tests
// ----------------------------------------------------
test('E2E: /health responds with 200 and healthy status', async () => {
  const res = await fetch(`${BASE_URL}/health`)
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.status, 'healthy')
  assert.equal(data.service, 'php2shell-checker-cf')
  assert.ok(data.timestamp)
})

// ----------------------------------------------------
// 2. UI Pages & Global Rules (Mandatory Favicon & I18N)
// ----------------------------------------------------
test('E2E: Front UI (/) renders correctly with mandatory SVG Favicon and 6 themes', async () => {
  const res = await fetch(`${BASE_URL}/`)
  assert.equal(res.status, 200)
  const html = await res.text()

  // Mandatory Embedded Vector SVG Favicon Rule
  assert.ok(html.includes('rel="icon" type="image/svg+xml"'), 'Must have embedded vector SVG favicon')
  assert.ok(html.includes('data:image/svg+xml'), 'Favicon must be Data URI')

  // Theme selector presence
  assert.ok(html.includes('id="theme-selector"'), 'Must have theme selector')
  assert.ok(html.includes('value="obsidian"'), 'Must include obsidian theme')
  assert.ok(html.includes('value="vt100"'), 'Must include vt100 theme')
  assert.ok(html.includes('value="amber"'), 'Must include amber theme')
  assert.ok(html.includes('value="dracula"'), 'Must include dracula theme')
  assert.ok(html.includes('value="solarized"'), 'Must include solarized theme')
  assert.ok(html.includes('value="win95"'), 'Must include win95 theme')

  // Target input & Real-time validation element
  assert.ok(html.includes('id="target-url"'), 'Must have target-url input')
  assert.ok(html.includes('id="target-url-error"'), 'Must have target-url-error inline alert container')
  assert.ok(html.includes('validateTargetUrlInput()'), 'Must bind real-time input validator')

  // Wiz Attribution Statement
  assert.ok(html.includes('Wiz Academy'), 'Must attribute Wiz framework')
})

test('E2E: Batch view (/batch) and Admin view (/admin-demo) render with 200 OK', async () => {
  const resBatch = await fetch(`${BASE_URL}/batch`)
  assert.equal(resBatch.status, 200)
  const batchHtml = await resBatch.text()
  assert.ok(batchHtml.includes('id="batch-urls"'))

  const resAdmin = await fetch(`${BASE_URL}/admin-demo`)
  assert.equal(resAdmin.status, 200)
  const adminHtml = await resAdmin.text()
  assert.ok(adminHtml.includes('id="admin-login-box"'))
})

// ----------------------------------------------------
// 3. Strict URL Normalization & Validation Defense
// ----------------------------------------------------
test('E2E: POST /api/check strictly rejects spaced URL (php.n e t 44555) with exit_code: 2', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'php.n e t 44555' }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.exit_code, 2, 'Spaced URL must return exit code 2')
  assert.equal(data.target_host, 'invalid')
  assert.ok(data.reason.includes('禁止包含空格') || data.reason.includes('Whitespace'), 'Must state whitespace prohibition')
})

test('E2E: POST /api/check rejects whitespace-trailing URLs and port syntax (php.net 8080) with exit_code: 2', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'php.net 8080' }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.exit_code, 2)
  assert.equal(data.target_host, 'invalid')
})

test('E2E: POST /api/check rejects empty or whitespace-only inputs with 400', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: '   ' }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.exit_code, 2)
})

// ----------------------------------------------------
// 4. Live SSRF Defense Regression
// ----------------------------------------------------
test('E2E: POST /api/check blocks SSRF to 127.0.0.1 loopback', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'http://127.0.0.1:8787/' }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.exit_code, 2)
  assert.ok(data.reason.includes('SSRF') || data.reason.includes('Blocked by SSRF'))
})

test('E2E: POST /api/check blocks SSRF to private RFC1918 range (10.0.0.1)', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'http://10.0.0.1/' }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.exit_code, 2)
  assert.ok(data.reason.includes('SSRF') || data.reason.includes('Blocked by SSRF'))
})

test('E2E: POST /api/check blocks SSRF to cloud metadata (169.254.169.254)', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'http://169.254.169.254/latest/meta-data/' }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.exit_code, 2)
  assert.ok(data.reason.includes('SSRF') || data.reason.includes('Blocked by SSRF'))
})

// ----------------------------------------------------
// 5. Batch Check Multi-Target Concurrent Regression
// ----------------------------------------------------
test('E2E: POST /api/check batch mode handles valid, invalid, and SSRF targets concurrently', async () => {
  const res = await fetch(`${BASE_URL}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      urls: [
        'php.n e t 44555',
        'http://127.0.0.1:9090',
        'https://example.com'
      ]
    }),
  })
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.success, true)
  assert.equal(data.count, 3)

  // Target 1: Invalid spaced URL
  assert.equal(data.results[0].exit_code, 2)
  assert.equal(data.results[0].target_host, 'invalid')

  // Target 2: Blocked by SSRF
  assert.equal(data.results[1].exit_code, 2)
  assert.ok(data.results[1].reason.includes('SSRF') || data.results[1].reason.includes('Blocked by SSRF'))

  // Target 3: Public domain processed
  assert.ok([0, 1, 3].includes(data.results[2].exit_code))
})

// ----------------------------------------------------
// 6. Retro Theme Token Consistency
// ----------------------------------------------------
test('E2E: Theme query parameter applies data-theme server/anti-FOUC script', async () => {
  const resWin95 = await fetch(`${BASE_URL}/?theme=win95`)
  assert.equal(resWin95.status, 200)
  const htmlWin95 = await resWin95.text()
  assert.ok(htmlWin95.includes('[data-theme="win95"]'), 'Must include win95 styling rules')

  const resAmber = await fetch(`${BASE_URL}/?theme=amber`)
  assert.equal(resAmber.status, 200)
  const htmlAmber = await resAmber.text()
  assert.ok(htmlAmber.includes('[data-theme="amber"]'), 'Must include amber styling rules')
})
