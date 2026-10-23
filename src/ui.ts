// Obsidian TUI / agy Console Theme for PHP2Shell Edge Security Checker
// Crafted with Huashu-Design principles & developer-grade CLI aesthetics
// Pure Obsidian Palette, ANSI Semantic Badges, Monospace Grid, and Zero Broken Assets
// Features Senior-Friendly Font Magnification Engine (Root rem Scaling, NOT browser zoom)
// Features Full Bilingual Support (Traditional Chinese zh-TW default & English en)

export const FAVICON_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230a0b0e'/%3E%3Ctext x='4' y='22' font-family='monospace' font-weight='900' font-size='18' fill='%2310b981'%3E%E2%9D%AF_%3C/text%3E%3C/svg%3E`

export function renderAppHtml(appName = 'PHP2Shell Edge Checker', initialTab: 'front' | 'batch' | 'admin' = 'front'): string {
  const isFront = initialTab === 'front';
  const isBatch = initialTab === 'batch';
  const isAdmin = initialTab === 'admin';

  const navFrontCls = isFront
    ? "px-2.5 py-1.5 rounded bg-obsidian-800 text-ansi-green border border-obsidian-700 font-bold transition"
    : "px-2.5 py-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition";
  const navBatchCls = isBatch
    ? "px-2.5 py-1.5 rounded bg-obsidian-800 text-ansi-green border border-obsidian-700 font-bold transition"
    : "px-2.5 py-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition";
  const navAdminCls = isAdmin
    ? "px-2.5 py-1.5 rounded bg-obsidian-800 text-ansi-green border border-obsidian-700 font-bold transition"
    : "px-2.5 py-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition";

  const viewFrontCls = isFront ? "space-y-6 max-w-4xl mx-auto" : "hidden space-y-6 max-w-4xl mx-auto";
  const viewBatchCls = isBatch ? "space-y-6 max-w-4xl mx-auto" : "hidden space-y-6 max-w-4xl mx-auto";
  const viewAdminCls = isAdmin ? "space-y-6 max-w-5xl mx-auto" : "hidden space-y-6 max-w-5xl mx-auto";

  return `<!DOCTYPE html>
<html lang="zh-TW" class="dark" style="font-size: 100%;">
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
              950: 'var(--bg-950)',
              900: 'var(--bg-900)',
              850: 'var(--bg-850)',
              800: 'var(--bg-800)',
              750: 'var(--bg-750)',
              700: 'var(--bg-700)',
            },
            ansi: {
              green: 'var(--ansi-green)',
              amber: 'var(--ansi-amber)',
              red: 'var(--ansi-red)',
              cyan: 'var(--ansi-cyan)',
              blue: 'var(--ansi-blue)',
              purple: 'var(--ansi-purple)',
              gray: 'var(--ansi-gray)',
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
    
    /* ---------------------------------------------------- */
    /* Theme Tokens Engine (Multi-Retro Developer Palettes)  */
    /* ---------------------------------------------------- */
    :root, [data-theme="obsidian"] {
      --bg-950: #08090c;
      --bg-900: #0d0e12;
      --bg-850: #12141a;
      --bg-800: #1a1d24;
      --bg-750: #21252e;
      --bg-700: #272b36;
      --ansi-green: #10b981;
      --ansi-amber: #f59e0b;
      --ansi-red: #f43f5e;
      --ansi-cyan: #06b6d4;
      --ansi-blue: #3b82f6;
      --ansi-purple: #a855f7;
      --ansi-gray: #64748b;
      --primary-accent: #10b981;
    }

    [data-theme="vt100"] {
      --bg-950: #040804;
      --bg-900: #081208;
      --bg-850: #0c1a0c;
      --bg-800: #112611;
      --bg-750: #173317;
      --bg-700: #1f421f;
      --ansi-green: #33ff33;
      --ansi-amber: #ffff33;
      --ansi-red: #ff3333;
      --ansi-cyan: #33ffff;
      --ansi-blue: #3399ff;
      --ansi-purple: #cc33ff;
      --ansi-gray: #448844;
      --primary-accent: #33ff33;
    }

    [data-theme="amber"] {
      --bg-950: #0b0700;
      --bg-900: #130d00;
      --bg-850: #1d1300;
      --bg-800: #2a1c00;
      --bg-750: #382600;
      --bg-700: #493300;
      --ansi-green: #ffb000;
      --ansi-amber: #ff8c00;
      --ansi-red: #ff3b00;
      --ansi-cyan: #ffd700;
      --ansi-blue: #e6a100;
      --ansi-purple: #ff7700;
      --ansi-gray: #8c6200;
      --primary-accent: #ffb000;
    }

    [data-theme="dracula"] {
      --bg-950: #191a21;
      --bg-900: #282a36;
      --bg-850: #343746;
      --bg-800: #44475a;
      --bg-750: #4e5267;
      --bg-700: #6272a4;
      --ansi-green: #50fa7b;
      --ansi-amber: #f1fa8c;
      --ansi-red: #ff5555;
      --ansi-cyan: #8be9fd;
      --ansi-blue: #8be9fd;
      --ansi-purple: #bd93f9;
      --ansi-gray: #6272a4;
      --primary-accent: #bd93f9;
    }

    [data-theme="solarized"] {
      --bg-950: #001e26;
      --bg-900: #002b36;
      --bg-850: #073642;
      --bg-800: #0b4554;
      --bg-750: #105263;
      --bg-700: #586e75;
      --ansi-green: #859900;
      --ansi-amber: #b58900;
      --ansi-red: #dc322f;
      --ansi-cyan: #2aa198;
      --ansi-blue: #268bd2;
      --ansi-purple: #6c71c4;
      --ansi-gray: #657b83;
      --primary-accent: #2aa198;
    }

    [data-theme="win95"] {
      --bg-950: #008080;
      --bg-900: #c0c0c0;
      --bg-850: #d4d0c8;
      --bg-800: #dfdfdf;
      --bg-750: #e7e7e7;
      --bg-700: #808080;
      --ansi-green: #008000;
      --ansi-amber: #808000;
      --ansi-red: #c00000;
      --ansi-cyan: #000080;
      --ansi-blue: #0000ff;
      --ansi-purple: #800080;
      --ansi-gray: #808080;
      --primary-accent: #000080;
    }

    /* CRT Phosphor Scanline Overlay */
    [data-theme="vt100"] body::after,
    [data-theme="amber"] body::after {
      content: " ";
      display: block;
      position: fixed;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.28) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.03));
      z-index: 9999;
      background-size: 100% 3px, 6px 100%;
      pointer-events: none;
      opacity: 0.65;
    }
    [data-theme="vt100"] * {
      text-shadow: 0 0 1.5px rgba(51, 255, 51, 0.45);
    }
    [data-theme="amber"] * {
      text-shadow: 0 0 1.5px rgba(255, 176, 0, 0.45);
    }

    /* Windows 95 Bevel & Theme Overrides */
    [data-theme="win95"] body {
      background-color: #008080 !important;
      color: #000000 !important;
    }
    [data-theme="win95"] header {
      background-color: #000080 !important;
      border-bottom: 2px solid #000000 !important;
    }
    [data-theme="win95"] header * {
      color: #ffffff !important;
    }
    [data-theme="win95"] header select, [data-theme="win95"] header button {
      color: #000000 !important;
      background-color: #c0c0c0 !important;
      border: 2px outset #ffffff !important;
    }
    [data-theme="win95"] .bg-obsidian-900,
    [data-theme="win95"] .bg-obsidian-850,
    [data-theme="win95"] .bg-obsidian-800 {
      background-color: #c0c0c0 !important;
      border: 2px outset #ffffff !important;
      color: #000000 !important;
    }
    [data-theme="win95"] .bg-obsidian-950 {
      background-color: #ffffff !important;
      border: 2px inset #808080 !important;
      color: #000000 !important;
    }
    [data-theme="win95"] input, [data-theme="win95"] textarea {
      background-color: #ffffff !important;
      color: #000000 !important;
      border: 2px inset #808080 !important;
    }
    [data-theme="win95"] button {
      border: 2px outset #ffffff !important;
      background-color: #c0c0c0 !important;
      color: #000000 !important;
    }
    [data-theme="win95"] button:active {
      border: 2px inset #ffffff !important;
    }
    [data-theme="win95"] .text-white,
    [data-theme="win95"] .text-zinc-100,
    [data-theme="win95"] .text-zinc-200,
    [data-theme="win95"] .text-zinc-300,
    [data-theme="win95"] .text-zinc-400 {
      color: #000000 !important;
    }
    [data-theme="win95"] .text-zinc-500,
    [data-theme="win95"] .text-zinc-600 {
      color: #444444 !important;
    }
    [data-theme="win95"] footer {
      background-color: #c0c0c0 !important;
      border-top: 2px groove #ffffff !important;
    }
    [data-theme="win95"] footer * {
      color: #333333 !important;
    }

    html {
      transition: font-size 0.15s ease-in-out;
    }
    * {
      font-family: 'JetBrains Mono', -apple-system, BlinkMacSystemFont, "Microsoft JhengHei", "PingFang TC", monospace;
    }
    ::selection {
      background-color: var(--ansi-green);
      color: var(--bg-950);
    }
    .tui-glow {
      box-shadow: 0 0 15px -3px rgba(16, 185, 129, 0.15);
    }
    .scan-pattern {
      background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 16px 16px;
    }
    body {
      line-height: 1.6;
    }
  </style>
  <script>
    // Immediate script execution to restore font size and theme before initial paint (Anti-FOUC)
    (function() {
      // 1. Font Scale
      const savedFont = localStorage.getItem('cf_font_scale');
      if (savedFont) {
        document.documentElement.style.fontSize = savedFont + '%';
      }
      // 2. Retro Theme
      const urlParams = new URLSearchParams(window.location.search);
      const themeParam = urlParams.get('theme');
      const validThemes = ['obsidian', 'vt100', 'amber', 'dracula', 'solarized', 'win95'];
      const theme = (themeParam && validThemes.includes(themeParam))
        ? themeParam
        : (localStorage.getItem('cf_theme') || 'obsidian');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body class="bg-obsidian-950 text-zinc-200 min-h-screen flex flex-col antialiased scan-pattern font-medium">

  <!-- Top Terminal Bar (Window Header) -->
  <header class="border-b border-obsidian-800 bg-obsidian-900/95 backdrop-blur-sm sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 min-h-[3.25rem] py-2 flex flex-wrap items-center justify-between gap-2">
      
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
          <span class="text-xs sm:text-sm font-bold text-white tracking-wider">agy</span>
          <span class="text-xs text-zinc-500">v1.0.0-cf</span>
        </div>
      </div>

      <!-- Navigation & A11y Controls (Language + Font Resizer) -->
      <div class="flex items-center flex-wrap gap-2">
        
        <!-- Navigation as CLI Subcommands -->
        <nav class="flex items-center space-x-1 sm:space-x-2 text-xs">
          <button id="nav-btn-front" onclick="switchTab('front')" class="${navFrontCls}">
            <span data-i18n="navCheck">[1] 網址檢測</span>
          </button>
          <button id="nav-btn-batch" onclick="switchTab('batch')" class="${navBatchCls}">
            <span data-i18n="navBatch">[2] 批次掃描</span>
          </button>
          <button id="nav-btn-admin" onclick="switchTab('admin')" class="${navAdminCls}">
            <span data-i18n="navAdmin">[3] 後台管理</span>
          </button>
        </nav>

        <div class="h-4 w-px bg-obsidian-800 hidden sm:block"></div>

        <!-- Retro Theme Selector & Shortcut Indicator -->
        <div class="flex items-center bg-obsidian-950 border border-obsidian-750 rounded text-xs">
          <span class="pl-2 pr-1 text-zinc-400">🎨</span>
          <select id="theme-selector" onchange="setTheme(this.value)" class="bg-transparent text-zinc-200 text-xs py-1 pr-1 outline-none cursor-pointer font-semibold border-0">
            <option value="obsidian" class="bg-obsidian-900 text-zinc-200" data-i18n="themeObsidian">⬛ 黑曜石 agy</option>
            <option value="vt100" class="bg-obsidian-900 text-zinc-200" data-i18n="themeVt100">🟢 VT100 綠螢幕</option>
            <option value="amber" class="bg-obsidian-900 text-zinc-200" data-i18n="themeAmber">🟡 復古琥珀 CRT</option>
            <option value="dracula" class="bg-obsidian-900 text-zinc-200" data-i18n="themeDracula">🟣 Dracula 吸血鬼</option>
            <option value="solarized" class="bg-obsidian-900 text-zinc-200" data-i18n="themeSolarized">🔵 Solarized 太陽黑</option>
            <option value="win95" class="bg-obsidian-900 text-zinc-200" data-i18n="themeWin95">🪟 Win 95 經典</option>
          </select>
          <button onclick="cycleTheme()" title="切換下一個主題 (按鍵盤 T)" class="px-2 py-1 text-zinc-400 hover:text-ansi-green hover:bg-obsidian-850 rounded-r border-l border-obsidian-750 font-mono text-[11px] font-bold">
            [T]
          </button>
        </div>

        <!-- Language Selector Button (zh-TW default & en toggle) -->
        <button onclick="toggleLanguage()" id="lang-toggle-btn" class="px-2.5 py-1 bg-obsidian-950 hover:bg-obsidian-850 text-zinc-300 border border-obsidian-750 rounded text-xs transition flex items-center gap-1 font-semibold">
          <span>🌐</span>
          <span id="lang-current-label">正體中文</span>
        </button>

        <!-- Senior-Friendly Font Magnification Control Group -->
        <div class="flex items-center bg-obsidian-950 border border-obsidian-750 rounded p-0.5 text-xs">
          <button onclick="changeFontSize(-1)" title="字體縮小 (按鍵盤 -)" class="px-2 py-1 text-zinc-400 hover:text-white hover:bg-obsidian-850 rounded transition font-bold">
            A-
          </button>
          <button onclick="resetFontSize()" id="font-scale-indicator" title="點擊重設為 100% (按鍵盤 0)" class="px-2 py-1 text-ansi-green font-mono font-bold hover:bg-obsidian-850 rounded transition text-[11px]">
            100%
          </button>
          <button onclick="changeFontSize(1)" title="字體放大 (按鍵盤 +)" class="px-2 py-1 text-zinc-400 hover:text-ansi-green hover:bg-obsidian-850 rounded transition font-bold">
            A+
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- Main Terminal Workspace -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6">

    <!-- ============================================== -->
    <!-- VIEW 1: SINGLE CHECK (agy check) -->
    <!-- ============================================== -->
    <div id="view-front" class="${viewFrontCls}">
      
      <!-- Terminal Header Banner -->
      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-4 sm:p-5 text-xs text-zinc-400 space-y-2">
        <div class="flex flex-wrap items-center justify-between border-b border-obsidian-800 pb-2 gap-2">
          <div class="flex items-center gap-2">
            <span class="text-ansi-green font-bold">●</span>
            <span class="font-bold text-zinc-200 uppercase tracking-widest text-xs" data-i18n="bannerTag">PHP2Shell 資安弱點檢測</span>
            <span class="text-zinc-500 text-[11px]">:: CVE-2026-109618 / 109619</span>
          </div>
          <div class="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
            <span data-i18n="edgeStatus">邊緣節點: 正常連線</span>
            <span class="text-zinc-700">|</span>
            <span class="text-zinc-400" data-i18n="fontA11yHint">支援按鍵盤 [+] [-] 放大字體</span>
          </div>
        </div>
        <p class="text-zinc-300 leading-relaxed text-xs" data-i18n="bannerDesc">
          透過 Cloudflare 全球邊緣節點發起檢驗，分析網站公開的 HTTP 回應標頭（Server 與 X-Powered-By），精確評估是否暴露受 CVE-2026-109618 及 CVE-2026-109619 影響的 PHP 版本。官方修復基準版號為：8.2.35、8.3.36、8.4.27 與 8.5.12。
        </p>
      </div>

      <!-- Command Prompt Input Box -->
      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-3 sm:p-5 tui-glow space-y-3">
        <form id="single-scan-form" onsubmit="handleSingleScan(event)" class="space-y-3">
          <div class="flex items-center text-xs text-zinc-400">
            <span class="text-ansi-green font-bold mr-2 text-sm">❯</span>
            <span class="text-zinc-300 font-semibold mr-2">agy check</span>
            <span class="text-zinc-500" data-i18n="promptUrl">--網址</span>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch gap-2">
            <input type="text" id="target-url" placeholder="https://example.com 或直接輸入網址" required oninput="validateTargetUrlInput()"
              class="flex-1 bg-obsidian-950 border border-obsidian-700 rounded p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-ansi-green focus:ring-1 focus:ring-ansi-green font-mono">
            <button type="submit" id="btn-submit-scan"
              class="px-5 py-3 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 rounded text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap">
              <span id="scan-spinner" class="hidden">...</span>
              <span data-i18n="btnRunCheck">[開始檢測]</span>
            </button>
          </div>
          <!-- Inline Validation Error Message -->
          <div id="target-url-error" class="hidden text-xs text-ansi-red font-mono flex items-center gap-1.5 pt-1">
            <span>🛑</span>
            <span id="target-url-error-msg"></span>
          </div>

          <!-- Quick Args Chips -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span class="text-zinc-500 font-semibold" data-i18n="quickExamples">快速示範：</span>
            <button type="button" onclick="fillUrl('php.net')" class="px-2.5 py-1 rounded bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750">php.net</button>
            <button type="button" onclick="fillUrl('wordpress.org')" class="px-2.5 py-1 rounded bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750">wordpress.org</button>
            <button type="button" onclick="fillUrl('wikipedia.org')" class="px-2.5 py-1 rounded bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750">wikipedia.org</button>
            <span class="text-zinc-500 ml-auto hidden sm:inline text-xs" data-i18n="keyFocusHint">按鍵盤 [/] 快速聚焦輸入框</span>
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
    <div id="view-batch" class="${viewBatchCls}">
      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-4 text-xs space-y-1">
        <div class="flex items-center gap-2 text-zinc-200 font-bold">
          <span class="text-ansi-cyan">⚡</span>
          <span data-i18n="batchTitle">批次多網站檢測 (並發佇列)</span>
        </div>
        <p class="text-zinc-400 text-xs" data-i18n="batchDesc">每行輸入一個網址或網域名稱（單次上限 20 個），由 Cloudflare 邊緣節點並發發起檢驗。</p>
      </div>

      <div class="bg-obsidian-900 border border-obsidian-800 rounded-lg p-4 space-y-3">
        <div class="text-xs text-zinc-400 flex items-center justify-between">
          <span><span class="text-ansi-green font-bold">❯</span> agy batch --stdin</span>
          <span id="batch-count" class="text-zinc-400 text-xs font-semibold">${isBatch ? '4 個目標排入隊列' : '0 個目標排入隊列'}</span>
        </div>
        <textarea id="batch-urls" rows="6" placeholder="https://domain-alpha.com&#10;https://domain-bravo.org&#10;https://example.net"
          class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-ansi-cyan font-mono leading-relaxed">${isBatch ? 'https://legacy-crm.internal.corp&#10;https://portal.marketing.org&#10;https://api.gateway.net&#10;https://dev-stage.service.io' : ''}</textarea>
        
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-zinc-500" data-i18n="ssrfNotice">SSRF 安全過濾機制已全域啟動（嚴禁掃描內網私有 IP）</span>
          <button onclick="handleBatchScan()" id="btn-batch-scan"
            class="px-5 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-cyan border border-obsidian-700 rounded text-xs sm:text-sm font-bold transition">
            <span data-i18n="btnRunBatch">[執行批次掃描]</span>
          </button>
        </div>
      </div>

      <!-- Batch Result Table -->
      <div id="batch-results-container" class="${isBatch ? 'space-y-3' : 'hidden space-y-3'}">
        <div class="flex items-center justify-between border-b border-obsidian-800 pb-2 text-xs">
          <span class="text-zinc-200 font-bold uppercase" data-i18n="batchResultStream">批次檢測結果清單</span>
          <div id="batch-summary-chips" class="text-xs space-x-2">
            ${isBatch ? `
              <span class="text-ansi-red font-bold">[受威脅: 1]</span>
              <span class="text-ansi-green font-bold">[安全: 2]</span>
              <span class="text-ansi-amber font-bold">[未知: 1]</span>
            ` : ''}
          </div>
        </div>

        <div class="border border-obsidian-800 rounded bg-obsidian-900 overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-obsidian-850 text-zinc-300 border-b border-obsidian-800 uppercase font-bold text-xs">
              <tr>
                <th class="p-3" data-i18n="thTarget">目標網址</th>
                <th class="p-3" data-i18n="thStatus">判定狀態</th>
                <th class="p-3" data-i18n="thVersion">PHP 版本</th>
                <th class="p-3" data-i18n="thExit">狀態碼</th>
                <th class="p-3" data-i18n="thDiag">診斷說明</th>
              </tr>
            </thead>
            <tbody id="batch-table-body" class="divide-y divide-obsidian-800 text-xs">
              ${isBatch ? `
                <tr class="hover:bg-obsidian-850">
                  <td class="p-2.5 text-white truncate max-w-xs font-mono">https://legacy-crm.internal.corp</td>
                  <td class="p-2.5"><span class="text-ansi-red font-bold">[VULN]</span></td>
                  <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.2.14</td>
                  <td class="p-2.5 text-zinc-400">1</td>
                  <td class="p-2.5 text-zinc-300 truncate max-w-sm">檢測到受影響的 PHP 8.2.14 版本（存在 RCE 漏洞風險，建議立即升級至 8.2.35+）</td>
                </tr>
                <tr class="hover:bg-obsidian-850">
                  <td class="p-2.5 text-white truncate max-w-xs font-mono">https://portal.marketing.org</td>
                  <td class="p-2.5"><span class="text-ansi-green font-bold">[OK]</span></td>
                  <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.3.36</td>
                  <td class="p-2.5 text-zinc-400">0</td>
                  <td class="p-2.5 text-zinc-300 truncate max-w-sm">檢測到已修復之 PHP 8.3.36 版本（符合安全基準）</td>
                </tr>
                <tr class="hover:bg-obsidian-850">
                  <td class="p-2.5 text-white truncate max-w-xs font-mono">https://api.gateway.net</td>
                  <td class="p-2.5"><span class="text-ansi-green font-bold">[OK]</span></td>
                  <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.4.27</td>
                  <td class="p-2.5 text-zinc-400">0</td>
                  <td class="p-2.5 text-zinc-300 truncate max-w-sm">檢測到已修復之 PHP 8.4.27 版本（符合安全基準）</td>
                </tr>
                <tr class="hover:bg-obsidian-850">
                  <td class="p-2.5 text-white truncate max-w-xs font-mono">https://dev-stage.service.io</td>
                  <td class="p-2.5"><span class="text-ansi-amber font-bold">[UNKNOWN]</span></td>
                  <td class="p-2.5 text-zinc-500 font-mono">-</td>
                  <td class="p-2.5 text-zinc-400">3</td>
                  <td class="p-2.5 text-zinc-300 truncate max-w-sm">伺服器未於 HTTP 標頭公開 PHP 版本資訊</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- VIEW 3: ADMIN DASHBOARD (agy admin) -->
    <!-- ============================================== -->
    <div id="view-admin" class="${viewAdminCls}">
      
      <!-- Login Prompt (If not authed) -->
      <div id="admin-login-box" class="${isAdmin ? 'hidden max-w-md mx-auto bg-obsidian-900 border border-obsidian-800 rounded-lg p-6 space-y-4' : 'max-w-md mx-auto bg-obsidian-900 border border-obsidian-800 rounded-lg p-6 space-y-4'}">
        <div class="border-b border-obsidian-800 pb-3">
          <div class="text-sm text-ansi-amber font-bold flex items-center gap-1.5">
            <span>🔒</span>
            <span data-i18n="adminAuthTitle">管理員身分認證</span>
          </div>
          <div class="text-xs text-zinc-500 mt-1 font-mono">user@edge:~$ agy auth --login</div>
        </div>

        <form onsubmit="handleAdminLogin(event)" class="space-y-3 text-xs sm:text-sm">
          <div>
            <label class="block text-zinc-400 mb-1 font-semibold" data-i18n="lblUsername">管理員帳號 (預設 admin)</label>
            <input type="text" id="admin-user-input" value="admin" required
              class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-ansi-green">
          </div>
          <div>
            <label class="block text-zinc-400 mb-1 font-semibold" data-i18n="lblPassword">管理員密碼</label>
            <input type="password" id="admin-pass-input" placeholder="請輸入密碼" required
              class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-ansi-green">
          </div>
          <p id="admin-login-error" class="text-ansi-red text-xs hidden font-bold"></p>
          <button type="submit" class="w-full py-2.5 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 rounded font-bold transition">
            <span data-i18n="btnLogin">[登入管理主控台]</span>
          </button>
        </form>
      </div>

      <!-- Admin Management Console (If authed) -->
      <div id="admin-panel" class="${isAdmin ? 'space-y-6' : 'hidden space-y-6'}">
        
        <!-- Header & Telemetry Block -->
        <div class="border border-obsidian-800 rounded-lg bg-obsidian-900 p-4 space-y-3">
          <div class="flex items-center justify-between border-b border-obsidian-800 pb-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-ansi-green font-bold">●</span>
              <span class="text-white font-bold tracking-wider uppercase text-xs" data-i18n="telemetryTitle">資安審計與排程控制台</span>
              <span class="text-zinc-500 text-[11px]">[D1: 已連線]</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="loadAdminData()" class="px-2.5 py-1 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-200 border border-obsidian-750 text-xs rounded font-semibold">
                <span data-i18n="btnRefresh">[重新整理]</span>
              </button>
              <button onclick="handleAdminLogout()" class="px-2.5 py-1 bg-obsidian-850 hover:bg-rose-950 text-ansi-red border border-rose-900/50 text-xs rounded font-semibold">
                <span data-i18n="btnLogout">[登出]</span>
              </button>
            </div>
          </div>

          <!-- Telemetry Metric Strip -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-3">
              <div class="text-xs text-zinc-500 uppercase font-semibold" data-i18n="statTotal">總檢測次數</div>
              <div id="stat-total" class="text-xl font-bold text-zinc-100 font-mono mt-0.5">${isAdmin ? '1,428' : '0'}</div>
            </div>
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-3">
              <div class="text-xs text-ansi-red uppercase font-semibold" data-i18n="statVuln">受威脅站點</div>
              <div id="stat-vuln" class="text-xl font-bold text-ansi-red font-mono mt-0.5">${isAdmin ? '42' : '0'}</div>
            </div>
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-3">
              <div class="text-xs text-ansi-green uppercase font-semibold" data-i18n="statSafe">已修復安全</div>
              <div id="stat-safe" class="text-xl font-bold text-ansi-green font-mono mt-0.5">${isAdmin ? '896' : '0'}</div>
            </div>
            <div class="bg-obsidian-950 border border-obsidian-800 rounded p-3">
              <div class="text-xs text-ansi-cyan uppercase font-semibold" data-i18n="statMonitored">定時巡檢站點</div>
              <div id="stat-monitored" class="text-xl font-bold text-ansi-cyan font-mono mt-0.5">${isAdmin ? '16' : '0'}</div>
            </div>
          </div>
        </div>

        <!-- Subcommands Navigation -->
        <div class="flex border-b border-obsidian-800 text-xs sm:text-sm space-x-3">
          <button id="admin-subtab-scans-btn" onclick="switchAdminSubTab('scans')" class="pb-2 border-b-2 border-ansi-green text-ansi-green font-bold">
            <span data-i18n="subtabScans">[1] 歷史檢測日誌</span>
          </button>
          <button id="admin-subtab-monitors-btn" onclick="switchAdminSubTab('monitors')" class="pb-2 border-b-2 border-transparent text-zinc-400 hover:text-zinc-200">
            <span data-i18n="subtabMonitors">[2] 定時巡檢排程</span>
          </button>
          <button id="admin-subtab-settings-btn" onclick="switchAdminSubTab('settings')" class="pb-2 border-b-2 border-transparent text-zinc-400 hover:text-zinc-200">
            <span data-i18n="subtabAlerts">[3] 告警通知設定</span>
          </button>
        </div>

        <!-- SUBTAB 1: Scans History -->
        <div id="admin-subtab-scans" class="space-y-3">
          <div class="flex items-center justify-between gap-3 text-xs">
            <input type="text" id="admin-search-scan" oninput="filterAdminScans()" placeholder="搜尋網址、狀態或版號 (grep)..."
              class="w-full max-w-sm bg-obsidian-950 border border-obsidian-750 rounded px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-ansi-green">
            <button onclick="clearScanLogs()" class="px-3 py-2 bg-obsidian-900 hover:bg-rose-950 text-ansi-red border border-obsidian-700 text-xs rounded transition whitespace-nowrap font-bold">
              <span data-i18n="btnTruncateLogs">[清空所有日誌]</span>
            </button>
          </div>

          <div class="border border-obsidian-800 rounded bg-obsidian-900 overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-obsidian-850 text-zinc-300 border-b border-obsidian-800 uppercase font-bold text-xs">
                <tr>
                  <th class="p-3" data-i18n="thTime">時間 (UTC)</th>
                  <th class="p-3" data-i18n="thTarget">目標網址</th>
                  <th class="p-3" data-i18n="thStatus">狀態</th>
                  <th class="p-3" data-i18n="thVersion">版本</th>
                  <th class="p-3" data-i18n="thDiag">原因說明</th>
                  <th class="p-3" data-i18n="thAction">操作</th>
                </tr>
              </thead>
              <tbody id="admin-scans-tbody" class="divide-y divide-obsidian-800 text-xs">
                ${isAdmin ? `
                  <tr class="hover:bg-obsidian-850">
                    <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:15:22</td>
                    <td class="p-2.5 text-white font-mono">https://legacy-crm.internal.corp</td>
                    <td class="p-2.5"><span class="text-ansi-red font-bold">[VULN]</span></td>
                    <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.2.14</td>
                    <td class="p-2.5 text-zinc-300 truncate max-w-sm">檢測到受影響版本，建議立即升級至 8.2.35</td>
                    <td class="p-2.5"><button class="text-ansi-green hover:underline">[詳情]</button></td>
                  </tr>
                  <tr class="hover:bg-obsidian-850">
                    <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:14:05</td>
                    <td class="p-2.5 text-white font-mono">https://portal.marketing.org</td>
                    <td class="p-2.5"><span class="text-ansi-green font-bold">[OK]</span></td>
                    <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.3.36</td>
                    <td class="p-2.5 text-zinc-300 truncate max-w-sm">版本已修復至安全基準</td>
                    <td class="p-2.5"><button class="text-ansi-green hover:underline">[詳情]</button></td>
                  </tr>
                  <tr class="hover:bg-obsidian-850">
                    <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:10:19</td>
                    <td class="p-2.5 text-white font-mono">https://api.gateway.net</td>
                    <td class="p-2.5"><span class="text-ansi-green font-bold">[OK]</span></td>
                    <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.4.27</td>
                    <td class="p-2.5 text-zinc-300 truncate max-w-sm">版本已修復至安全基準</td>
                    <td class="p-2.5"><button class="text-ansi-green hover:underline">[詳情]</button></td>
                  </tr>
                  <tr class="hover:bg-obsidian-850">
                    <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:05:41</td>
                    <td class="p-2.5 text-white font-mono">https://dev-stage.service.io</td>
                    <td class="p-2.5"><span class="text-ansi-amber font-bold">[UNKNOWN]</span></td>
                    <td class="p-2.5 text-zinc-500 font-mono">-</td>
                    <td class="p-2.5 text-zinc-300 truncate max-w-sm">未於 HTTP 回應標頭暴露版本</td>
                    <td class="p-2.5"><button class="text-ansi-green hover:underline">[詳情]</button></td>
                  </tr>
                ` : `<tr><td colspan="6" class="p-4 text-center text-zinc-500">載入審計日誌中...</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 2: Monitored Targets -->
        <div id="admin-subtab-monitors" class="hidden space-y-4">
          <div class="bg-obsidian-900 border border-obsidian-800 rounded p-4 text-xs flex flex-col sm:flex-row gap-3 items-end">
            <div class="flex-1 w-full">
              <label class="block text-zinc-400 mb-1 font-semibold" data-i18n="lblTargetUrl">目標網址 (URL)</label>
              <input type="text" id="new-monitor-url" placeholder="https://internal-app.domain.com" class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2.5 text-xs text-white">
            </div>
            <div class="w-full sm:w-48">
              <label class="block text-zinc-400 mb-1 font-semibold" data-i18n="lblTargetLabel">站台名稱 / 標籤</label>
              <input type="text" id="new-monitor-label" placeholder="核心業務站點" class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2.5 text-xs text-white">
            </div>
            <button onclick="addMonitoredTarget()" class="w-full sm:w-auto px-4 py-2.5 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 text-xs font-bold rounded">
              <span data-i18n="btnAddTarget">[新增巡檢目標]</span>
            </button>
          </div>

          <div class="border border-obsidian-800 rounded bg-obsidian-900 overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-obsidian-850 text-zinc-300 border-b border-obsidian-800 uppercase font-bold text-xs">
                <tr>
                  <th class="p-3" data-i18n="thLabel">標籤</th>
                  <th class="p-3" data-i18n="thTarget">網址</th>
                  <th class="p-3" data-i18n="thLastStatus">最後狀態</th>
                  <th class="p-3" data-i18n="thVersion">版本</th>
                  <th class="p-3" data-i18n="thLastChecked">上次巡檢</th>
                  <th class="p-3" data-i18n="thAction">操作</th>
                </tr>
              </thead>
              <tbody id="admin-monitors-tbody" class="divide-y divide-obsidian-800 text-xs">
                <tr><td colspan="6" class="p-4 text-center text-zinc-500">尚未登記巡檢目標</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 3: Alert Settings -->
        <div id="admin-subtab-settings" class="hidden space-y-4 max-w-xl">
          <div class="bg-obsidian-900 border border-obsidian-800 rounded p-4 space-y-3 text-xs">
            <div class="border-b border-obsidian-800 pb-2">
              <span class="text-zinc-200 font-bold uppercase text-xs" data-i18n="webhookTitle">WEBHOOK 異常告警通道</span>
              <p class="text-zinc-400 text-xs mt-0.5" data-i18n="webhookDesc">當 Cloudflare 定時巡檢發現弱點版本時，自動推播告警至 Discord 或 Slack。</p>
            </div>
            <div>
              <label class="block text-zinc-400 mb-1 font-semibold" data-i18n="lblWebhookUrl">WEBHOOK 網址 (DISCORD / SLACK / SIEM)</label>
              <input type="url" id="setting-webhook-url" placeholder="https://discord.com/api/webhooks/..."
                class="w-full bg-obsidian-950 border border-obsidian-700 rounded p-2.5 text-xs text-white font-mono">
            </div>
            <div class="flex items-center space-x-2 pt-1">
              <input type="checkbox" id="setting-webhook-enabled" class="rounded bg-obsidian-950 border-obsidian-700 text-ansi-green focus:ring-0">
              <label for="setting-webhook-enabled" class="text-zinc-300 text-xs font-semibold" data-i18n="lblEnableWebhook">啟用定時巡檢異常告警</label>
            </div>
            <div class="pt-2 flex items-center gap-2">
              <button onclick="saveAdminSettings()" class="px-4 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-ansi-green border border-obsidian-700 text-xs font-bold rounded">
                <span data-i18n="btnSaveConfig">[儲存設定]</span>
              </button>
              <button onclick="testWebhook()" class="px-4 py-2 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 border border-obsidian-750 text-xs rounded font-semibold">
                <span data-i18n="btnTestDispatch">[發送測試告警]</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main>

  <!-- Terminal Status Footer Bar -->
  <footer class="border-t border-obsidian-800 bg-obsidian-950 py-4 text-xs text-zinc-500">
    <div class="max-w-7xl mx-auto px-4 space-y-2.5">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-ansi-green font-bold">❯_</span>
          <span class="text-zinc-300 font-semibold">agy-cli style</span>
          <span>::</span>
          <a href="https://github.com/tw365-org/php2shell-checker-cf" target="_blank" class="text-zinc-400 hover:text-ansi-green underline">tw365-org/php2shell-checker-cf</a>
          <span>::</span>
          <a href="https://github.com/openai/php2shell-checker" target="_blank" class="hover:text-zinc-300">upstream: openai/php2shell-checker</a>
        </div>
        <!-- Wiz Citation Link -->
        <div>
          <span>AI-SDLC Security: <a href="https://www.wiz.io/academy/application-security/ai-code-security" target="_blank" class="text-zinc-400 hover:text-ansi-green underline">Wiz Academy (AI Code Security)</a></span>
          <span>::</span>
          <span>RUNTIME: Cloudflare Workers + D1 Database</span>
        </div>
      </div>

      <!-- Acceptable Use & Anti-Abuse Disclaimer -->
      <div class="pt-2 border-t border-obsidian-900 text-[11px] sm:text-xs text-rose-400/90 leading-relaxed text-center sm:text-left flex items-start gap-1.5">
        <span class="text-ansi-red font-bold shrink-0">🛑</span>
        <span data-i18n="acceptableUsePolicy">
          【合法授權與防濫用宣告】本專案為防禦性資安檢測工具，僅限授權自用（檢測自身擁有或取得明確授權許可之伺服器）。嚴禁將本工具用於未經授權之主機探測、惡意攻擊或非法網路活動；使用者須完全自行承擔一切法律責任。
        </span>
      </div>

      <!-- Explicit Tribute & Responsibility Statement conforming to antigravity.google/press guidelines -->
      <div class="pt-1.5 text-[11px] sm:text-xs text-zinc-400/90 leading-relaxed text-center sm:text-left flex items-start gap-1.5">
        <span class="text-ansi-amber font-bold shrink-0">⚖️</span>
        <span data-i18n="tributeStatement">
          【獨立專案與商標規範聲明】本系統為獨立社群開源專案，介面設計由衷致敬 Google Antigravity CLI (agy) 之終端極簡風格與操作體驗；本專案非 Google 官方產品，亦未受 Google LLC 贊助、認可或背書。Google 與 Antigravity 均為 Google LLC 之註冊商標。本專案之開源代碼維護、雲端部署與衍生營運責任均由作者與維護團隊（tw365-org）全權承擔與負責。
        </span>
      </div>

      <!-- Wiz Framework Attribution Statement -->
      <div class="pt-1.5 text-[11px] sm:text-xs text-zinc-500 leading-relaxed text-center sm:text-left flex items-start gap-1.5">
        <span class="text-ansi-cyan font-bold shrink-0">📘</span>
        <span data-i18n="wizAttribution">
          【安全架構引用與出處】本專案之 AI-SDLC 分層防禦、即用型修復引導與邊緣資料隱私架構，深入參考並遵循 Wiz 發表之權威指南《Security for AI-Driven Development》（出處：Wiz Academy: https://www.wiz.io/academy/application-security/ai-code-security）。特此致謝並標註出處。
        </span>
      </div>

      <!-- Anti-Claude Style Satirical Manifesto -->
      <div class="pt-1.5 text-[11px] sm:text-xs text-zinc-600 leading-relaxed text-center sm:text-left flex items-start gap-1.5">
        <span class="text-zinc-500 font-bold shrink-0">☕</span>
        <span data-i18n="antiClaudeStatement">
          【美學堅持：嚴正拒絕 Claude 溫暖米黃拿鐵風】本頁面百分之百拒絕暖橘色、日落陶土、溫暖米黃與故作高雅的文青圓角（亦即俗稱的「Claude 咖啡廳閒聊風」）。這裡是硬核工程師終端，只有黑曜石底色、ANSI 退出碼與冷硬真實的資安診斷，不賣拿鐵也不陪聊。（註：「Claude」為 Anthropic PBC 之商標，此處僅作為對常見 AI 介面氾濫套路之幽默風格評論，與 Anthropic 無任何關聯）。
        </span>
      </div>
    </div>
  </footer>

  <!-- Client Script for Terminal UX, i18n & Font Scaling Engine -->
  <script>
    // ----------------------------------------------------
    // Multilingual Dictionary (Default: zh-TW 正體中文)
    // ----------------------------------------------------
    const I18N = {
      zh: {
        navCheck: '[1] 網址檢測',
        navBatch: '[2] 批次掃描',
        navAdmin: '[3] 後台管理',
        langName: '正體中文',
        bannerTag: 'PHP2Shell 資安弱點檢測',
        edgeStatus: '邊緣節點: 正常連線',
        fontA11yHint: '支援按鍵盤 [+] [-] 放大字體',
        bannerDesc: '透過 Cloudflare 全球邊緣節點發起檢驗，分析網站公開的 HTTP 回應標頭（Server 與 X-Powered-By），精確評估是否暴露受 CVE-2026-109618 及 CVE-2026-109619 影響的 PHP 版本。官方修復基準版號為：8.2.35、8.3.36、8.4.27 與 8.5.12。',
        promptUrl: '--網址',
        urlPlaceholder: 'https://example.com 或直接輸入網址',
        btnRunCheck: '[開始檢測]',
        quickExamples: '快速示範：',
        keyFocusHint: '按鍵盤 [/] 快速聚焦輸入框',
        batchTitle: '批次多網站檢測 (並發佇列)',
        batchDesc: '每行輸入一個網址或網域名稱（單次上限 20 個），由 Cloudflare 邊緣節點並發發起檢驗。',
        batchPlaceholder: 'https://domain-alpha.com\\nhttps://domain-bravo.org\\nhttps://example.net',
        ssrfNotice: 'SSRF 安全過濾機制已全域啟動（嚴禁掃描內網私有 IP）',
        btnRunBatch: '[執行批次掃描]',
        batchResultStream: '批次檢測結果清單',
        thTarget: '目標網址',
        thStatus: '判定狀態',
        thVersion: 'PHP 版本',
        thExit: '狀態碼',
        thDiag: '診斷說明',
        thTime: '時間 (UTC)',
        thAction: '操作',
        thLabel: '標籤',
        thLastStatus: '最後狀態',
        thLastChecked: '上次巡檢',
        adminAuthTitle: '管理員身分認證',
        lblUsername: '管理員帳號 (預設 admin)',
        lblPassword: '管理員密碼',
        btnLogin: '[登入管理主控台]',
        telemetryTitle: '資安審計與排程控制台',
        btnRefresh: '[重新整理]',
        btnLogout: '[登出]',
        statTotal: '總檢測次數',
        statVuln: '受威脅站點',
        statSafe: '已修復安全',
        statMonitored: '定時巡檢站點',
        subtabScans: '[1] 歷史檢測日誌',
        subtabMonitors: '[2] 定時巡檢排程',
        subtabAlerts: '[3] 告警通知設定',
        searchPlaceholder: '搜尋網址、狀態或版號 (grep)...',
        btnTruncateLogs: '[清空所有日誌]',
        lblTargetUrl: '目標網址 (URL)',
        lblTargetLabel: '站台名稱 / 標籤',
        btnAddTarget: '[新增巡檢目標]',
        webhookTitle: 'WEBHOOK 異常告警通道',
        webhookDesc: '當 Cloudflare 定時巡檢發現弱點版本時，自動推播告警至 Discord 或 Slack。',
        lblWebhookUrl: 'WEBHOOK 網址 (DISCORD / SLACK / SIEM)',
        lblEnableWebhook: '啟用定時巡檢異常告警',
        btnSaveConfig: '[儲存設定]',
        btnTestDispatch: '[發送測試告警]',
        statusOk: '[安全: 0] 達到官方安全版本',
        statusVulnTag: '[受威脅: 1] 潛在暴露弱點',
        statusUnknownTag: '[未知: 3] 未知或無標頭',
        statusInvalidTag: '⚠️ [格式錯誤: 2] 無效網址',
        themeObsidian: '⬛ 黑曜石 agy',
        themeVt100: '🟢 VT100 綠螢幕',
        themeAmber: '🟡 復古琥珀 CRT',
        themeDracula: '🟣 Dracula 吸血鬼',
        themeSolarized: '🔵 Solarized 太陽黑',
        themeWin95: '🪟 Win 95 經典',
        targetLabel: '檢測目標網址',
        detectedPhpLabel: '偵測到的 PHP 版本',
        exitCodeLabel: '退出狀態碼',
        cveCoverageLabel: 'CVE 覆蓋範圍',
        diagReasonLabel: '分析結果詳細說明',
        headersAccordionLabel: '[+] 展開檢視原始回應標頭 (HTTP Headers)',
        copyCliLabel: '[複製 CLI 指令]',
        copyReportLabel: '[複製獨立報告短鏈]',
        notAdvertised: '未公開或無標頭',
        remediationTitle: '即用型修復命令建議 (Wiz AI-SDLC Remediation)',
        acceptableUsePolicy: '【合法授權與防濫用宣告】本專案為防禦性資安檢測工具，僅限授權自用（檢測自身擁有或取得明確授權許可之伺服器）。嚴禁將本工具用於未經授權之主機探測、惡意攻擊或非法網路活動；使用者須完全自行承擔一切法律責任。',
        tributeStatement: '【獨立專案與商標規範聲明】本系統為獨立社群開源專案，介面設計由衷致敬 Google Antigravity CLI (agy) 之終端極簡風格與操作體驗；本專案非 Google 官方產品，亦未受 Google LLC 贊助、認可或背書。Google 與 Antigravity 均為 Google LLC 之註冊商標。本專案之開源代碼維護、雲端部署與衍生營運責任均由作者與維護團隊（tw365-org）全權承擔與負責。',
        wizAttribution: '【安全架構引用與出處】本專案之 AI-SDLC 分層防禦、即用型修復引導與邊緣資料隱私架構，深入參考並遵循 Wiz 發表之權威指南《Security for AI-Driven Development》（出處：Wiz Academy: https://www.wiz.io/academy/application-security/ai-code-security）。特此致謝並標註出處。',
        antiClaudeStatement: '【美學堅持：嚴正拒絕 Claude 溫暖米黃拿鐵風】本頁面百分之百拒絕暖橘色、日落陶土、溫暖米黃與故作高雅的文青圓角（亦即俗稱的「Claude 咖啡廳閒聊風」）。這裡是硬核工程師終端，只有黑曜石底色、ANSI 退出碼與冷硬真實的資安診斷，不賣拿鐵也不陪聊。（註：「Claude」為 Anthropic PBC 之商標，此處僅作為對常見 AI 介面氾濫套路之幽默風格評論，與 Anthropic 無任何關聯）。',
      },
      en: {
        navCheck: '[1] agy check',
        navBatch: '[2] agy batch',
        navAdmin: '[3] agy admin',
        langName: 'English',
        bannerTag: 'SECURITY ADVISORY CHECKER',
        edgeStatus: 'EDGE: ONLINE',
        fontA11yHint: 'Press [+] [-] to adjust font size',
        bannerDesc: 'Detects potential PHP2Shell vulnerability exposure by analyzing remote HTTP headers (Server, X-Powered-By) from Cloudflare edge locations worldwide. Upstream fixes: 8.2.35, 8.3.36, 8.4.27, 8.5.12.',
        promptUrl: '--url',
        urlPlaceholder: 'https://example.com or domain',
        btnRunCheck: '[RUN DIAGNOSTIC]',
        quickExamples: 'Targets:',
        keyFocusHint: 'Press [/] to focus prompt',
        batchTitle: 'BATCH TARGET INSPECTOR',
        batchDesc: 'Input up to 20 domains/URLs line by line. Executes concurrent edge HTTP probes.',
        batchPlaceholder: 'https://domain-alpha.com\\nhttps://domain-bravo.org\\nhttps://example.net',
        ssrfNotice: 'SSRF security filtering enforced on all targets',
        btnRunBatch: '[EXECUTE BATCH]',
        batchResultStream: 'EXECUTION RESULT STREAM',
        thTarget: 'TARGET',
        thStatus: 'STATUS',
        thVersion: 'PHP_VER',
        thExit: 'EXIT',
        thDiag: 'DIAGNOSTIC',
        thTime: 'TIMESTAMP (UTC)',
        thAction: 'ACTION',
        thLabel: 'LABEL',
        thLastStatus: 'LAST_STATUS',
        thLastChecked: 'LAST_CHECKED',
        adminAuthTitle: 'AUTHENTICATION REQUIRED',
        lblUsername: 'USERNAME',
        lblPassword: 'PASSWORD / TOKEN',
        btnLogin: '[AUTHENTICATE]',
        telemetryTitle: 'TELEMETRY & AUDIT CONSOLE',
        btnRefresh: '[REFRESH]',
        btnLogout: '[LOGOUT]',
        statTotal: 'TOTAL_SCANS',
        statVuln: 'VULNERABLE_DETECTED',
        statSafe: 'SAFE_PATCHED',
        statMonitored: 'CRON_MONITORS',
        subtabScans: '[1] agy scans --history',
        subtabMonitors: '[2] agy monitors --daemon',
        subtabAlerts: '[3] agy alert --webhook',
        searchPlaceholder: 'grep URL / STATUS / PHP_VER...',
        btnTruncateLogs: '[TRUNCATE LOGS]',
        lblTargetUrl: 'TARGET URL',
        lblTargetLabel: 'LABEL',
        btnAddTarget: '[ADD TARGET]',
        webhookTitle: 'WEBHOOK NOTIFICATION PIPELINE',
        webhookDesc: 'Dispatches alert payload when scheduled cron probe detects vulnerable PHP version.',
        lblWebhookUrl: 'WEBHOOK ENDPOINT (DISCORD / SLACK / SIEM)',
        lblEnableWebhook: 'Enable Cron Trigger Alerts',
        btnSaveConfig: '[SAVE CONFIG]',
        btnTestDispatch: '[TEST DISPATCH]',
        statusOk: '[OK: 0] UPSTREAM_FIXED',
        statusVulnTag: '[VULN: 1] POTENTIALLY_EXPOSED',
        statusUnknownTag: '[UNKNOWN: 3] NOT_ADVERTISED',
        statusInvalidTag: '⚠️ [INVALID: 2] MALFORMED_URL',
        themeObsidian: '⬛ Obsidian agy',
        themeVt100: '🟢 VT100 Phosphor',
        themeAmber: '🟡 Amber CRT',
        themeDracula: '🟣 Dracula Purple',
        themeSolarized: '🔵 Solarized Dark',
        themeWin95: '🪟 Classic Win95',
        targetLabel: 'DIAGNOSTIC TARGET',
        detectedPhpLabel: 'DETECTED PHP',
        exitCodeLabel: 'EXIT CODE',
        cveCoverageLabel: 'CVE REFERENCES',
        diagReasonLabel: 'DIAGNOSTIC REASON',
        headersAccordionLabel: '[+] SHOW RAW RESPONSE HEADERS',
        copyCliLabel: '[COPY CLI CMD]',
        copyReportLabel: '[COPY SHAREABLE LINK]',
        notAdvertised: 'NOT ADVERTISED',
        remediationTitle: 'ACTIONABLE REMEDIATION (Wiz AI-SDLC)',
        acceptableUsePolicy: '[Acceptable Use & Anti-Abuse Policy] This tool is strictly designed for authorized defensive security audits on systems you own or have explicit written permission to test. Unauthorized scanning, malicious reconnaissance, or disruptive exploitation are strictly prohibited. The runner assumes full legal responsibility.',
        tributeStatement: '[Independent Project & Trademark Disclaimer] This is an independent open-source community project. Its interface pays tribute to the terminal minimalism and developer UX of Google Antigravity CLI (agy). This project is not an official product and is not affiliated with, sponsored by, or endorsed by Google LLC. Google and Antigravity are trademarks of Google LLC. All code maintenance, Cloudflare edge deployment, and operational responsibilities are solely undertaken and answered for by the author & maintainers (tw365-org).',
        wizAttribution: '[Security Architecture Attribution] The layered defense, remediation-first design, and zero-data-exposure architecture of this project reference and adhere to the Wiz framework "Security for AI-Driven Development" (Source: Wiz Academy - https://www.wiz.io/academy/application-security/ai-code-security). We gratefully acknowledge and credit Wiz.',
        antiClaudeStatement: '[Aesthetic Manifesto: Zero Warm-Beige Fluff] This interface strictly repudiates warm beige backgrounds, sunset terracotta tones, and cozy chatbot tropes (aka the "Claude café aesthetic"). This is an uncompromising developer terminal: obsidian black, ANSI exit codes, and zero conversational fluff. We diagnose vulnerabilities; we do not serve lattes. (Note: "Claude" is a trademark of Anthropic, PBC; referenced here solely as satirical stylistic commentary with zero affiliation).',
      }
    };

    let currentLang = localStorage.getItem('cf_lang') || 'zh';

    function setLanguage(lang) {
      currentLang = lang === 'en' ? 'en' : 'zh';
      localStorage.setItem('cf_lang', currentLang);
      document.documentElement.lang = currentLang === 'zh' ? 'zh-TW' : 'en';

      const dict = I18N[currentLang];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerText = dict[key];
        }
      });

      // Update input placeholder
      const targetInput = document.getElementById('target-url');
      if (targetInput) targetInput.placeholder = dict.urlPlaceholder;

      const searchInput = document.getElementById('admin-search-scan');
      if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

      // Update toggle button text
      const lbl = document.getElementById('lang-current-label');
      if (lbl) lbl.innerText = dict.langName;
    }

    function toggleLanguage() {
      setLanguage(currentLang === 'zh' ? 'en' : 'zh');
    }

    // ----------------------------------------------------
    // Senior-Friendly Font Magnification Engine
    // Scales document.documentElement.style.fontSize (Pure CSS rem scaling, NOT browser zoom)
    // ----------------------------------------------------
    const FONT_LEVELS = [100, 115, 130, 150, 175];
    let currentScaleIndex = 0;

    function initFontSize() {
      const saved = Number(localStorage.getItem('cf_font_scale')) || 100;
      const idx = FONT_LEVELS.indexOf(saved);
      currentScaleIndex = idx !== -1 ? idx : 0;
      applyFontSize(FONT_LEVELS[currentScaleIndex]);
    }

    function changeFontSize(delta) {
      currentScaleIndex = Math.max(0, Math.min(FONT_LEVELS.length - 1, currentScaleIndex + delta));
      const newScale = FONT_LEVELS[currentScaleIndex];
      applyFontSize(newScale);
      localStorage.setItem('cf_font_scale', String(newScale));
    }

    function resetFontSize() {
      currentScaleIndex = 0;
      applyFontSize(100);
      localStorage.setItem('cf_font_scale', '100');
    }

    // ----------------------------------------------------
    // Retro Themes Engine
    // ----------------------------------------------------
    const THEMES = ['obsidian', 'vt100', 'amber', 'dracula', 'solarized', 'win95'];
    const THEME_FAVICONS = {
      obsidian: '#10b981',
      vt100: '#33ff33',
      amber: '#ffb000',
      dracula: '#bd93f9',
      solarized: '#2aa198',
      win95: '#000080'
    };

    function setTheme(theme) {
      if (!THEMES.includes(theme)) theme = 'obsidian';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('cf_theme', theme);
      const sel = document.getElementById('theme-selector');
      if (sel) sel.value = theme;
      updateThemeFavicon(theme);
    }

    function cycleTheme() {
      const cur = document.documentElement.getAttribute('data-theme') || 'obsidian';
      const idx = THEMES.indexOf(cur);
      const nextIdx = (idx + 1) % THEMES.length;
      setTheme(THEMES[nextIdx]);
    }

    function updateThemeFavicon(theme) {
      const color = THEME_FAVICONS[theme] || '#10b981';
      const encoded = encodeURIComponent(color);
      const svg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230a0b0e'/%3E%3Ctext x='4' y='22' font-family='monospace' font-weight='900' font-size='18' fill='" + encoded + "'%3E%E2%9D%AF_%3C/text%3E%3C/svg%3E";
      let link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = svg;
      }
    }

    function applyFontSize(scale) {
      document.documentElement.style.fontSize = scale + '%';
      const ind = document.getElementById('font-scale-indicator');
      if (ind) {
        ind.innerText = scale + '%';
        if (scale >= 150) {
          ind.className = "px-2 py-1 text-ansi-amber font-mono font-bold bg-amber-950/40 border border-amber-900/60 rounded text-[11px]";
        } else if (scale > 100) {
          ind.className = "px-2 py-1 text-ansi-green font-mono font-bold bg-emerald-950/40 border border-emerald-900/60 rounded text-[11px]";
        } else {
          ind.className = "px-2 py-1 text-zinc-400 font-mono font-bold hover:bg-obsidian-850 rounded text-[11px]";
        }
      }
    }

    // Tab Switching
    function switchTab(tab) {
      document.getElementById('view-front').classList.toggle('hidden', tab !== 'front');
      document.getElementById('view-batch').classList.toggle('hidden', tab !== 'batch');
      document.getElementById('view-admin').classList.toggle('hidden', tab !== 'admin');

      ['front', 'batch', 'admin'].forEach(t => {
        const btn = document.getElementById('nav-btn-' + t);
        if (t === tab) {
          btn.className = "px-2.5 py-1.5 rounded bg-obsidian-800 text-ansi-green border border-obsidian-700 font-bold transition";
        } else {
          btn.className = "px-2.5 py-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-obsidian-850 transition";
        }
      });

      if (tab === 'admin') {
        checkAdminSession();
      }
    }

    function fillUrl(val) {
      document.getElementById('target-url').value = val;
      validateTargetUrlInput();
    }

    function validateTargetUrlInput() {
      const input = document.getElementById('target-url');
      const errBox = document.getElementById('target-url-error');
      const errMsg = document.getElementById('target-url-error-msg');
      const submitBtn = document.getElementById('btn-submit-scan');
      if (!input || !errBox || !errMsg || !submitBtn) return true;

      const raw = input.value;
      if (!raw) {
        input.classList.remove('border-ansi-red', 'focus:border-ansi-red', 'text-rose-300');
        input.classList.add('border-obsidian-700');
        errBox.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        return true;
      }

      let error = null;
      if (/\s/.test(raw.trim())) {
        error = currentLang === 'zh'
          ? '網址格式不正確：禁止包含空格或多餘參數（如附帶埠號/參數）'
          : 'Invalid URL format: Whitespace or extraneous parameters are strictly prohibited';
      } else {
        const val = raw.trim();
        const testTarget = (val.startsWith('http://') || val.startsWith('https://')) ? val : 'https://' + val;
        try {
          const parsed = new URL(testTarget);
          if (!parsed.hostname || parsed.hostname.includes(' ') || (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost' && !/^(\d{1,3}\.){3}\d{1,3}$/.test(parsed.hostname))) {
            error = currentLang === 'zh' ? '請輸入有效的網域名稱或 IP 網址' : 'Please provide a valid domain name or IP address';
          }
        } catch {
          error = currentLang === 'zh' ? '網址格式不正確，請輸入合法網址' : 'Invalid URL format';
        }
      }

      if (error) {
        input.classList.remove('border-obsidian-700');
        input.classList.add('border-ansi-red', 'focus:border-ansi-red', 'text-rose-300');
        errMsg.innerText = error;
        errBox.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
        return false;
      } else {
        input.classList.remove('border-ansi-red', 'focus:border-ansi-red', 'text-rose-300');
        input.classList.add('border-obsidian-700');
        errBox.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        return true;
      }
    }

    // Single URL Scan
    async function handleSingleScan(e) {
      e.preventDefault();
      const input = document.getElementById('target-url');
      const submitBtn = document.getElementById('btn-submit-scan');
      const spinner = document.getElementById('scan-spinner');
      const resultArea = document.getElementById('scan-result');

      if (!validateTargetUrlInput()) return;
      const url = input.value.trim();
      if (!url) return;

      submitBtn.disabled = true;
      spinner.classList.remove('hidden');
      resultArea.classList.add('hidden');

      try {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, lang: currentLang })
        });
        const data = await res.json();
        renderScanResult(data);
      } catch (err) {
        alert(currentLang === 'zh' ? '檢測請求異常：' + err.message : 'Diagnostic request failed: ' + err.message);
      } finally {
        submitBtn.disabled = false;
        spinner.classList.add('hidden');
      }
    }

    function renderScanResult(data) {
      const area = document.getElementById('scan-result');
      area.classList.remove('hidden');
      const dict = I18N[currentLang];

      let statusColor = 'text-ansi-amber border-amber-900/60 bg-amber-950/20';
      let statusTag = dict.statusUnknownTag;
      let icon = '❓';

      if (data.exit_code === 2) {
        statusColor = 'text-amber-400 border-amber-600/70 bg-amber-950/40';
        statusTag = dict.statusInvalidTag || '⚠️ [格式錯誤: 2] 無效網址';
        icon = '⚠️';
      } else if (data.patch_status === 'ok') {
        statusColor = 'text-ansi-green border-emerald-900/60 bg-emerald-950/20';
        statusTag = dict.statusOk;
        icon = '✔';
      } else if (data.patch_status === 'potentially_vulnerable') {
        statusColor = 'text-ansi-red border-rose-900/60 bg-rose-950/20';
        statusTag = dict.statusVulnTag;
        icon = '✖';
      }

      area.innerHTML = \`
        <div class="border border-obsidian-800 bg-obsidian-900 rounded-lg p-4 sm:p-5 space-y-4 font-mono text-xs sm:text-sm">
          <!-- Status Banner -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-800 pb-3">
            <div>
              <div class="text-xs text-zinc-500 uppercase tracking-widest font-semibold">\${dict.targetLabel}</div>
              <div class="text-base font-bold text-white break-all mt-0.5">\${escapeHtml(data.url)}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1.5 rounded text-xs sm:text-sm font-bold border \${statusColor} font-mono">
                \${icon} \${statusTag}
              </span>
            </div>
          </div>

          <!-- Version & Exit Code Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-obsidian-950 p-3 rounded border border-obsidian-800">
              <span class="text-xs text-zinc-500 block uppercase font-semibold">\${dict.detectedPhpLabel}</span>
              <span class="text-sm font-bold \${data.php_version ? 'text-ansi-cyan' : 'text-zinc-600'}">
                \${data.php_version ? 'PHP ' + escapeHtml(data.php_version) : dict.notAdvertised}
              </span>
            </div>
            <div class="bg-obsidian-950 p-3 rounded border border-obsidian-800">
              <span class="text-xs text-zinc-500 block uppercase font-semibold">\${dict.exitCodeLabel}</span>
              <span class="text-sm font-bold text-zinc-200">CODE \${data.exit_code}</span>
            </div>
            <div class="bg-obsidian-950 p-3 rounded border border-obsidian-800">
              <span class="text-xs text-zinc-500 block uppercase font-semibold">\${dict.cveCoverageLabel}</span>
              <span class="text-sm text-zinc-300">109618 / 109619</span>
            </div>
          </div>

          <!-- Reason Box -->
          <div class="bg-obsidian-950 p-3.5 rounded border border-obsidian-800 space-y-1">
            <div class="text-xs text-zinc-500 uppercase font-semibold">\${dict.diagReasonLabel}</div>
            <p class="text-zinc-200 leading-relaxed text-xs sm:text-sm">\${escapeHtml(data.reason)}</p>
          </div>

          <!-- Actionable Remediation Box (Wiz AI-SDLC Criterion 3: Fix Quality) -->
          \${data.remediation ? \`
            <div class="bg-obsidian-950 p-3.5 rounded border border-rose-900/60 space-y-1.5">
              <div class="text-xs text-ansi-red uppercase font-bold flex items-center gap-1.5">
                <span>🛠️</span>
                <span>\${dict.remediationTitle}</span>
              </div>
              <pre class="text-xs text-zinc-200 font-mono whitespace-pre-wrap bg-obsidian-900 p-2.5 rounded border border-obsidian-800 leading-relaxed">\${escapeHtml(data.remediation)}</pre>
            </div>
          \` : ''}

          <!-- Headers Accordion -->
          \${data.headers_summary ? \`
            <details class="text-xs text-zinc-400">
              <summary class="cursor-pointer hover:text-zinc-200 py-1 text-zinc-500 font-semibold">\${dict.headersAccordionLabel}</summary>
              <pre class="mt-2 p-3 bg-obsidian-950 rounded border border-obsidian-800 text-zinc-300 overflow-x-auto whitespace-pre-wrap font-mono text-xs">\${escapeHtml(data.headers_summary)}</pre>
            </details>
          \` : ''}

          <!-- CLI Quick Actions -->
          <div class="flex flex-wrap items-center justify-between pt-2 border-t border-obsidian-800 gap-2">
            <div class="flex items-center space-x-2">
              <button onclick="copyCliCmd('\${escapeHtml(data.url)}')" class="px-2.5 py-1.5 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-200 border border-obsidian-750 rounded text-xs font-semibold">
                $ agy check "\${escapeHtml(data.url)}" \${dict.copyCliLabel}
              </button>
            </div>
            \${data.id ? \`
              <button onclick="copyReportLink('\${data.id}')" class="px-3 py-1.5 bg-obsidian-850 hover:bg-obsidian-800 text-ansi-green border border-obsidian-750 rounded text-xs font-bold">
                \${dict.copyReportLabel}
              </button>
            \` : ''}
          </div>
        </div>
      \`;
    }

    function copyCliCmd(url) {
      const cmd = 'agy check "' + url + '"';
      navigator.clipboard.writeText(cmd).then(() => {
        alert((currentLang === 'zh' ? '已複製 CLI 檢測指令至剪貼簿：\\n' : 'Copied CLI command to clipboard:\\n') + cmd);
      });
    }

    function copyReportLink(id) {
      const url = window.location.origin + '/?report=' + id;
      navigator.clipboard.writeText(url).then(() => {
        alert((currentLang === 'zh' ? '檢測報告專屬網址已複製至剪貼簿：\\n' : 'Diagnostic report URL copied:\\n') + url);
      });
    }

    // Batch Scan
    async function handleBatchScan() {
      const textarea = document.getElementById('batch-urls');
      const lines = textarea.value.split('\\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return alert(currentLang === 'zh' ? '請至少輸入一個目標網址' : 'Enter at least one target URL');
      if (lines.length > 20) return alert(currentLang === 'zh' ? '單次批次掃描上限為 20 個網址' : 'Maximum 20 targets per batch run');

      const btn = document.getElementById('btn-batch-scan');
      btn.disabled = true;
      btn.innerText = currentLang === 'zh' ? '[掃描探針執行中...]' : '[EXECUTING PROBES...]';

      try {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: lines, lang: currentLang })
        });
        const data = await res.json();
        renderBatchResults(data.results || []);
      } catch (err) {
        alert((currentLang === 'zh' ? '批次掃描失敗：' : 'Batch scan failed: ') + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = I18N[currentLang].btnRunBatch;
      }
    }

    function renderBatchResults(results) {
      const container = document.getElementById('batch-results-container');
      const tbody = document.getElementById('batch-table-body');
      const chips = document.getElementById('batch-summary-chips');
      container.classList.remove('hidden');

      let vuln = 0, ok = 0, unk = 0, invalid = 0;
      results.forEach(r => {
        if (r.exit_code === 2) invalid++;
        else if (r.patch_status === 'potentially_vulnerable') vuln++;
        else if (r.patch_status === 'ok') ok++;
        else unk++;
      });

      chips.innerHTML = \`
        <span class="text-ansi-red font-bold">[\${currentLang === 'zh' ? '受威脅' : 'VULN'}: \${vuln}]</span>
        <span class="text-ansi-green font-bold">[\${currentLang === 'zh' ? '安全' : 'SAFE'}: \${ok}]</span>
        <span class="text-ansi-amber font-bold">[\${currentLang === 'zh' ? '未知' : 'UNK'}: \${unk}]</span>
        \${invalid > 0 ? \`<span class="text-amber-400 font-bold">[\${currentLang === 'zh' ? '格式錯誤' : 'INVALID'}: \${invalid}]</span>\` : ''}
      \`;

      tbody.innerHTML = results.map(r => {
        let badge = '<span class="text-ansi-amber font-bold">[UNKNOWN]</span>';
        if (r.exit_code === 2) badge = '<span class="text-amber-400 font-bold">[INVALID]</span>';
        else if (r.patch_status === 'ok') badge = '<span class="text-ansi-green font-bold">[OK]</span>';
        else if (r.patch_status === 'potentially_vulnerable') badge = '<span class="text-ansi-red font-bold">[VULN]</span>';

        return \`
          <tr class="hover:bg-obsidian-850">
            <td class="p-2.5 text-white truncate max-w-xs">\${escapeHtml(r.url)}</td>
            <td class="p-2.5">\${badge}</td>
            <td class="p-2.5 text-ansi-cyan font-bold">\${escapeHtml(r.php_version || '-')}</td>
            <td class="p-2.5 text-zinc-400">\${r.exit_code}</td>
            <td class="p-2.5 text-zinc-300 truncate max-w-sm">\${escapeHtml(r.reason)}</td>
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
          errBox.innerText = currentLang === 'zh' ? '驗證失敗：帳號或密碼不正確' : 'Authentication failed: ' + (data.error || 'Invalid credentials');
          errBox.classList.remove('hidden');
        }
      } catch (err) {
        errBox.innerText = currentLang === 'zh' ? '網路連線異常：' + err.message : 'Network error: ' + err.message;
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
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-zinc-500">' + (currentLang === 'zh' ? '尚無審計檢測紀錄' : 'No audit records found.') + '</td></tr>';
        return;
      }
      tbody.innerHTML = scans.map(s => {
        let statusBadge = '<span class="text-ansi-amber font-bold">[UNKNOWN]</span>';
        if (s.patch_status === 'ok') statusBadge = '<span class="text-ansi-green font-bold">[OK]</span>';
        if (s.patch_status === 'potentially_vulnerable') statusBadge = '<span class="text-ansi-red font-bold">[VULN]</span>';

        return \`
          <tr class="hover:bg-obsidian-850">
            <td class="p-3 text-zinc-400 whitespace-nowrap">\${escapeHtml(s.created_at || '-')}</td>
            <td class="p-3 text-white truncate max-w-xs">\${escapeHtml(s.url)}</td>
            <td class="p-3">\${statusBadge}</td>
            <td class="p-3 text-ansi-cyan font-bold">\${escapeHtml(s.php_version || '-')}</td>
            <td class="p-3 text-zinc-300 truncate max-w-xs">\${escapeHtml(s.reason)}</td>
            <td class="p-3">
              <button onclick="deleteScan('\${s.id}')" class="text-ansi-red hover:underline font-bold">[RM]</button>
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
      if (!confirm(currentLang === 'zh' ? '確認刪除此筆審計紀錄 ' + id + '？' : 'Confirm deletion of record ' + id + '?')) return;
      await fetch('/api/admin/scans/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    async function clearScanLogs() {
      if (!confirm(currentLang === 'zh' ? '警告：確定要清空 D1 資料庫中所有歷史檢測日誌？此操作不可逆！' : 'WARNING: Truncate all historical scan records from D1?')) return;
      await fetch('/api/admin/scans/clear', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      loadAdminData();
    }

    function renderAdminMonitors(monitors) {
      const tbody = document.getElementById('admin-monitors-tbody');
      if (monitors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-zinc-500">' + (currentLang === 'zh' ? '尚未登記巡檢目標' : 'No daemon targets registered.') + '</td></tr>';
        return;
      }
      tbody.innerHTML = monitors.map(m => \`
        <tr class="hover:bg-obsidian-850">
          <td class="p-3 text-white font-bold">\${escapeHtml(m.label)}</td>
          <td class="p-3 text-zinc-200 truncate max-w-xs">\${escapeHtml(m.url)}</td>
          <td class="p-3">\${m.last_status === 'ok' ? '<span class="text-ansi-green font-bold">[OK]</span>' : m.last_status === 'potentially_vulnerable' ? '<span class="text-ansi-red font-bold">[VULN]</span>' : '<span class="text-ansi-amber font-bold">[UNKNOWN]</span>'}</td>
          <td class="p-3 text-ansi-cyan font-bold">\${escapeHtml(m.last_version || '-')}</td>
          <td class="p-3 text-zinc-400 whitespace-nowrap">\${escapeHtml(m.last_checked_at || 'PENDING')}</td>
          <td class="p-3 space-x-2">
            <button onclick="triggerMonitorScan('\${m.id}')" class="text-ansi-cyan hover:underline font-bold">[PROBE]</button>
            <button onclick="deleteMonitor('\${m.id}')" class="text-ansi-red hover:underline font-bold">[RM]</button>
          </td>
        </tr>
      \`).join('');
    }

    async function addMonitoredTarget() {
      const url = document.getElementById('new-monitor-url').value.trim();
      const label = document.getElementById('new-monitor-label').value.trim();
      if (!url) return alert(currentLang === 'zh' ? '請填寫目標 URL' : 'Target URL required');

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
      alert(currentLang === 'zh' ? '已觸發即時邊緣探針檢驗。' : 'Immediate probe dispatched.');
      loadAdminData();
    }

    async function deleteMonitor(id) {
      if (!confirm(currentLang === 'zh' ? '確定自巡檢名單移除此目標？' : 'Remove target from daemon list?')) return;
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
      alert(currentLang === 'zh' ? 'Webhook 告警設定已寫入 D1 資料庫。' : 'Webhook config persisted to D1.');
    }

    async function testWebhook() {
      const res = await fetch('/api/admin/settings/test-webhook', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      const data = await res.json();
      alert(data.message || (currentLang === 'zh' ? '已發送測試告警。' : 'Test alert dispatched.'));
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

    // Auto-load report if ?report=<id> or handle demo views
    window.addEventListener('DOMContentLoaded', () => {
      initFontSize();
      setLanguage(currentLang);

      // Initialize Theme Selector & Favicon from data-theme
      const activeTheme = localStorage.getItem('cf_theme') || document.documentElement.getAttribute('data-theme') || 'obsidian';
      setTheme(activeTheme);
      const sel = document.getElementById('theme-selector');
      if (sel) sel.value = activeTheme;
      updateThemeFavicon(activeTheme);

      const params = new URLSearchParams(window.location.search);
      const reportId = params.get('report');
      if (reportId) {
        fetch('/api/report/' + reportId)
          .then(res => res.ok ? res.json() : null)
          .then(report => {
            if (report) renderScanResult(report);
          })
          .catch(console.error);
      }

      const tabParam = params.get('tab');
      if (tabParam) {
        switchTab(tabParam);
      }

      if (params.get('demo') === 'batch') {
        switchTab('batch');
        const demoUrls = "https://legacy-crm.internal.corp\\nhttps://portal.marketing.org\\nhttps://api.gateway.net\\nhttps://dev-stage.service.io";
        const textarea = document.getElementById('batch-urls');
        if (textarea) textarea.value = demoUrls;
        renderBatchResults([
          { url: 'https://legacy-crm.internal.corp', patch_status: 'potentially_vulnerable', php_version: '8.2.14', exit_code: 1, reason: currentLang === 'zh' ? '檢測到受影響的 PHP 8.2.14 版本（存在 RCE 漏洞風險，建議立即升級至 8.2.35+）' : 'Potentially vulnerable PHP 8.2.14 detected.' },
          { url: 'https://portal.marketing.org', patch_status: 'ok', php_version: '8.3.36', exit_code: 0, reason: currentLang === 'zh' ? '檢測到已修復之 PHP 8.3.36 版本（符合安全基準）' : 'PHP 8.3.36 is patched.' },
          { url: 'https://api.gateway.net', patch_status: 'ok', php_version: '8.4.27', exit_code: 0, reason: currentLang === 'zh' ? '檢測到已修復之 PHP 8.4.27 版本（符合安全基準）' : 'PHP 8.4.27 is patched.' },
          { url: 'https://dev-stage.service.io', patch_status: 'unknown', php_version: null, exit_code: 3, reason: currentLang === 'zh' ? '伺服器未於 HTTP 標頭公開 PHP 版本資訊' : 'PHP version not advertised in HTTP headers.' }
        ]);
      }

      if (params.get('demo') === 'admin') {
        switchTab('admin');
        showAdminPanel();
        const statTotal = document.getElementById('stat-total-scans');
        if (statTotal) statTotal.innerText = '1,428';
        const statVuln = document.getElementById('stat-vuln-detected');
        if (statVuln) statVuln.innerText = '42';
        const statSafe = document.getElementById('stat-safe-patched');
        if (statSafe) statSafe.innerText = '896';
        const statMon = document.getElementById('stat-monitors-count');
        if (statMon) statMon.innerText = '16';

        const tbody = document.getElementById('admin-scans-tbody');
        if (tbody) {
          tbody.innerHTML = \`
            <tr class="hover:bg-obsidian-850">
              <td class="p-2.5 text-white font-mono">https://legacy-crm.internal.corp</td>
              <td class="p-2.5"><span class="text-ansi-red font-bold">[VULN]</span></td>
              <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.2.14</td>
              <td class="p-2.5 text-zinc-400">1</td>
              <td class="p-2.5 text-zinc-300 truncate max-w-sm">檢測到受影響版本，建議立即升級至 8.2.35</td>
              <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:15:22</td>
            </tr>
            <tr class="hover:bg-obsidian-850">
              <td class="p-2.5 text-white font-mono">https://portal.marketing.org</td>
              <td class="p-2.5"><span class="text-ansi-green font-bold">[OK]</span></td>
              <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.3.36</td>
              <td class="p-2.5 text-zinc-400">0</td>
              <td class="p-2.5 text-zinc-300 truncate max-w-sm">版本已修復至安全基準</td>
              <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:14:05</td>
            </tr>
            <tr class="hover:bg-obsidian-850">
              <td class="p-2.5 text-white font-mono">https://api.gateway.net</td>
              <td class="p-2.5"><span class="text-ansi-green font-bold">[OK]</span></td>
              <td class="p-2.5 text-ansi-cyan font-bold font-mono">8.4.27</td>
              <td class="p-2.5 text-zinc-400">0</td>
              <td class="p-2.5 text-zinc-300 truncate max-w-sm">版本已修復至安全基準</td>
              <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:10:19</td>
            </tr>
            <tr class="hover:bg-obsidian-850">
              <td class="p-2.5 text-white font-mono">https://dev-stage.service.io</td>
              <td class="p-2.5"><span class="text-ansi-amber font-bold">[UNKNOWN]</span></td>
              <td class="p-2.5 text-zinc-500 font-mono">-</td>
              <td class="p-2.5 text-zinc-400">3</td>
              <td class="p-2.5 text-zinc-300 truncate max-w-sm">未於 HTTP 回應標頭暴露版本</td>
              <td class="p-2.5 text-zinc-500 font-mono text-[11px]">2026-10-23 07:05:41</td>
            </tr>
          \`;
        }
      }
    });

    // Keyboard Shortcuts:
    // '/' focuses input
    // '+' or '=' magnifies font
    // '-' shrinks font
    // '0' resets font to 100%
    // 't' or 'T' cycles retro theme
    window.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        const input = document.getElementById('target-url');
        if (input) input.focus();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        changeFontSize(1);
      } else if (e.key === '-') {
        e.preventDefault();
        changeFontSize(-1);
      } else if (e.key === '0') {
        e.preventDefault();
        resetFontSize();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        cycleTheme();
      }
    });
  </script>
</body>
</html>
`
}
