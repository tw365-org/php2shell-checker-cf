import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'
import { Env, CheckResult } from './types'
import { checkUrl } from './checker'
import { renderAppHtml } from './ui'
import { createJwt, verifyJwt, hashPassword, generateSalt } from './auth'

type Variables = {
  adminUser: string
}

const app = new Hono<{ Bindings: Env; Variables: Variables }>()

// Enable CORS for external API integrations
app.use('/api/*', cors())

function generateId(): string {
  return crypto.randomUUID().slice(0, 12)
}

// ----------------------------------------------------
// Frontend Web App
// ----------------------------------------------------
app.get('/', (c) => {
  return c.html(renderAppHtml(c.env.APP_NAME || 'PHP2Shell Security Checker'))
})

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'php2shell-checker-cf',
  })
})

// ----------------------------------------------------
// Public API: Check (Single & Batch)
// ----------------------------------------------------
app.post('/api/check', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const timeout = Number(body.timeout) || 10

  // Batch Mode
  if (Array.isArray(body.urls)) {
    const urls: string[] = body.urls.slice(0, 20)
    const results: CheckResult[] = []

    for (const raw of urls) {
      const res = await checkUrl(raw, timeout)
      const id = generateId()
      res.id = id
      results.push(res)

      // Save to D1 if available
      if (c.env.DB) {
        try {
          await c.env.DB.prepare(`
            INSERT INTO scans (id, url, target_host, patch_status, php_version, reason, exit_code, headers_summary)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            id,
            res.url,
            res.target_host,
            res.patch_status,
            res.php_version,
            res.reason,
            res.exit_code,
            res.headers_summary || ''
          ).run()
        } catch (dbErr) {
          console.error('D1 batch insert error:', dbErr)
        }
      }
    }

    return c.json({
      success: true,
      count: results.length,
      results,
    })
  }

  // Single URL Mode
  const rawUrl = body.url
  if (!rawUrl || typeof rawUrl !== 'string') {
    return c.json({ error: 'Please provide a valid url' }, 400)
  }

  const result = await checkUrl(rawUrl, timeout)
  const id = generateId()
  result.id = id

  // Persist in D1
  if (c.env.DB) {
    try {
      await c.env.DB.prepare(`
        INSERT INTO scans (id, url, target_host, patch_status, php_version, reason, exit_code, headers_summary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        result.url,
        result.target_host,
        result.patch_status,
        result.php_version,
        result.reason,
        result.exit_code,
        result.headers_summary || ''
      ).run()
    } catch (dbErr) {
      console.error('D1 insert error:', dbErr)
    }
  }

  return c.json(result)
})

// Shareable Report Route
app.get('/api/report/:id', async (c) => {
  const id = c.req.param('id')
  if (!c.env.DB) {
    return c.json({ error: 'Database not configured' }, 500)
  }

  const row = await c.env.DB.prepare(`SELECT * FROM scans WHERE id = ?`).bind(id).first()
  if (!row) {
    return c.json({ error: 'Report not found' }, 404)
  }
  return c.json(row)
})

// ----------------------------------------------------
// Admin Auth & Protected API
// ----------------------------------------------------
const DEFAULT_JWT_SECRET = 'php2shell-cf-secret-fallback-token-key-2026'

app.post('/api/admin/login', async (c) => {
  const { username, password } = await c.req.json().catch(() => ({}))
  if (!username || !password) {
    return c.json({ error: '請輸入帳號與密碼' }, 400)
  }

  const configuredUser = c.env.ADMIN_USERNAME || 'admin'
  const configuredPass = c.env.ADMIN_PASSWORD || 'admin888' // Default fallback admin password
  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET

  let isValid = false

  // Check against D1 admin_users first if configured
  if (c.env.DB) {
    try {
      const userRow = await c.env.DB.prepare(`SELECT * FROM admin_users WHERE username = ?`).bind(username).first()
      if (userRow) {
        const testHash = await hashPassword(password, userRow.salt as string)
        if (testHash === userRow.password_hash) {
          isValid = true
        }
      }
    } catch {
      // Ignore and fallback to env
    }
  }

  // Fallback check against env
  if (!isValid && username === configuredUser && password === configuredPass) {
    isValid = true
  }

  if (!isValid) {
    return c.json({ error: '管理員帳號或密碼錯誤' }, 401)
  }

  const token = await createJwt(
    {
      sub: username,
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days validity
    },
    jwtSecret
  )

  return c.json({
    success: true,
    token,
    user: { username },
  })
})

// Admin Authorization Middleware
async function requireAdmin(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401)
  }
  const token = authHeader.substring(7)
  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET
  const payload = await verifyJwt(token, jwtSecret)
  if (!payload || payload.role !== 'admin') {
    return c.json({ error: 'Unauthorized: Token invalid or expired' }, 401)
  }
  c.set('adminUser', payload.sub)
  await next()
}

app.get('/api/admin/me', requireAdmin, (c) => {
  return c.json({ username: c.get('adminUser') })
})

// Admin Stats
app.get('/api/admin/stats', requireAdmin, async (c) => {
  if (!c.env.DB) {
    return c.json({ totalScans: 0, vulnScans: 0, safeScans: 0, monitoredCount: 0 })
  }

  const total = (await c.env.DB.prepare(`SELECT COUNT(*) as count FROM scans`).first('count')) || 0
  const vuln = (await c.env.DB.prepare(`SELECT COUNT(*) as count FROM scans WHERE patch_status = 'potentially_vulnerable'`).first('count')) || 0
  const safe = (await c.env.DB.prepare(`SELECT COUNT(*) as count FROM scans WHERE patch_status = 'ok'`).first('count')) || 0
  const monitored = (await c.env.DB.prepare(`SELECT COUNT(*) as count FROM monitored_targets WHERE is_active = 1`).first('count')) || 0

  return c.json({
    totalScans: total,
    vulnScans: vuln,
    safeScans: safe,
    monitoredCount: monitored,
  })
})

// Admin Scans List
app.get('/api/admin/scans', requireAdmin, async (c) => {
  if (!c.env.DB) return c.json({ scans: [] })
  const { results } = await c.env.DB.prepare(`
    SELECT id, url, target_host, patch_status, php_version, reason, created_at
    FROM scans ORDER BY created_at DESC LIMIT 100
  `).all()
  return c.json({ scans: results || [] })
})

// Admin Delete Scan
app.delete('/api/admin/scans/:id', requireAdmin, async (c) => {
  const id = c.req.param('id')
  if (c.env.DB) {
    await c.env.DB.prepare(`DELETE FROM scans WHERE id = ?`).bind(id).run()
  }
  return c.json({ success: true })
})

// Admin Clear All Scans
app.post('/api/admin/scans/clear', requireAdmin, async (c) => {
  if (c.env.DB) {
    await c.env.DB.prepare(`DELETE FROM scans`).run()
  }
  return c.json({ success: true })
})

// Monitored Targets CRUD
app.get('/api/admin/monitors', requireAdmin, async (c) => {
  if (!c.env.DB) return c.json({ monitors: [] })
  const { results } = await c.env.DB.prepare(`SELECT * FROM monitored_targets ORDER BY created_at DESC`).all()
  return c.json({ monitors: results || [] })
})

app.post('/api/admin/monitors', requireAdmin, async (c) => {
  const { url, label } = await c.req.json().catch(() => ({}))
  if (!url) return c.json({ error: 'URL is required' }, 400)
  if (!c.env.DB) return c.json({ error: 'DB not available' }, 500)

  const id = generateId()
  await c.env.DB.prepare(`
    INSERT INTO monitored_targets (id, url, label, is_active)
    VALUES (?, ?, ?, 1)
  `).bind(id, url, label || url).run()

  return c.json({ success: true, id })
})

app.delete('/api/admin/monitors/:id', requireAdmin, async (c) => {
  const id = c.req.param('id')
  if (c.env.DB) {
    await c.env.DB.prepare(`DELETE FROM monitored_targets WHERE id = ?`).bind(id).run()
  }
  return c.json({ success: true })
})

// Trigger Immediate Monitor Scan
app.post('/api/admin/monitors/:id/scan', requireAdmin, async (c) => {
  const id = c.req.param('id')
  if (!c.env.DB) return c.json({ error: 'DB not available' }, 500)

  const item = await c.env.DB.prepare(`SELECT * FROM monitored_targets WHERE id = ?`).bind(id).first()
  if (!item) return c.json({ error: 'Target not found' }, 404)

  const result = await checkUrl(item.url as string)
  const now = new Date().toISOString()

  await c.env.DB.prepare(`
    UPDATE monitored_targets
    SET last_status = ?, last_version = ?, last_checked_at = ?
    WHERE id = ?
  `).bind(result.patch_status, result.php_version, now, id).run()

  return c.json({ success: true, result })
})

// Settings (Webhook)
app.get('/api/admin/settings', requireAdmin, async (c) => {
  if (!c.env.DB) return c.json({})
  const { results } = await c.env.DB.prepare(`SELECT key, value FROM settings`).all()
  const map: Record<string, string> = {}
  results?.forEach((r: any) => {
    map[r.key] = r.value
  })
  return c.json(map)
})

app.post('/api/admin/settings', requireAdmin, async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!c.env.DB) return c.json({ error: 'DB not available' }, 500)

  for (const [k, v] of Object.entries(body)) {
    await c.env.DB.prepare(`
      INSERT INTO settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `).bind(k, String(v)).run()
  }

  return c.json({ success: true })
})

app.post('/api/admin/settings/test-webhook', requireAdmin, async (c) => {
  if (!c.env.DB) return c.json({ message: 'DB not available' }, 400)
  const row = await c.env.DB.prepare(`SELECT value FROM settings WHERE key = 'webhook_url'`).first('value')
  const webhookUrl = row as string
  if (!webhookUrl) {
    return c.json({ message: '尚未設定 Webhook URL' }, 400)
  }

  try {
    const payload = {
      content: '🚨 **[PHP2Shell Alert Test]** Cloudflare 邊緣檢測告警連線測試成功！',
      text: 'PHP2Shell Alert Test: Edge webhook notification is working properly.',
    }
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return c.json({ message: `Webhook 回應狀態碼: ${res.status}` })
  } catch (err: any) {
    return c.json({ message: `Webhook 發送失敗: ${err.message}` }, 500)
  }
})

// ----------------------------------------------------
// Cloudflare Cron Scheduled Handler
// ----------------------------------------------------
async function handleScheduledEvent(env: Env) {
  if (!env.DB) return

  // Get active targets
  const { results } = await env.DB.prepare(`
    SELECT * FROM monitored_targets WHERE is_active = 1
  `).all()

  if (!results || results.length === 0) return

  const webhookUrlRow = await env.DB.prepare(`SELECT value FROM settings WHERE key = 'webhook_url'`).first('value')
  const webhookEnabledRow = await env.DB.prepare(`SELECT value FROM settings WHERE key = 'webhook_enabled'`).first('value')
  const webhookUrl = webhookUrlRow as string
  const webhookEnabled = webhookEnabledRow === '1'

  for (const item of results as any[]) {
    const res = await checkUrl(item.url)
    const now = new Date().toISOString()

    // Update monitored record
    await env.DB.prepare(`
      UPDATE monitored_targets
      SET last_status = ?, last_version = ?, last_checked_at = ?
      WHERE id = ?
    `).bind(res.patch_status, res.php_version, now, item.id).run()

    // Record in scans table
    await env.DB.prepare(`
      INSERT INTO scans (id, url, target_host, patch_status, php_version, reason, exit_code, headers_summary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      generateId(),
      res.url,
      res.target_host,
      res.patch_status,
      res.php_version,
      res.reason,
      res.exit_code,
      res.headers_summary || ''
    ).run()

    // If vulnerable, send alert webhook
    if (res.patch_status === 'potentially_vulnerable' && webhookEnabled && webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⚠️ **PHP2Shell 威脅警報**：站台 \`${item.label}\` (${item.url}) 偵測到受威脅的 PHP 版本 (\`${res.php_version}\`)！\\n> 原因: ${res.reason}`,
          }),
        })
      } catch (alertErr) {
        console.error('Webhook alert delivery error:', alertErr)
      }
    }
  }
}

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(handleScheduledEvent(env))
  },
}
