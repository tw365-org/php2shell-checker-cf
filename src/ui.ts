// Obsidian TUI / agy Console Theme for PHP2Shell Edge Security Checker
// Crafted with Huashu-Design principles & developer-grade CLI aesthetics
// Pure Obsidian Palette, ANSI Semantic Badges, Monospace Grid, and Zero Broken Assets

export const FAVICON_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230a0b0e'/%3E%3Ctext x='4' y='22' font-family='monospace' font-weight='900' font-size='18' fill='%2310b981'%3E%E2%9D%AF_%3C/text%3E%3C/svg%3E`

export function renderAppHtml(appName = 'PHP2Shell Edge Checker'): string {
  return `<!DOCTYPE html>
<html lang="zh-TW" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName} :: agy console</title>
  <!-- Mandatory Embedded Vector SVG Favicon: Obsidian Prompt ❯_ -->
  <link rel="icon" type="image/svg+xml" href="${FAVICON_SVG}">
  <!-- Tailwind CSS CDN for Zero-Build Edge Distribution -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            obsidian: {
              950: '#08090c',
              900: '#0d0e12',
              850: '#12141a',
              800: '#1a1d24',
              700: '#272b36',
            },
            ansi: {
              green: '#10b981',
              amber: '#f59e0b',
              red: '#f43f5e',
              cyan: '#06b6d4',
              blue: '#3b82f6',
              purple: '#a855f7',
              gray: '#64748b',
            }
          },
          fontFamily: {
            mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');
    * {
      font-family: 'JetBrains Mono', monospace;
    }
    ::selection {
      background-color: #10b981;
      color: #08090c;
    }
    .tui-border {
      border: 1px solid #272b36;
    }
    .tui-glow {
      box-shadow: 0 0 15px -3px rgba(16, 185, 129, 0.15);
    }
    .cursor-blink {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .scan-pattern {
      background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 16px 16px;
    }
  </style>
</head>
<body class="bg-obsidian-950 text-zinc-200 min-h-screen flex flex-col antialiased scan-pattern">

  <!-- Top Terminal Bar (Window Header) -->
  <header class="border-b border-obsidian-800 bg-obsidian-900/90 backdrop-blur-sm sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
      <!-- Window Title / Host Details -->
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
        </div>
        <div class="h-4 w-px bg-obsidian-800"></div>
        <div class="flex items-center gap-2 cursor-pointer" onclick="switchTab('front')">
          <span class="text-ansi-green font-bold text-sm tracking-tight">❯</span>
          <span class="text-xs font-bold text-white tracking-wider">agy</span>
          <span class="text-xs text-zinc-500">v1.0.0-cf</span>
          <span class="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-obsidian-800 text-zinc-400 border border-obsidian-700">
            edge-runtime: cf-workers
          </span>
        </div>
      </div>

      <!-- Navigation as CLI Subcommands -->
      <nav class="flex items-center space-x-1 sm:space-x-2 text-xs">
        <button id="nav-btn-front" onclick="switchTab('front')" class="px-2.5 py-1 rounded bg-obsidian-800 text-ansi-green border border-obsidian-700 font-semibold transition">
          <span class="text-zinc-500 font-normal">[1]</span> agy check
        </button>
        <button id="nav-btn-batch" onclick="switchTab('batch')" class="px-2.5 py-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition">
          <span class="text-zinc-500 font-normal">[2]</span> agy batch
        </button>
        <button id="nav-btn-admin" onclick="switchTab('admin')" class="px-2.5 py-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition">
          <span class="text-zinc-500 font-normal">[3]</span> agy admin
        </button>
        <div class="h-4 w-px bg-obsidian-800 mx-1"></div>
        <button onclick="toggleTheme()" class="px-2 py-1 text-zinc-500 hover:text-zinc-300 text-xs" title="切換高對比">
          <span class="text-[11px]">MODE</span>
        </button>
      </nav>
    </div>
  </header>

  <!-- Main Terminal Workspace -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6">

    <!-- ============================================== -->
    <!-- VIEW 1: SINGLE CHECK (agy check) -->
    <!-- ============================================== -->
    <div id="view-front" class="space-y-6 max-w-4xl mx-auto">
      
      <!-- Terminal ASCII Header Banner -->
      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-4 sm:p-5 text-xs text-zinc-400 space-y-2">
        <div class="flex items-center justify-between border-b border-obsidian-800 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-ansi-green font-bold">●</span>
            <span class="font-bold text-zinc-200 uppercase tracking-widest text-[11px]">SECURITY ADVISORY CHECKER</span>
            <span class="text-zinc-500">:: CVE-2026-109618 / CVE-2026-109619</span>
          </div>
          <span class="text-[10px] text-zinc-500 font-mono">STATUS: ACTIVE</span>
        </div>
        <p class="text-zinc-400 leading-relaxed text-xs">
          Detects potential PHP2Shell vulnerability exposure by analyzing remote HTTP headers (<code class="text-zinc-300">Server</code>, <code class="text-zinc-300">X-Powered-By</code>) from Cloudflare edge locations worldwide. Upstream fixes: <span class="text-ansi-green font-bold">8.2.35</span>, <span class="text-ansi-green font-bold">8.3.36</span>, <span class="text-ansi-green font-bold">8.4.27</span>, <span class="text-ansi-green font-bold">8.5.12</span>.
        </p>
      </div>

      <!-- Command Prompt Input Box -->
      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-3 sm:p-4 tui-glow">
        <form id="single-scan-form" onsubmit="handleSingleScan(event)" class="space-y-3">
          <div class="flex items-center text-xs text-zinc-400">
            <span class="text-ansi-green font-bold mr-2">❯</span>
            <span class="text-zinc-400 mr-2">agy check</span>
            <span class="text-zinc-500">--url</span>
          </div>

          <div class="relative flex items-center">
            <input type="text" id="target-url" placeholder="https://example.com" required
              class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2.5 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-ansi-green focus:ring-1 focus:ring-ansi-green font-mono">
            <button type="submit" id="btn-submit-scan"
              class="absolute right-1.5 px-3 py-1.5 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 rounded text-xs font-semibold transition flex items-center gap-1.5">
              <span id="scan-spinner" class="hidden">...</span>
              <span>[RUN]</span>
            </button>
          </div>

          <!-- CLI Quick Args Chips -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span class="text-zinc-500">targets:</span>
            <button type="button" onclick="fillUrl('php.net')" class="px-2 py-0.5 rounded bg-obsidian-850 hover:bg-obsidian-800 text-zinc-400 border border-obsidian-800">--url php.net</button>
            <button type="button" onclick="fillUrl('wordpress.org')" class="px-2 py-0.5 rounded bg-obsidian-850 hover:bg-obsidian-800 text-zinc-400 border border-obsidian-800">--url wordpress.org</button>
            <button type="button" onclick="fillUrl('wikipedia.org')" class="px-2 py-0.5 rounded bg-obsidian-850 hover:bg-obsidian-800 text-zinc-400 border border-obsidian-800">--url wikipedia.org</button>
            <span class="text-zinc-600 ml-auto hidden sm:inline text-[10px]">press [Enter] to execute</span>
          </div>
        </form>
      </div>

      <!-- Result Terminal Output -->
      <div id="scan-result" class="hidden">
        <!-- Rendered by JS as structured TUI block -->
      </div>

    </div>

    <!-- ============================================== -->
    <!-- VIEW 2: BATCH SCAN (agy batch) -->
    <!-- ============================================== -->
    <div id="view-batch" class="hidden space-y-6 max-w-4xl mx-auto">
      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-4 text-xs space-y-1">
        <div class="flex items-center gap-2 text-zinc-300 font-bold">
          <span class="text-ansi-cyan">⚡</span>
          <span>BATCH TARGET INSPECTOR (CONCURRENT CLI QUEUE)</span>
        </div>
        <p class="text-zinc-500 text-[11px]">Input up to 20 domains/URLs line by line. Executes concurrent edge HTTP probes.</p>
      </div>

      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-4 space-y-3">
        <div class="text-xs text-zinc-400 flex items-center justify-between">
          <span><span class="text-ansi-green font-bold">❯</span> agy batch --stdin</span>
          <span id="batch-count" class="text-zinc-500 text-[11px]">0 targets queued</span>
        </div>
        <textarea id="batch-urls" rows="6" placeholder="https://domain-alpha.com&#10;https://domain-bravo.org&#10;https://example.net"
          class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-ansi-cyan font-mono"></textarea>
        
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-zinc-500">SSRF filtering enforced on all targets</span>
          <button onclick="handleBatchScan()" id="btn-batch-scan"
            class="px-4 py-1.5 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-cyan border border-obsidian-700 rounded text-xs font-semibold transition">
            [EXECUTE BATCH]
          </button>
        </div>
      </div>

      <!-- Batch Result Table -->
      <div id="batch-results-container" class="hidden space-y-3">
        <div class="flex items-center justify-between border-b border-obsidian-800 pb-2 text-xs">
          <span class="text-zinc-300 font-bold uppercase">EXECUTION RESULT STREAM</span>
          <div id="batch-summary-chips" class="text-xs space-x-2"></div>
        </div>

        <div class="border border-obsidian-800 rounded bg-obsidian-900 overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-obsidian-850 text-zinc-400 border-b border-obsidian-800 uppercase text-[11px]">
              <tr>
                <th class="p-2.5">TARGET</th>
                <th class="p-2.5">STATUS</th>
                <th class="p-2.5">PHP_VER</th>
                <th class="p-2.5">EXIT</th>
                <th class="p-2.5">DIAGNOSTIC</th>
              </tr>
            </thead>
            <tbody id="batch-table-body" class="divide-y divide-obsidian-800 text-[11px]">
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- VIEW 3: ADMIN DASHBOARD (agy admin) -->
    <!-- ============================================== -->
    <div id="view-admin" class="hidden space-y-6 max-w-5xl mx-auto">
      
      <!-- Login Prompt (If not authed) -->
      <div id="admin-login-box" class="max-w-md mx-auto bg-obsidian-900 border border-obsidian-800 rounded-lg p-6 space-y-4">
        <div class="border-b border-obsidian-800 pb-3">
          <div class="text-xs text-ansi-amber font-bold flex items-center gap-1.5">
            <span>🔒</span>
            <span>AUTHENTICATION REQUIRED</span>
          </div>
          <div class="text-xs text-zinc-500 mt-1 font-mono">user@edge:~$ agy auth --login</div>
        </div>

        <form onsubmit="handleAdminLogin(event)" class="space-y-3 text-xs">
          <div>
            <label class="block text-zinc-400 mb-1">USERNAME</label>
            <input type="text" id="admin-user-input" value="admin" required
              class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2 text-zinc-200 focus:outline-none focus:border-ansi-green">
          </div>
          <div>
            <label class="block text-zinc-400 mb-1">PASSWORD / TOKEN</label>
            <input type="password" id="admin-pass-input" placeholder="••••••••" required
              class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2 text-zinc-200 focus:outline-none focus:border-ansi-green">
          </div>
          <p id="admin-login-error" class="text-ansi-red text-xs hidden"></p>
          <button type="submit" class="w-full py-2 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 rounded font-bold transition">
            [AUTHENTICATE]
          </button>
        </form>
      </div>

      <!-- Admin Management Console (If authed) -->
      <div id="admin-panel" class="hidden space-y-6">
        
        <!-- Header & Telemetry Block -->
        <div class="border border-obsidian-800 rounded-lg bg-obsidian-900 p-4 space-y-3">
          <div class="flex items-center justify-between border-b border-obsidian-800 pb-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-ansi-green font-bold">●</span>
              <span class="text-white font-bold tracking-wider uppercase text-[11px]">TELEMETRY & AUDIT CONSOLE</span>
              <span class="text-zinc-500 text-[10px]">[D1: CONNECTED]</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="loadAdminData()" class="px-2 py-0.5 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750 text-[11px] rounded">
                [REFRESH]
              </button>
              <button onclick="handleAdminLogout()" class="px-2 py-0.5 bg-obsidian-850 hover:bg-rose-950 text-ansi-red border border-rose-900/50 text-[11px] rounded">
                [LOGOUT]
              </button>
            </div>
          </div>

          <!-- Telemetry Metric Strip -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-2.5">
              <div class="text-[10px] text-zinc-500 uppercase">TOTAL_SCANS</div>
              <div id="stat-total" class="text-lg font-bold text-zinc-100 font-mono mt-0.5">0</div>
            </div>
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-2.5">
              <div class="text-[10px] text-ansi-red uppercase">VULNERABLE_DETECTED</div>
              <div id="stat-vuln" class="text-lg font-bold text-ansi-red font-mono mt-0.5">0</div>
            </div>
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-2.5">
              <div class="text-[10px] text-ansi-green uppercase">SAFE_PATCHED</div>
              <div id="stat-safe" class="text-lg font-bold text-ansi-green font-mono mt-0.5">0</div>
            </div>
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-2.5">
              <div class="text-[10px] text-ansi-cyan uppercase">CRON_MONITORS</div>
              <div id="stat-monitored" class="text-lg font-bold text-ansi-cyan font-mono mt-0.5">0</div>
            </div>
          </div>
        </div>

        <!-- Subcommands Navigation -->
        <div class="flex border-b border-obsidian-800 text-xs space-x-3">
          <button id="admin-subtab-scans-btn" onclick="switchAdminSubTab('scans')" class="pb-2 border-b-2 border-ansi-green text-ansi-green font-bold">
            [1] agy scans --history
          </button>
          <button id="admin-subtab-monitors-btn" onclick="switchAdminSubTab('monitors')" class="pb-2 border-b-2 border-transparent text-zinc-400 hover:text-zinc-200">
            [2] agy monitors --daemon
          </button>
          <button id="admin-subtab-settings-btn" onclick="switchAdminSubTab('settings')" class="pb-2 border-b-2 border-transparent text-zinc-400 hover:text-zinc-200">
            [3] agy alert --webhook
          </button>
        </div>

        <!-- SUBTAB 1: Scans History -->
        <div id="admin-subtab-scans" class="space-y-3">
          <div class="flex items-center justify-between gap-3 text-xs">
            <input type="text" id="admin-search-scan" oninput="filterAdminScans()" placeholder="grep URL / STATUS / PHP_VER..."
              class="w-full max-w-sm bg-obsidian-950 border border-obsidian-750 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-ansi-green">
            <button onclick="clearScanLogs()" class="px-2.5 py-1.5 bg-obsidian-900 hover:bg-rose-950 text-ansi-red border border-obsidian-700 text-xs rounded transition whitespace-nowrap">
              [TRUNCATE LOGS]
            </button>
          </div>

          <div class="border border-obsidian-800 rounded bg-obsidian-900 overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-obsidian-850 text-zinc-400 border-b border-obsidian-800 uppercase text-[10px]">
                <tr>
                  <th class="p-2.5">TIMESTAMP (UTC)</th>
                  <th class="p-2.5">TARGET</th>
                  <th class="p-2.5">STATUS</th>
                  <th class="p-2.5">VERSION</th>
                  <th class="p-2.5">REASON</th>
                  <th class="p-2.5">ACTION</th>
                </tr>
              </thead>
              <tbody id="admin-scans-tbody" class="divide-y divide-obsidian-800 text-[11px]">
                <tr><td colspan="6" class="p-4 text-center text-zinc-500">Loading audit records...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 2: Monitored Targets -->
        <div id="admin-subtab-monitors" class="hidden space-y-4">
          <div class="bg-obsidian-900 border border-obsidian-800 rounded p-3 text-xs flex flex-col sm:flex-row gap-2 items-end">
            <div class="flex-1 w-full">
              <label class="block text-zinc-400 text-[10px] mb-1">TARGET URL</label>
              <input type="text" id="new-monitor-url" placeholder="https://internal-app.domain.com" class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2 text-xs text-white">
            </div>
            <div class="w-full sm:w-48">
              <label class="block text-zinc-400 text-[10px] mb-1">LABEL</label>
              <input type="text" id="new-monitor-label" placeholder="Core Portal" class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2 text-xs text-white">
            </div>
            <button onclick="addMonitoredTarget()" class="w-full sm:w-auto px-3 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 text-xs font-semibold rounded">
              [ADD TARGET]
            </button>
          </div>

          <div class="border border-obsidian-800 rounded bg-obsidian-900 overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-obsidian-850 text-zinc-400 border-b border-obsidian-800 uppercase text-[10px]">
                <tr>
                  <th class="p-2.5">LABEL</th>
                  <th class="p-2.5">URL</th>
                  <th class="p-2.5">LAST_STATUS</th>
                  <th class="p-2.5">VERSION</th>
                  <th class="p-2.5">LAST_CHECKED</th>
                  <th class="p-2.5">OPS</th>
                </tr>
              </thead>
              <tbody id="admin-monitors-tbody" class="divide-y divide-obsidian-800 text-[11px]">
                <tr><td colspan="6" class="p-4 text-center text-zinc-500">No daemon targets registered.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 3: Alert Settings -->
        <div id="admin-subtab-settings" class="hidden space-y-4 max-w-xl">
          <div class="bg-obsidian-900 border border-obsidian-800 rounded p-4 space-y-3 text-xs">
            <div class="border-b border-obsidian-800 pb-2">
              <span class="text-zinc-200 font-bold uppercase text-[11px]">WEBHOOK NOTIFICATION PIPELINE</span>
              <p class="text-zinc-500 text-[10px] mt-0.5">Dispatches alert payload when scheduled cron probe detects vulnerable PHP version.</p>
            </div>
            <div>
              <label class="block text-zinc-400 text-[10px] mb-1">WEBHOOK ENDPOINT (DISCORD / SLACK / SIEM)</label>
              <input type="url" id="setting-webhook-url" placeholder="https://discord.com/api/webhooks/..."
                class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2 text-xs text-white font-mono">
            </div>
            <div class="flex items-center space-x-2 pt-1">
              <input type="checkbox" id="setting-webhook-enabled" class="rounded bg-obsidian-950 border-obsidian-700 text-ansi-green focus:ring-0">
              <label for="setting-webhook-enabled" class="text-zinc-300 text-xs">Enable Cron Trigger Alerts</label>
            </div>
            <div class="pt-2 flex items-center gap-2">
              <button onclick="saveAdminSettings()" class="px-3 py-1.5 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 text-xs font-semibold rounded">
                [SAVE CONFIG]
              </button>
              <button onclick="testWebhook()" class="px-3 py-1.5 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750 text-xs rounded">
                [TEST DISPATCH]
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main>

  <!-- Terminal Status Footer Bar -->
  <footer class="border-t border-obsidian-800 bg-obsidian-950 py-3 text-[11px] text-zinc-500">
    <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center space-x-2">
        <span class="text-ansi-green">❯_</span>
        <span>agy-cli compatible</span>
        <span>::</span>
        <a href="https://github.com/tw365-org/php2shell-checker-cf" target="_blank" class="text-zinc-400 hover:text-ansi-green">tw365-org/php2shell-checker-cf</a>
        <span>::</span>
        <a href="https://github.com/openai/php2shell-checker" target="_blank" class="hover:text-zinc-300">upstream: openai/php2shell-checker</a>
      </div>
      <div>
        <span>RUNTIME: Cloudflare Workers + D1 Database</span>
      </div>
    </div>
  </footer>

  <!-- Client Script for Terminal UX -->
  <script>
    // Tab Switching
    function switchTab(tab) {
      document.getElementById('view-front').classList.toggle('hidden', tab !== 'front');
      document.getElementById('view-batch').classList.toggle('hidden', tab !== 'batch');
      document.getElementById('view-admin').classList.toggle('hidden', tab !== 'admin');

      ['front', 'batch', 'admin'].forEach(t => {
        const btn = document.getElementById('nav-btn-' + t);
        if (t === tab) {
          btn.className = "px-2.5 py-1 rounded bg-obsidian-800 text-ansi-green border border-obsidian-700 font-semibold transition";
        } else {
          btn.className = "px-2.5 py-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition";
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
      // Toggle high contrast terminal mode
      document.body.classList.toggle('contrast-125');
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
        alert('Diagnostic request failed: ' + err.message);
      } finally {
        submitBtn.disabled = false;
        spinner.classList.add('hidden');
      }
    }

    function renderScanResult(data) {
      const area = document.getElementById('scan-result');
      area.classList.remove('hidden');

      let statusColor = 'text-ansi-amber border-amber-900/60 bg-amber-950/20';
      let statusTag = '[UNKNOWN: 3]';
      let icon = '❓';

      if (data.patch_status === 'ok') {
        statusColor = 'text-ansi-green border-emerald-900/60 bg-emerald-950/20';
        statusTag = '[OK: 0] UPSTREAM_FIXED';
        icon = '✔';
      } else if (data.patch_status === 'potentially_vulnerable') {
        statusColor = 'text-ansi-red border-rose-900/60 bg-rose-950/20';
        statusTag = '[VULNERABLE: 1] POTENTIALLY_EXPOSED';
        icon = '✖';
      }

      area.innerHTML = \`
        <div class="border border-obsidian-800 bg-obsidian-900 rounded-lg p-4 sm:p-5 space-y-4 font-mono text-xs">
          <!-- Status Banner -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-800 pb-3">
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-widest">DIAGNOSTIC TARGET</div>
              <div class="text-sm font-bold text-white break-all mt-0.5">\${escapeHtml(data.url)}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded text-xs font-bold border \${statusColor} font-mono">
                \${icon} \${statusTag}
              </span>
            </div>
          </div>

          <!-- Version & Exit Code Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-obsidian-950 p-2.5 rounded border border-obsidian-800">
              <span class="text-[10px] text-zinc-500 block uppercase">DETECTED PHP</span>
              <span class="text-xs font-bold \${data.php_version ? 'text-ansi-cyan' : 'text-zinc-600'}">
                \${data.php_version ? 'PHP ' + escapeHtml(data.php_version) : 'NOT ADVERTISED'}
              </span>
            </div>
            <div class="bg-obsidian-950 p-2.5 rounded border border-obsidian-800">
              <span class="text-[10px] text-zinc-500 block uppercase">EXIT CODE</span>
              <span class="text-xs font-bold text-zinc-300">CODE \${data.exit_code}</span>
            </div>
            <div class="bg-obsidian-950 p-2.5 rounded border border-obsidian-800">
              <span class="text-[10px] text-zinc-500 block uppercase">CVE REFERENCES</span>
              <span class="text-xs text-zinc-400">109618 / 109619</span>
            </div>
          </div>

          <!-- Reason Box -->
          <div class="bg-obsidian-950 p-3 rounded border border-obsidian-800 space-y-1">
            <div class="text-[10px] text-zinc-500 uppercase">DIAGNOSTIC REASON</div>
            <p class="text-zinc-300 leading-relaxed">\${escapeHtml(data.reason)}</p>
          </div>

          <!-- Headers Accordion -->
          \${data.headers_summary ? \`
            <details class="text-[11px] text-zinc-400">
              <summary class="cursor-pointer hover:text-zinc-200 py-1 text-zinc-500">[+] SHOW RAW RESPONSE HEADERS</summary>
              <pre class="mt-2 p-2.5 bg-obsidian-950 rounded border border-obsidian-800 text-zinc-300 overflow-x-auto whitespace-pre-wrap font-mono text-[11px]">\${escapeHtml(data.headers_summary)}</pre>
            </details>
          \` : ''}

          <!-- CLI Quick Actions -->
          <div class="flex flex-wrap items-center justify-between pt-2 border-t border-obsidian-800 gap-2">
            <div class="flex items-center space-x-2">
              <button onclick="copyCliCmd('\${escapeHtml(data.url)}')" class="px-2 py-1 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750 rounded text-[11px]">
                $ agy check "\${escapeHtml(data.url)}" [COPY]
              </button>
            </div>
            \${data.id ? \`
              <button onclick="copyReportLink('\${data.id}')" class="px-2 py-1 bg-obsidian-850 hover:bg-obsidian-800 text-ansi-green border border-obsidian-750 rounded text-[11px]">
                [COPY SHAREABLE LINK]
              </button>
            \` : ''}
          </div>
        </div>
      \`;
    }

    function copyCliCmd(url) {
      const cmd = 'agy check "' + url + '"';
      navigator.clipboard.writeText(cmd).then(() => {
        alert('CLI command copied to clipboard:\\n' + cmd);
      });
    }

    function copyReportLink(id) {
      const url = window.location.origin + '/?report=' + id;
      navigator.clipboard.writeText(url).then(() => {
        alert('Diagnostic report URL copied:\\n' + url);
      });
    }

    // Batch Scan
    async function handleBatchScan() {
      const textarea = document.getElementById('batch-urls');
      const lines = textarea.value.split('\\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return alert('Enter at least one target URL');
      if (lines.length > 20) return alert('Maximum 20 targets per batch run');

      const btn = document.getElementById('btn-batch-scan');
      btn.disabled = true;
      btn.innerText = '[EXECUTING PROBES...]';

      try {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: lines })
        });
        const data = await res.json();
        renderBatchResults(data.results || []);
      } catch (err) {
        alert('Batch scan failed: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = '[EXECUTE BATCH]';
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
        <span class="text-ansi-red font-bold">[VULN: \${vuln}]</span>
        <span class="text-ansi-green font-bold">[OK: \${ok}]</span>
        <span class="text-ansi-amber font-bold">[UNK: \${unk}]</span>
      \`;

      tbody.innerHTML = results.map(r => {
        let badge = '<span class="text-ansi-amber">[UNKNOWN]</span>';
        if (r.patch_status === 'ok') badge = '<span class="text-ansi-green">[OK]</span>';
        if (r.patch_status === 'potentially_vulnerable') badge = '<span class="text-ansi-red">[VULN]</span>';

        return \`
          <tr class="hover:bg-obsidian-850">
            <td class="p-2 text-white truncate max-w-xs">\${escapeHtml(r.url)}</td>
            <td class="p-2">\${badge}</td>
            <td class="p-2 text-ansi-cyan">\${escapeHtml(r.php_version || '-')}</td>
            <td class="p-2 text-zinc-400">\${r.exit_code}</td>
            <td class="p-2 text-zinc-400 truncate max-w-sm">\${escapeHtml(r.reason)}</td>
          </tr>
        \`;
      }).join('');
    }

    // Admin Authentication & Subcommand Handlers
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
          errBox.innerText = 'Authentication failed: ' + (data.error || 'Invalid credentials');
          errBox.classList.remove('hidden');
        }
      } catch (err) {
        errBox.innerText = 'Network error: ' + err.message;
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
        console.error('Failed to load admin telemetry', err);
      }
    }

    function renderAdminScans(scans) {
      const tbody = document.getElementById('admin-scans-tbody');
      if (scans.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-zinc-500">No audit records found.</td></tr>';
        return;
      }
      tbody.innerHTML = scans.map(s => {
        let statusBadge = '<span class="text-ansi-amber">[UNKNOWN]</span>';
        if (s.patch_status === 'ok') statusBadge = '<span class="text-ansi-green">[OK]</span>';
        if (s.patch_status === 'potentially_vulnerable') statusBadge = '<span class="text-ansi-red">[VULN]</span>';

        return \`
          <tr class="hover:bg-obsidian-850">
            <td class="p-2.5 text-zinc-400 whitespace-nowrap">\${escapeHtml(s.created_at || '-')}</td>
            <td class="p-2.5 text-white truncate max-w-xs">\${escapeHtml(s.url)}</td>
            <td class="p-2.5">\${statusBadge}</td>
            <td class="p-2.5 text-ansi-cyan">\${escapeHtml(s.php_version || '-')}</td>
            <td class="p-2.5 text-zinc-400 truncate max-w-xs">\${escapeHtml(s.reason)}</td>
            <td class="p-2.5">
              <button onclick="deleteScan('\${s.id}')" class="text-ansi-red hover:underline">[RM]</button>
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
      if (!confirm('Confirm deletion of record ' + id + '?')) return;
      await fetch('/api/admin/scans/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    async function clearScanLogs() {
      if (!confirm('WARNING: Truncate all historical scan records from D1?')) return;
      await fetch('/api/admin/scans/clear', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    function renderAdminMonitors(monitors) {
      const tbody = document.getElementById('admin-monitors-tbody');
      if (monitors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-zinc-500">No daemon targets registered.</td></tr>';
        return;
      }
      tbody.innerHTML = monitors.map(m => \`
        <tr class="hover:bg-obsidian-850">
          <td class="p-2.5 text-white font-bold">\${escapeHtml(m.label)}</td>
          <td class="p-2.5 text-zinc-300 truncate max-w-xs">\${escapeHtml(m.url)}</td>
          <td class="p-2.5">\${m.last_status === 'ok' ? '<span class="text-ansi-green">[OK]</span>' : m.last_status === 'potentially_vulnerable' ? '<span class="text-ansi-red">[VULN]</span>' : '<span class="text-ansi-amber">[UNKNOWN]</span>'}</td>
          <td class="p-2.5 text-ansi-cyan">\${escapeHtml(m.last_version || '-')}</td>
          <td class="p-2.5 text-zinc-400 whitespace-nowrap">\${escapeHtml(m.last_checked_at || 'PENDING')}</td>
          <td class="p-2.5 space-x-2">
            <button onclick="triggerMonitorScan('\${m.id}')" class="text-ansi-cyan hover:underline">[PROBE]</button>
            <button onclick="deleteMonitor('\${m.id}')" class="text-ansi-red hover:underline">[RM]</button>
          </td>
        </tr>
      \`).join('');
    }

    async function addMonitoredTarget() {
      const url = document.getElementById('new-monitor-url').value.trim();
      const label = document.getElementById('new-monitor-label').value.trim();
      if (!url) return alert('Target URL required');

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
      alert('Immediate probe dispatched.');
      loadAdminData();
    }

    async function deleteMonitor(id) {
      if (!confirm('Remove target from daemon list?')) return;
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
          btn.className = "pb-2 border-b-2 border-ansi-green text-ansi-green font-bold";
        } else {
          btn.className = "pb-2 border-b-2 border-transparent text-zinc-400 hover:text-zinc-200";
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
      alert('Webhook config persisted to D1.');
    }

    async function testWebhook() {
      const res = await fetch('/api/admin/settings/test-webhook', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      const data = await res.json();
      alert(data.message || 'Test alert dispatched.');
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

    // Auto-load report if ?report=<id>
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

    // Keyboard Shortcuts: '/' focuses input, 'Escape' clears
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const input = document.getElementById('target-url');
        if (input) input.focus();
      }
    });
  </script>
</body>
</html>
`
}
