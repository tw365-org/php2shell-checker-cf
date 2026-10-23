// Complete Single-Page Application (SPA) HTML Template for PHP2Shell Checker
// Includes Mandatory SVG Favicon, Tailwind CSS, Security Dashboard UI, Front & Back Office

export const FAVICON_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E`

export function renderAppHtml(appName = 'PHP2Shell Edge Checker'): string {
  return `<!DOCTYPE html>
<html lang="zh-TW" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName} - Cloudflare Edge Security</title>
  <!-- Mandatory Embedded Vector SVG Favicon -->
  <link rel="icon" type="image/svg+xml" href="${FAVICON_SVG}">
  <!-- Tailwind CSS CDN for Zero-Build Edge Distribution -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0f9ff',
              400: '#38bdf8',
              500: '#0284c7',
              600: '#0369a1',
              900: '#0c4a6e',
            },
            vuln: '#ef4444',
            safe: '#10b981',
            unknown: '#f59e0b',
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    code, pre, .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .grid-bg {
      background-size: 30px 30px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    }
    .light .grid-bg {
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-sky-500 selection:text-white transition-colors duration-200">
  <div class="fixed inset-0 grid-bg pointer-events-none z-0"></div>

  <!-- Top Navigation Bar -->
  <header class="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3 cursor-pointer" onclick="switchTab('front')">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <div>
          <span class="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            PHP2Shell <span class="text-xs px-2 py-0.5 rounded-full font-mono font-medium bg-sky-500/20 text-sky-400 border border-sky-500/30">Edge CF</span>
          </span>
          <p class="text-xs text-slate-400">CVE-2026-109618 / 109619 Detector</p>
        </div>
      </div>

      <nav class="flex items-center space-x-1 sm:space-x-2">
        <button id="nav-btn-front" onclick="switchTab('front')" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-sky-500/10 text-sky-400 border border-sky-500/30">
          🌐 公開檢測 (前台)
        </button>
        <button id="nav-btn-batch" onclick="switchTab('batch')" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800">
          ⚡ 批次掃描
        </button>
        <button id="nav-btn-admin" onclick="switchTab('admin')" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          後台管理
        </button>
        <button onclick="toggleTheme()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition" title="切換深淺模式">
          🌓
        </button>
      </nav>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- SECTION 1: FRONT OFFICE (Single URL Scan) -->
    <div id="view-front" class="space-y-8 max-w-3xl mx-auto">
      <!-- Hero Banner -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Cloudflare Workers 全球邊緣秒級響應
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          PHP2Shell 漏洞在線檢測
        </h1>
        <p class="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          依據官方安全通報 (2026-10-21)，透過分析網站 HTTP 標頭版本，評估是否受 CVE-2026-109618 及 CVE-2026-109619 影響。
        </p>
      </div>

      <!-- Scan Card -->
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        <form id="single-scan-form" onsubmit="handleSingleScan(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">目標網站 URL 或網域名稱</label>
            <div class="relative flex items-center">
              <span class="absolute left-4 text-slate-500 font-mono text-sm">https://</span>
              <input type="text" id="target-url" placeholder="example.com 或 https://example.com" required
                class="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl py-3 pl-20 pr-32 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition font-mono">
              <button type="submit" id="btn-submit-scan"
                class="absolute right-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all flex items-center gap-1.5">
                <span id="scan-spinner" class="hidden animate-spin">⏳</span>
                <span>開始檢測</span>
              </button>
            </div>
          </div>
          
          <!-- Quick example chips -->
          <div class="flex flex-wrap items-center gap-2 pt-1">
            <span class="text-xs text-slate-500">快速範例：</span>
            <button type="button" onclick="fillUrl('php.net')" class="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 font-mono">php.net</button>
            <button type="button" onclick="fillUrl('wordpress.org')" class="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 font-mono">wordpress.org</button>
            <button type="button" onclick="fillUrl('wikipedia.org')" class="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 font-mono">wikipedia.org</button>
          </div>
        </form>
      </div>

      <!-- Scan Result Area -->
      <div id="scan-result" class="hidden space-y-4">
        <!-- Rendered by JS -->
      </div>

      <!-- Security Advisory Reference -->
      <div class="border border-slate-800 rounded-xl p-5 bg-slate-900/40 text-xs text-slate-400 space-y-2">
        <div class="font-semibold text-slate-300 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          官方安全修復基準說明
        </div>
        <p>上游官方修復版本為：<span class="text-emerald-400 font-mono font-semibold">8.2.35</span>、<span class="text-emerald-400 font-mono font-semibold">8.3.36</span>、<span class="text-emerald-400 font-mono font-semibold">8.4.27</span> 與 <span class="text-emerald-400 font-mono font-semibold">8.5.12</span>。</p>
        <p>PHP 5.4–5.6, 7.0–7.4, 8.0, 8.1 等已終止支援 (EOL) 分支即使版號較高仍會標註為潛在受威脅。HTTP 標頭檢測無法確認系統是否套用 Linux 發行版 backport 修補程式，亦未進行任何 PoC 攻擊性探針。</p>
      </div>
    </div>

    <!-- SECTION 2: BATCH SCAN -->
    <div id="view-batch" class="hidden space-y-6 max-w-4xl mx-auto">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-white">⚡ 批次網站檢測</h2>
          <p class="text-sm text-slate-400">一次輸入多個網址，透過 Cloudflare 邊緣並發快速檢驗</p>
        </div>
      </div>

      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">每行輸入一個網址 (最多支援 20 個網址)</label>
          <textarea id="batch-urls" rows="6" placeholder="https://site-a.com&#10;https://site-b.org&#10;https://example.net"
            class="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"></textarea>
        </div>
        <div class="flex items-center justify-between">
          <span id="batch-count" class="text-xs text-slate-500">已輸入 0 個目標</span>
          <button onclick="handleBatchScan()" id="btn-batch-scan" class="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition flex items-center gap-2">
            <span>開始批次檢測</span>
          </button>
        </div>
      </div>

      <!-- Batch Results Table -->
      <div id="batch-results-container" class="hidden space-y-4">
        <h3 class="text-lg font-bold text-white flex items-center justify-between">
          <span>檢測結果清單</span>
          <span id="batch-summary-chips" class="text-xs font-normal"></span>
        </h3>
        <div class="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/60">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-800/80 text-slate-400 font-mono uppercase text-xs">
              <tr>
                <th class="p-3">目標網址</th>
                <th class="p-3">狀態</th>
                <th class="p-3">PHP 版本</th>
                <th class="p-3">原因與說明</th>
              </tr>
            </thead>
            <tbody id="batch-table-body" class="divide-y divide-slate-800 font-mono">
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- SECTION 3: ADMIN DASHBOARD (Back Office) -->
    <div id="view-admin" class="hidden space-y-8 max-w-5xl mx-auto">
      <!-- Admin Login View (If not logged in) -->
      <div id="admin-login-box" class="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mx-auto flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h2 class="text-xl font-bold text-white">後台管理員登入</h2>
          <p class="text-xs text-slate-400">請輸入管理員密碼以進入審計日誌與排程巡檢面板</p>
        </div>

        <form onsubmit="handleAdminLogin(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">帳號 (預設 admin)</label>
            <input type="text" id="admin-user-input" value="admin" required
              class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500">
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">管理員密碼</label>
            <input type="password" id="admin-pass-input" placeholder="請輸入管理密碼" required
              class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500">
          </div>
          <p id="admin-login-error" class="text-xs text-rose-400 hidden"></p>
          <button type="submit" class="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg shadow-md transition">
            登入管理後台
          </button>
        </form>
      </div>

      <!-- Admin Panel View (If logged in) -->
      <div id="admin-panel" class="hidden space-y-6">
        <!-- Top bar with logout -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 class="text-2xl font-bold text-white flex items-center gap-2">
              🛡️ 後台安全儀表板
              <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">已驗證管理員</span>
            </h2>
            <p class="text-xs text-slate-400">D1 資料庫日誌審計、排程巡檢與告警設定</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="loadAdminData()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition">🔄 重新整理</button>
            <button onclick="handleAdminLogout()" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium rounded-lg transition">登出</button>
          </div>
        </div>

        <!-- Metric Stat Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div class="text-xs text-slate-400 uppercase tracking-wider">總掃描次數</div>
            <div id="stat-total" class="text-2xl font-bold text-white font-mono mt-1">-</div>
          </div>
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div class="text-xs text-rose-400 uppercase tracking-wider">潛在受威脅</div>
            <div id="stat-vuln" class="text-2xl font-bold text-rose-400 font-mono mt-1">-</div>
          </div>
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div class="text-xs text-emerald-400 uppercase tracking-wider">已修復/安全</div>
            <div id="stat-safe" class="text-2xl font-bold text-emerald-400 font-mono mt-1">-</div>
          </div>
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div class="text-xs text-sky-400 uppercase tracking-wider">排程監控站台</div>
            <div id="stat-monitored" class="text-2xl font-bold text-sky-400 font-mono mt-1">-</div>
          </div>
        </div>

        <!-- Tab control inside Admin -->
        <div class="flex border-b border-slate-800 space-x-4">
          <button id="admin-subtab-scans-btn" onclick="switchAdminSubTab('scans')" class="pb-2 text-sm font-semibold border-b-2 border-sky-400 text-sky-400">
            歷史檢測審計紀錄
          </button>
          <button id="admin-subtab-monitors-btn" onclick="switchAdminSubTab('monitors')" class="pb-2 text-sm font-semibold border-b-2 border-transparent text-slate-400 hover:text-white">
            排程巡檢名單 (Cron)
          </button>
          <button id="admin-subtab-settings-btn" onclick="switchAdminSubTab('settings')" class="pb-2 text-sm font-semibold border-b-2 border-transparent text-slate-400 hover:text-white">
            告警通知設定 (Webhook)
          </button>
        </div>

        <!-- SUBTAB 1: Scans History -->
        <div id="admin-subtab-scans" class="space-y-4">
          <div class="flex items-center justify-between gap-4">
            <input type="text" id="admin-search-scan" oninput="filterAdminScans()" placeholder="搜尋網址、網域或狀態..."
              class="w-full max-w-sm bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500">
            <button onclick="clearScanLogs()" class="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs rounded-lg transition whitespace-nowrap">
              清空歷史
            </button>
          </div>
          <div class="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/60">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-800/80 text-slate-400 font-mono uppercase">
                <tr>
                  <th class="p-3">時間 (UTC)</th>
                  <th class="p-3">目標網址</th>
                  <th class="p-3">狀態</th>
                  <th class="p-3">版本</th>
                  <th class="p-3">原因</th>
                  <th class="p-3">操作</th>
                </tr>
              </thead>
              <tbody id="admin-scans-tbody" class="divide-y divide-slate-800 font-mono">
                <tr><td colspan="6" class="p-4 text-center text-slate-500">載入中...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 2: Monitored Targets -->
        <div id="admin-subtab-monitors" class="hidden space-y-4">
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-end">
            <div class="flex-1 w-full">
              <label class="block text-xs text-slate-400 mb-1">目標網址 (URL)</label>
              <input type="text" id="new-monitor-url" placeholder="https://my-company-portal.com" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white">
            </div>
            <div class="w-full sm:w-48">
              <label class="block text-xs text-slate-400 mb-1">站台標籤 (Label)</label>
              <input type="text" id="new-monitor-label" placeholder="核心業務站點" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white">
            </div>
            <button onclick="addMonitoredTarget()" class="w-full sm:w-auto px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs rounded-lg transition">
              新增監控
            </button>
          </div>

          <div class="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/60">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-800/80 text-slate-400 font-mono uppercase">
                <tr>
                  <th class="p-3">標籤</th>
                  <th class="p-3">URL</th>
                  <th class="p-3">最後狀態</th>
                  <th class="p-3">最後偵測版本</th>
                  <th class="p-3">上次巡檢時間</th>
                  <th class="p-3">操作</th>
                </tr>
              </thead>
              <tbody id="admin-monitors-tbody" class="divide-y divide-slate-800 font-mono">
                <tr><td colspan="6" class="p-4 text-center text-slate-500">載入中...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 3: Settings -->
        <div id="admin-subtab-settings" class="hidden space-y-4 max-w-xl">
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 class="text-sm font-bold text-white">🔔 Webhook 告警通知設定</h3>
            <p class="text-xs text-slate-400">當 Cloudflare Cron 排程巡檢發現站點狀態為「潛在受威脅」時，將向此 Webhook 發送警報。</p>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Webhook URL (支援 Discord / Slack / 自訂服務)</label>
              <input type="url" id="setting-webhook-url" placeholder="https://discord.com/api/webhooks/..."
                class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono">
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="setting-webhook-enabled" class="rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0">
              <label for="setting-webhook-enabled" class="text-xs text-slate-300">啟用巡檢異常告警通知</label>
            </div>
            <div class="pt-2 flex items-center gap-3">
              <button onclick="saveAdminSettings()" class="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs rounded-lg transition">儲存設定</button>
              <button onclick="testWebhook()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg transition">發送測試告警</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main>

  <!-- Footer -->
  <footer class="relative z-10 border-t border-slate-800/60 bg-slate-950 py-6 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <span>由 <a href="https://github.com/tw365-org/php2shell-checker-cf" target="_blank" class="text-sky-400 hover:underline">tw365-org</a> 構建與維護</span>
        <span>•</span>
        <span>上游開源：<a href="https://github.com/openai/php2shell-checker" target="_blank" class="text-slate-400 hover:underline">openai/php2shell-checker</a></span>
      </div>
      <div>
        <span>運行於 Cloudflare Workers & D1 Edge Runtime</span>
      </div>
    </div>
  </footer>

  <!-- Client JavaScript Logic -->
  <script>
    // Tab Switching
    function switchTab(tab) {
      document.getElementById('view-front').classList.toggle('hidden', tab !== 'front');
      document.getElementById('view-batch').classList.toggle('hidden', tab !== 'batch');
      document.getElementById('view-admin').classList.toggle('hidden', tab !== 'admin');

      const tabs = ['front', 'batch', 'admin'];
      tabs.forEach(t => {
        const btn = document.getElementById('nav-btn-' + t);
        if (t === tab) {
          btn.className = "px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-sky-500/10 text-sky-400 border border-sky-500/30";
        } else {
          btn.className = "px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800";
        }
      });

      if (tab === 'admin') {
        checkAdminSession();
      }
    }

    function fillUrl(val) {
      document.getElementById('target-url').value = val;
    }

    function toggleTheme() {
      document.documentElement.classList.toggle('dark');
      document.documentElement.classList.toggle('light');
    }

    // Single URL Scan
    async function handleSingleScan(e) {
      e.preventDefault();
      const input = document.getElementById('target-url');
      const submitBtn = document.getElementById('btn-submit-scan');
      const spinner = document.getElementById('scan-spinner');
      const resultArea = document.getElementById('scan-result');

      const url = input.value.trim();
      if (!url) return;

      submitBtn.disabled = true;
      spinner.classList.remove('hidden');
      resultArea.classList.add('hidden');

      try {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        const data = await res.json();
        renderScanResult(data);
      } catch (err) {
        alert('檢測請求失敗：' + err.message);
      } finally {
        submitBtn.disabled = false;
        spinner.classList.add('hidden');
      }
    }

    function renderScanResult(data) {
      const area = document.getElementById('scan-result');
      area.classList.remove('hidden');

      let badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      let statusLabel = 'UNKNOWN 未知 / 無法判定';
      let icon = '❓';

      if (data.patch_status === 'ok') {
        badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        statusLabel = 'SAFE / OK 已修復或安全版本';
        icon = '✅';
      } else if (data.patch_status === 'potentially_vulnerable') {
        badgeBg = 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse';
        statusLabel = 'POTENTIALLY VULNERABLE 潛在受威脅';
        icon = '⚠️';
      }

      area.innerHTML = \`
        <div class="border border-slate-800 bg-slate-900/90 rounded-2xl p-6 shadow-2xl space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div class="text-xs text-slate-400 uppercase font-mono">檢測目標網址</div>
              <div class="text-lg font-bold text-white font-mono break-all mt-0.5">\${escapeHtml(data.url)}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border \${badgeBg}">
                <span>\${icon}</span>
                <span>\${statusLabel}</span>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-400 block mb-1">偵測到的 PHP 版本</span>
              <span class="text-base font-bold font-mono \${data.php_version ? 'text-sky-400' : 'text-slate-500'}">
                \${data.php_version ? 'PHP ' + escapeHtml(data.php_version) : '未公開或無標頭'}
              </span>
            </div>
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-400 block mb-1">CVE 覆蓋範圍</span>
              <span class="text-xs font-mono text-slate-300">CVE-2026-109618 & 109619</span>
            </div>
          </div>

          <div class="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div class="text-slate-400 font-semibold">分析詳細原因：</div>
            <p class="text-slate-200 leading-relaxed font-mono">\${escapeHtml(data.reason)}</p>
          </div>

          \${data.headers_summary ? \`
            <details class="text-xs text-slate-400">
              <summary class="cursor-pointer hover:text-slate-200 py-1 font-mono">檢視伺服器回應標頭摘要 (HTTP Headers)</summary>
              <pre class="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">\${escapeHtml(data.headers_summary)}</pre>
            </details>
          \` : ''}

          \${data.id ? \`
            <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span class="text-slate-500 font-mono">報告代碼: \${data.id}</span>
              <button onclick="copyReportLink('\${data.id}')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg transition flex items-center gap-1">
                📋 複製分享短鏈
              </button>
            </div>
          \` : ''}
        </div>
      \`;
    }

    function copyReportLink(id) {
      const url = window.location.origin + '/?report=' + id;
      navigator.clipboard.writeText(url).then(() => {
        alert('檢測報告短鏈已複製至剪貼簿：\\n' + url);
      });
    }

    // Batch Scan
    async function handleBatchScan() {
      const textarea = document.getElementById('batch-urls');
      const lines = textarea.value.split('\\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return alert('請至少輸入一個網址');
      if (lines.length > 20) return alert('為避免邊緣資源耗盡，單次批次最多支援 20 個網址');

      const btn = document.getElementById('btn-batch-scan');
      btn.disabled = true;
      btn.innerText = '檢測中...';

      try {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: lines })
        });
        const data = await res.json();
        renderBatchResults(data.results || []);
      } catch (err) {
        alert('批次掃描失敗：' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = '開始批次檢測';
      }
    }

    function renderBatchResults(results) {
      const container = document.getElementById('batch-results-container');
      const tbody = document.getElementById('batch-table-body');
      const chips = document.getElementById('batch-summary-chips');
      container.classList.remove('hidden');

      let vuln = 0, ok = 0, unk = 0;
      results.forEach(r => {
        if (r.patch_status === 'potentially_vulnerable') vuln++;
        else if (r.patch_status === 'ok') ok++;
        else unk++;
      });

      chips.innerHTML = \`
        <span class="text-rose-400 mr-2">受威脅: \${vuln}</span>
        <span class="text-emerald-400 mr-2">安全: \${ok}</span>
        <span class="text-amber-400">未知: \${unk}</span>
      \`;

      tbody.innerHTML = results.map(r => {
        let badge = '<span class="text-amber-400 font-bold">UNKNOWN</span>';
        if (r.patch_status === 'ok') badge = '<span class="text-emerald-400 font-bold">OK</span>';
        if (r.patch_status === 'potentially_vulnerable') badge = '<span class="text-rose-400 font-bold">VULNERABLE</span>';

        return \`
          <tr class="hover:bg-slate-800/40">
            <td class="p-3 text-white truncate max-w-xs">\${escapeHtml(r.url)}</td>
            <td class="p-3">\${badge}</td>
            <td class="p-3 text-sky-400">\${escapeHtml(r.php_version || '-')}</td>
            <td class="p-3 text-slate-300 text-xs truncate max-w-md">\${escapeHtml(r.reason)}</td>
          </tr>
        \`;
      }).join('');
    }

    // Admin Auth & Functions
    let adminToken = localStorage.getItem('cf_admin_token');

    async function checkAdminSession() {
      if (!adminToken) {
        showAdminLogin();
        return;
      }
      try {
        const res = await fetch('/api/admin/me', {
          headers: { 'Authorization': 'Bearer ' + adminToken }
        });
        if (res.ok) {
          showAdminPanel();
          loadAdminData();
        } else {
          showAdminLogin();
        }
      } catch {
        showAdminLogin();
      }
    }

    function showAdminLogin() {
      document.getElementById('admin-login-box').classList.remove('hidden');
      document.getElementById('admin-panel').classList.add('hidden');
    }

    function showAdminPanel() {
      document.getElementById('admin-login-box').classList.add('hidden');
      document.getElementById('admin-panel').classList.remove('hidden');
    }

    async function handleAdminLogin(e) {
      e.preventDefault();
      const u = document.getElementById('admin-user-input').value;
      const p = document.getElementById('admin-pass-input').value;
      const errBox = document.getElementById('admin-login-error');
      errBox.classList.add('hidden');

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          adminToken = data.token;
          localStorage.setItem('cf_admin_token', adminToken);
          showAdminPanel();
          loadAdminData();
        } else {
          errBox.innerText = data.error || '帳號或密碼錯誤';
          errBox.classList.remove('hidden');
        }
      } catch (err) {
        errBox.innerText = '登入失敗：' + err.message;
        errBox.classList.remove('hidden');
      }
    }

    function handleAdminLogout() {
      localStorage.removeItem('cf_admin_token');
      adminToken = null;
      showAdminLogin();
    }

    let allScansCache = [];

    async function loadAdminData() {
      if (!adminToken) return;
      try {
        const statsRes = await fetch('/api/admin/stats', { headers: { 'Authorization': 'Bearer ' + adminToken } });
        if (statsRes.ok) {
          const stats = await statsRes.json();
          document.getElementById('stat-total').innerText = stats.totalScans || 0;
          document.getElementById('stat-vuln').innerText = stats.vulnScans || 0;
          document.getElementById('stat-safe').innerText = stats.safeScans || 0;
          document.getElementById('stat-monitored').innerText = stats.monitoredCount || 0;
        }

        const scansRes = await fetch('/api/admin/scans', { headers: { 'Authorization': 'Bearer ' + adminToken } });
        if (scansRes.ok) {
          const s = await scansRes.json();
          allScansCache = s.scans || [];
          renderAdminScans(allScansCache);
        }

        const monRes = await fetch('/api/admin/monitors', { headers: { 'Authorization': 'Bearer ' + adminToken } });
        if (monRes.ok) {
          const m = await monRes.json();
          renderAdminMonitors(m.monitors || []);
        }

        const setRes = await fetch('/api/admin/settings', { headers: { 'Authorization': 'Bearer ' + adminToken } });
        if (setRes.ok) {
          const cfg = await setRes.json();
          document.getElementById('setting-webhook-url').value = cfg.webhook_url || '';
          document.getElementById('setting-webhook-enabled').checked = cfg.webhook_enabled === '1';
        }
      } catch (err) {
        console.error('Failed to load admin data', err);
      }
    }

    function renderAdminScans(scans) {
      const tbody = document.getElementById('admin-scans-tbody');
      if (scans.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-500">尚無檢測紀錄</td></tr>';
        return;
      }
      tbody.innerHTML = scans.map(s => {
        let statusBadge = '<span class="text-amber-400">UNKNOWN</span>';
        if (s.patch_status === 'ok') statusBadge = '<span class="text-emerald-400">OK</span>';
        if (s.patch_status === 'potentially_vulnerable') statusBadge = '<span class="text-rose-400">VULNERABLE</span>';

        return \`
          <tr class="hover:bg-slate-800/40">
            <td class="p-3 text-slate-400 text-xs whitespace-nowrap">\${escapeHtml(s.created_at || '-')}</td>
            <td class="p-3 text-white truncate max-w-xs">\${escapeHtml(s.url)}</td>
            <td class="p-3">\${statusBadge}</td>
            <td class="p-3 text-sky-400">\${escapeHtml(s.php_version || '-')}</td>
            <td class="p-3 text-slate-400 text-xs truncate max-w-md">\${escapeHtml(s.reason)}</td>
            <td class="p-3">
              <button onclick="deleteScan('\${s.id}')" class="text-rose-400 hover:text-rose-300">刪除</button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function filterAdminScans() {
      const q = document.getElementById('admin-search-scan').value.toLowerCase();
      const filtered = allScansCache.filter(s => 
        (s.url && s.url.toLowerCase().includes(q)) ||
        (s.patch_status && s.patch_status.toLowerCase().includes(q)) ||
        (s.php_version && s.php_version.toLowerCase().includes(q))
      );
      renderAdminScans(filtered);
    }

    async function deleteScan(id) {
      if (!confirm('確定要刪除這筆檢測紀錄嗎？')) return;
      await fetch('/api/admin/scans/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    async function clearScanLogs() {
      if (!confirm('警告：確定要清空所有歷史檢測日誌嗎？此操作不可逆！')) return;
      await fetch('/api/admin/scans/clear', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    function renderAdminMonitors(monitors) {
      const tbody = document.getElementById('admin-monitors-tbody');
      if (monitors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-500">尚未建立任何排程監控站台</td></tr>';
        return;
      }
      tbody.innerHTML = monitors.map(m => \`
        <tr class="hover:bg-slate-800/40">
          <td class="p-3 text-white font-semibold">\${escapeHtml(m.label)}</td>
          <td class="p-3 text-slate-300 truncate max-w-xs">\${escapeHtml(m.url)}</td>
          <td class="p-3">\${m.last_status === 'ok' ? '<span class="text-emerald-400">OK</span>' : m.last_status === 'potentially_vulnerable' ? '<span class="text-rose-400">VULNERABLE</span>' : '<span class="text-amber-400">UNKNOWN</span>'}</td>
          <td class="p-3 text-sky-400">\${escapeHtml(m.last_version || '-')}</td>
          <td class="p-3 text-slate-400 text-xs">\${escapeHtml(m.last_checked_at || '尚未執行')}</td>
          <td class="p-3 space-x-2">
            <button onclick="triggerMonitorScan('\${m.id}')" class="text-sky-400 hover:text-sky-300">立即掃描</button>
            <button onclick="deleteMonitor('\${m.id}')" class="text-rose-400 hover:text-rose-300">移除</button>
          </td>
        </tr>
      \`).join('');
    }

    async function addMonitoredTarget() {
      const url = document.getElementById('new-monitor-url').value.trim();
      const label = document.getElementById('new-monitor-label').value.trim();
      if (!url) return alert('請填寫目標 URL');

      await fetch('/api/admin/monitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken },
        body: JSON.stringify({ url, label: label || url })
      });
      document.getElementById('new-monitor-url').value = '';
      document.getElementById('new-monitor-label').value = '';
      loadAdminData();
    }

    async function triggerMonitorScan(id) {
      await fetch('/api/admin/monitors/' + id + '/scan', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      alert('已觸發即時巡檢！');
      loadAdminData();
    }

    async function deleteMonitor(id) {
      if (!confirm('確定移除此監控目標？')) return;
      await fetch('/api/admin/monitors/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    function switchAdminSubTab(sub) {
      ['scans', 'monitors', 'settings'].forEach(s => {
        document.getElementById('admin-subtab-' + s).classList.toggle('hidden', s !== sub);
        const btn = document.getElementById('admin-subtab-' + s + '-btn');
        if (s === sub) {
          btn.className = "pb-2 text-sm font-semibold border-b-2 border-sky-400 text-sky-400";
        } else {
          btn.className = "pb-2 text-sm font-semibold border-b-2 border-transparent text-slate-400 hover:text-white";
        }
      });
    }

    async function saveAdminSettings() {
      const webhook_url = document.getElementById('setting-webhook-url').value.trim();
      const webhook_enabled = document.getElementById('setting-webhook-enabled').checked ? '1' : '0';
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken },
        body: JSON.stringify({ webhook_url, webhook_enabled })
      });
      alert('設定儲存成功！');
    }

    async function testWebhook() {
      const res = await fetch('/api/admin/settings/test-webhook', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      const data = await res.json();
      alert(data.message || '已發送測試告警');
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // Auto-load report if query param ?report=<id> exists
    window.addEventListener('DOMContentLoaded', async () => {
      const params = new URLSearchParams(window.location.search);
      const reportId = params.get('report');
      if (reportId) {
        try {
          const res = await fetch('/api/report/' + reportId);
          if (res.ok) {
            const report = await res.json();
            renderScanResult(report);
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  </script>
</body>
</html>
`
}
