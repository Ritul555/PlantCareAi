function renderDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlantCare AI — Intelligent Botanical Health & Diagnostics</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080d0a;
      --bg-subtle: #0e1511;
      --card-bg: rgba(16, 24, 20, 0.65);
      --card-bg-hover: rgba(22, 34, 28, 0.85);
      --border: rgba(255, 255, 255, 0.08);
      --border-active: rgba(52, 211, 153, 0.35);
      --primary: #10b981;
      --primary-light: #34d399;
      --primary-glow: rgba(16, 185, 129, 0.2);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 18px;
      --radius-full: 9999px;
      --transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg);
      background-image: 
        radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(5, 150, 105, 0.06) 0px, transparent 50%);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
      letter-spacing: -0.01em;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Minimalist Header */
    header {
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(8, 13, 10, 0.8);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-inner {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text);
    }
    .brand-icon {
      width: 34px;
      height: 34px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.4));
      border: 1px solid var(--border-active);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-light);
    }
    .brand-name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }
    .brand-name span {
      color: var(--primary-light);
    }

    .nav-pill-group {
      display: flex;
      align-items: center;
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      padding: 4px;
      border-radius: var(--radius-full);
      gap: 2px;
    }
    .nav-pill {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 500;
      padding: 6px 16px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: var(--transition);
    }
    .nav-pill:hover {
      color: var(--text);
    }
    .nav-pill.active {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text);
      font-weight: 600;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--primary-light);
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 500;
    }
    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--primary-light);
      box-shadow: 0 0 8px var(--primary-light);
    }

    .btn-outline {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 7px 15px;
      border-radius: var(--radius-full);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    .btn-outline:hover {
      border-color: rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.04);
    }

    /* Minimalist Hero */
    .hero {
      padding: 56px 0 40px;
      text-align: center;
    }
    .hero-eyebrow {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary-light);
      margin-bottom: 12px;
    }
    .hero h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 44px;
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.04em;
      margin-bottom: 14px;
      max-width: 720px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero p {
      font-size: 15px;
      color: var(--text-muted);
      max-width: 540px;
      margin: 0 auto;
    }

    /* Content Cards */
    .view-panel {
      display: none;
    }
    .view-panel.active {
      display: block;
      animation: fadeIn 0.25s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .glass-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      padding: 28px;
      transition: var(--transition);
    }

    /* Scanner Grid */
    .scanner-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }
    @media (max-width: 860px) {
      .scanner-grid { grid-template-columns: 1fr; }
      .hero h1 { font-size: 32px; }
      .nav-pill-group { display: none; }
    }

    .dropzone {
      border: 1px dashed rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-md);
      padding: 36px 20px;
      text-align: center;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.2);
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }
    .dropzone:hover, .dropzone.dragover {
      border-color: var(--primary-light);
      background: rgba(16, 185, 129, 0.04);
    }
    .dropzone-icon {
      width: 44px;
      height: 44px;
      margin: 0 auto 14px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-light);
    }
    .dropzone h4 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .dropzone p {
      font-size: 13px;
      color: var(--text-dim);
    }

    .preview-box {
      position: relative;
      display: none;
      margin-top: 14px;
      border-radius: var(--radius-md);
      overflow: hidden;
      max-height: 240px;
      border: 1px solid var(--border);
    }
    .preview-box img {
      width: 100%;
      height: 240px;
      object-fit: cover;
    }
    .scan-beam {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
      box-shadow: 0 0 10px var(--primary-light);
      display: none;
      animation: scanAnim 2s infinite ease-in-out;
    }
    @keyframes scanAnim {
      0% { top: 0; }
      50% { top: 98%; }
      100% { top: 0; }
    }

    .preset-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    .chip {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
      padding: 5px 12px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: var(--transition);
    }
    .chip:hover {
      background: rgba(16, 185, 129, 0.1);
      border-color: var(--border-active);
      color: var(--primary-light);
    }

    .btn-primary {
      width: 100%;
      margin-top: 18px;
      padding: 12px;
      border-radius: var(--radius-md);
      background: var(--primary);
      color: #04140b;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary:hover:not(:disabled) {
      background: var(--primary-light);
      box-shadow: 0 4px 16px var(--primary-glow);
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Result Panel */
    .empty-state {
      text-align: center;
      padding: 50px 20px;
      color: var(--text-dim);
    }
    .empty-state svg {
      width: 48px;
      height: 48px;
      margin-bottom: 14px;
      opacity: 0.3;
    }
    .result-content {
      display: none;
    }

    .result-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .species-name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .scientific-name {
      font-size: 13px;
      color: var(--text-dim);
      font-style: italic;
    }

    .score-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.08);
      border: 2px solid var(--primary-light);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .score-num {
      font-size: 18px;
      font-weight: 800;
      color: var(--primary-light);
      line-height: 1;
    }
    .score-label {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--text-dim);
      margin-top: 2px;
    }

    .badge-status {
      display: inline-block;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 14px;
    }
    .status-healthy { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .status-mild_stress { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .status-needs_attention { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .status-high_risk { background: rgba(239, 68, 68, 0.15); color: #f87171; }

    .summary-text {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.55;
      padding: 14px;
      border-radius: var(--radius-md);
      background: rgba(0, 0, 0, 0.25);
      border-left: 2px solid var(--primary);
      margin-bottom: 18px;
    }

    .vital-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 18px;
    }
    .vital-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 12px;
    }
    .vital-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-dim);
      margin-bottom: 4px;
    }
    .vital-val {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
    }

    .rec-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .rec-item svg {
      width: 15px;
      height: 15px;
      color: var(--primary-light);
      flex-shrink: 0;
      margin-top: 3px;
    }

    /* Garden Grid */
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .plant-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 18px;
    }
    .plant-item {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 20px;
      transition: var(--transition);
    }
    .plant-item:hover {
      border-color: var(--border-active);
      transform: translateY(-2px);
    }
    .plant-item-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .plant-item h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .plant-item p {
      font-size: 12px;
      color: var(--text-dim);
    }

    /* Telemetry Minimalist */
    .tele-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .tele-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 20px;
    }
    .tele-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }
    .tele-value {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 4px;
    }
    .tele-sub {
      font-size: 12px;
      color: var(--primary-light);
      font-weight: 500;
    }

    /* API Minimalist */
    .endpoint-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      margin-bottom: 10px;
      font-size: 13px;
    }
    .method-tag {
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .method-get { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .method-post { background: rgba(16, 185, 129, 0.15); color: #34d399; }

    /* Modal Minimalist */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 200;
      padding: 20px;
    }
    .modal-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      max-width: 400px;
      width: 100%;
      padding: 28px;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 18px;
      right: 18px;
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-size: 18px;
      cursor: pointer;
    }
    .form-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 10px 14px;
      color: var(--text);
      font-size: 14px;
      margin-top: 6px;
      margin-bottom: 14px;
      outline: none;
      transition: var(--transition);
    }
    .form-input:focus {
      border-color: var(--primary-light);
    }

    footer {
      border-top: 1px solid var(--border);
      padding: 28px 0;
      margin-top: 60px;
      text-align: center;
      font-size: 13px;
      color: var(--text-dim);
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header>
    <div class="container header-inner">
      <a href="/" class="brand">
        <div class="brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        </div>
        <div class="brand-name">PlantCare<span>.ai</span></div>
      </a>

      <div class="nav-pill-group">
        <button class="nav-pill active" id="nav-scanner" onclick="switchView('scanner')">AI Diagnostics</button>
        <button class="nav-pill" id="nav-garden" onclick="switchView('garden')">My Garden (<span id="gardenBadge">3</span>)</button>
        <button class="nav-pill" id="nav-telemetry" onclick="switchView('telemetry')">IoT Sensors</button>
        <button class="nav-pill" id="nav-api" onclick="switchView('api')">API Console</button>
      </div>

      <div class="header-actions">
        <div class="live-badge">
          <div class="live-dot"></div>
          <span>Serverless Online</span>
        </div>
        <button class="btn-outline" id="authBtn" onclick="openAuthModal()">Sign In</button>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero container">
    <div class="hero-eyebrow">Precision AI Botanical Intelligence</div>
    <h1>Plant Health Diagnostics with <span>Computer Vision</span></h1>
    <p>Upload a photo for disease detection, physiological stress analysis, and automated care prescriptions.</p>
  </section>

  <!-- Main Content -->
  <main class="container">
    <!-- View 1: Scanner -->
    <div id="view-scanner" class="view-panel active">
      <div class="scanner-grid">
        <!-- Upload -->
        <div class="glass-card">
          <h3 style="font-size: 17px; margin-bottom: 14px; font-weight: 600;">Specimen Image</h3>
          <div class="dropzone" id="dropzone" onclick="document.getElementById('fileInput').click()">
            <div class="dropzone-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <h4>Select or Drop Plant Image</h4>
            <p>PNG, JPG, WebP up to 10MB</p>
            <input type="file" id="fileInput" style="display: none;" accept="image/*">
            <div class="preview-box" id="previewBox">
              <img id="previewImage" alt="Preview">
              <div class="scan-beam" id="scanBeam"></div>
            </div>
          </div>

          <div style="margin-top: 14px;">
            <p style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 600; letter-spacing: 0.05em;">Sample Specimens:</p>
            <div class="preset-chips">
              <div class="chip" onclick="loadSample('Monstera Deliciosa', 'healthy')">Healthy Monstera</div>
              <div class="chip" onclick="loadSample('Tomato Leaf', 'blight')">Tomato Early Blight</div>
              <div class="chip" onclick="loadSample('Sansevieria', 'dry')">Snake Plant</div>
            </div>
          </div>

          <button class="btn-primary" id="analyzeBtn" onclick="executeScan()" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Analyze Plant Health</span>
          </button>
        </div>

        <!-- Result -->
        <div class="glass-card">
          <div class="empty-state" id="emptyState">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h4 style="font-size: 15px; margin-bottom: 4px;">Awaiting Specimen Analysis</h4>
            <p style="font-size: 13px; max-width: 320px; margin: 0 auto;">Select an image on the left and trigger diagnosis to inspect pathological evidence and care prescriptions.</p>
          </div>

          <div class="result-content" id="resultContent">
            <div class="result-top">
              <div>
                <div class="species-name" id="resSpecies">Monstera Deliciosa</div>
                <div class="scientific-name" id="resScientific">Monstera deliciosa</div>
              </div>
              <div class="score-circle">
                <span class="score-num" id="resScore">85</span>
                <span class="score-label">Health</span>
              </div>
            </div>

            <div id="resBadge" class="badge-status status-healthy">Healthy Condition</div>

            <div class="summary-text" id="resSummary">
              Visual analysis confirms healthy foliage structure with no acute necrotic lesions or active pathogen signatures.
            </div>

            <div class="vital-grid">
              <div class="vital-card">
                <div class="vital-title">Hydration Strategy</div>
                <div class="vital-val" id="resWater">Allow top 2" dry</div>
              </div>
              <div class="vital-card">
                <div class="vital-title">Photometric Needs</div>
                <div class="vital-val" id="resLight">Bright indirect</div>
              </div>
            </div>

            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em; margin-bottom: 8px;">Prescribed Actions</div>
            <div id="resRecs">
              <!-- Recommendations injected -->
            </div>

            <button class="btn-outline" style="width: 100%; margin-top: 18px;" onclick="addCurrentToGarden()">
              + Save Specimen to Collection
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View 2: Garden -->
    <div id="view-garden" class="view-panel">
      <div class="section-head">
        <div>
          <h2 class="section-title">Plant Inventory</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Monitored specimens across your indoor and exterior collection.</p>
        </div>
        <button class="btn-primary" style="width: auto; margin-top: 0; padding: 8px 18px;" onclick="openAddModal()">
          + Add Specimen
        </button>
      </div>

      <div class="plant-grid" id="plantGrid">
        <!-- Injected via JS -->
      </div>
    </div>

    <!-- View 3: IoT Telemetry -->
    <div id="view-telemetry" class="view-panel">
      <div class="section-head">
        <div>
          <h2 class="section-title">Environmental Telemetry</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Real-time ambient probes and substrate hydration sensors.</p>
        </div>
        <button class="btn-outline" onclick="refreshSensors()">↻ Sync Probes</button>
      </div>

      <div class="tele-grid">
        <div class="tele-box">
          <div class="tele-label">Substrate Moisture</div>
          <div class="tele-value" id="sMoisture">68%</div>
          <div class="tele-sub">Optimal Volumetric Water</div>
        </div>
        <div class="tele-box">
          <div class="tele-label">Ambient Temperature</div>
          <div class="tele-value" id="sTemp">24.2°C</div>
          <div class="tele-sub">Comfort Thermal Range</div>
        </div>
        <div class="tele-box">
          <div class="tele-label">Luminosity Exposure</div>
          <div class="tele-value" id="sLight">850 Lux</div>
          <div class="tele-sub">Adequate PAR Level</div>
        </div>
        <div class="tele-box">
          <div class="tele-label">Relative Humidity</div>
          <div class="tele-value" id="sHumidity">58%</div>
          <div class="tele-sub">Healthy Vapor Deficit</div>
        </div>
      </div>
    </div>

    <!-- View 4: API Console -->
    <div id="view-api" class="view-panel">
      <div class="section-head">
        <div>
          <h2 class="section-title">REST Service Console</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Backend endpoints consumed by the Flutter mobile application.</p>
        </div>
      </div>

      <div class="glass-card">
        <div class="endpoint-row">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="method-tag method-get">GET</span>
            <strong>/</strong>
            <span style="color: var(--text-dim);">System Diagnostic Ping</span>
          </div>
          <button class="chip" onclick="testPing('/')">Execute</button>
        </div>
        <div class="endpoint-row">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="method-tag method-post">POST</span>
            <strong>/auth/login</strong>
            <span style="color: var(--text-dim);">Bearer Token Exchange</span>
          </div>
          <span style="font-size: 11px; color: var(--text-dim);">JSON Payload</span>
        </div>
        <div class="endpoint-row">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="method-tag method-post">POST</span>
            <strong>/scan</strong>
            <span style="color: var(--text-dim);">Gemini Vision AI Analysis</span>
          </div>
          <span style="font-size: 11px; color: var(--text-dim);">Multipart Image</span>
        </div>
        <div class="endpoint-row">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="method-tag method-get">GET</span>
            <strong>/plants</strong>
            <span style="color: var(--text-dim);">Collection Query</span>
          </div>
          <span style="font-size: 11px; color: var(--text-dim);">Authorization Header</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Auth Modal -->
  <div class="modal-backdrop" id="authModal">
    <div class="modal-card">
      <button class="modal-close" onclick="closeAuthModal()">✕</button>
      <h3 style="font-size: 18px; margin-bottom: 4px;" id="authTitle">Sign In</h3>
      <p style="font-size: 13px; color: var(--text-dim); margin-bottom: 18px;" id="authSub">Access your synchronized plant telemetry.</p>

      <form onsubmit="handleAuth(event)">
        <div id="nameWrap" style="display: none;">
          <label style="font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase;">Full Name</label>
          <input type="text" id="aName" class="form-input" placeholder="Alex Morgan">
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase;">Email Address</label>
          <input type="email" id="aEmail" class="form-input" placeholder="alex@domain.com" required>
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase;">Password</label>
          <input type="password" id="aPass" class="form-input" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-primary" id="aBtn">Continue</button>
      </form>

      <p style="text-align: center; font-size: 12px; color: var(--text-dim); margin-top: 14px;">
        <span id="authToggleHint">Don't have an account?</span>
        <a href="#" style="color: var(--primary-light); text-decoration: none; font-weight: 600;" onclick="toggleAuth()">Register</a>
      </p>
    </div>
  </div>

  <!-- Add Plant Modal -->
  <div class="modal-backdrop" id="addModal">
    <div class="modal-card">
      <button class="modal-close" onclick="closeAddModal()">✕</button>
      <h3 style="font-size: 18px; margin-bottom: 4px;">Register Specimen</h3>
      <p style="font-size: 13px; color: var(--text-dim); margin-bottom: 18px;">Add a new specimen to track health and watering schedules.</p>

      <form onsubmit="handleAdd(event)">
        <div>
          <label style="font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase;">Plant Identifier *</label>
          <input type="text" id="pName" class="form-input" placeholder="e.g. Living Room Ficus" required>
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase;">Botanical Category</label>
          <input type="text" id="pType" class="form-input" placeholder="Ficus elastica">
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase;">Location Tag</label>
          <input type="text" id="pLoc" class="form-input" placeholder="East Window">
        </div>
        <button type="submit" class="btn-primary">Save Specimen</button>
      </form>
    </div>
  </div>

  <footer>
    <div class="container">
      PlantCare AI Platform • Precision Botanical Vision Intelligence
    </div>
  </footer>

  <script>
    let activeFile = null;
    let lastScanData = null;
    let authMode = 'login';

    let garden = [
      { id: 1, name: 'Monstera Deliciosa', type: 'Araceae', status: 'healthy', location: 'Living Room' },
      { id: 2, name: 'Sansevieria Trifasciata', type: 'Asparagaceae', status: 'healthy', location: 'Office' },
      { id: 3, name: 'Epipremnum Aureum', type: 'Araceae', status: 'mild_stress', location: 'Balcony' }
    ];

    function switchView(viewId) {
      document.querySelectorAll('.view-panel').forEach(v => v.classList.remove('active'));
      document.querySelectorAll('.nav-pill').forEach(b => b.classList.remove('active'));

      const targetView = document.getElementById('view-' + viewId);
      const targetNav = document.getElementById('nav-' + viewId);
      if (targetView) targetView.classList.add('active');
      if (targetNav) targetNav.classList.add('active');
    }

    // Upload & Drag Drop
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const previewBox = document.getElementById('previewBox');
    const previewImage = document.getElementById('previewImage');
    const analyzeBtn = document.getElementById('analyzeBtn');

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) bindFile(e.target.files[0]);
    });
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) bindFile(e.dataTransfer.files[0]);
    });

    function bindFile(file) {
      activeFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewBox.style.display = 'block';
        analyzeBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }

    function loadSample(name, status) {
      const c = document.createElement('canvas');
      c.width = 400; c.height = 300;
      const ctx = c.getContext('2d');
      ctx.fillStyle = status === 'healthy' ? '#0c2419' : (status === 'blight' ? '#2b1c0e' : '#14201a');
      ctx.fillRect(0, 0, 400, 300);
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 20px Space Grotesk, sans-serif';
      ctx.fillText(name, 20, 150);
      c.toBlob(blob => bindFile(blob), 'image/jpeg');
    }

    async function executeScan() {
      if (!activeFile) return;

      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = '<span>Processing Vision Model...</span>';
      document.getElementById('scanBeam').style.display = 'block';

      const fd = new FormData();
      fd.append('image', activeFile, 'specimen.jpg');

      try {
        const token = localStorage.getItem('plantcare_token');
        const headers = {};
        if (token) headers['Authorization'] = 'Bearer ' + token;

        const res = await fetch('/scan', { method: 'POST', headers, body: fd });
        const data = await res.json();
        lastScanData = data;
        renderScanResult(data);
      } catch (err) {
        alert('Diagnostic network error: ' + err.message);
      } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg><span>Analyze Plant Health</span>';
        document.getElementById('scanBeam').style.display = 'none';
      }
    }

    function renderScanResult(d) {
      document.getElementById('emptyState').style.display = 'none';
      const content = document.getElementById('resultContent');
      content.style.display = 'block';

      document.getElementById('resSpecies').textContent = d.plant_name || 'Specimen';
      document.getElementById('resScientific').textContent = d.scientific_name || 'Plantae';
      document.getElementById('resScore').textContent = d.health_score || 80;

      const badge = document.getElementById('resBadge');
      const st = d.health_status || 'healthy';
      badge.textContent = st.replace('_', ' ').toUpperCase();
      badge.className = 'badge-status status-' + st;

      document.getElementById('resSummary').textContent = d.summary || d.ai_explanation || 'Diagnostic completed.';
      document.getElementById('resWater').textContent = (d.water && d.water.recommendation) || d.water_requirement || 'Balanced Hydration';
      document.getElementById('resLight').textContent = (d.light && d.light.recommendation) || d.light_requirement || 'Bright Indirect';

      const recs = document.getElementById('resRecs');
      recs.innerHTML = '';
      (d.care_recommendations || ['Maintain standard schedule']).forEach(r => {
        const row = document.createElement('div');
        row.className = 'rec-item';
        row.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>' + r + '</span>';
        recs.appendChild(row);
      });
    }

    function addCurrentToGarden() {
      if (!lastScanData) return;
      garden.unshift({
        id: Date.now(),
        name: lastScanData.plant_name,
        type: lastScanData.scientific_name || 'Houseplant',
        status: lastScanData.health_status,
        location: 'Indoor'
      });
      renderGarden();
      switchView('garden');
    }

    function renderGarden() {
      const grid = document.getElementById('plantGrid');
      const badge = document.getElementById('gardenBadge');
      if (badge) badge.textContent = garden.length;
      if (!grid) return;

      grid.innerHTML = garden.map(p => \`
        <div class="plant-item">
          <div class="plant-item-top">
            <span class="badge-status status-\${p.status}">\${p.status.replace('_', ' ')}</span>
          </div>
          <h3>\${p.name}</h3>
          <p>\${p.type} • \${p.location}</p>
        </div>
      \`).join('');
    }

    function refreshSensors() {
      document.getElementById('sMoisture').textContent = (64 + Math.floor(Math.random() * 8)) + '%';
      document.getElementById('sTemp').textContent = (23 + (Math.random() * 2)).toFixed(1) + '°C';
      document.getElementById('sLight').textContent = (800 + Math.floor(Math.random() * 100)) + ' Lux';
      document.getElementById('sHumidity').textContent = (54 + Math.floor(Math.random() * 6)) + '%';
    }

    // Modal Handlers
    function openAuthModal() { document.getElementById('authModal').style.display = 'flex'; }
    function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }
    function toggleAuth() {
      authMode = authMode === 'login' ? 'register' : 'login';
      document.getElementById('authTitle').textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
      document.getElementById('nameWrap').style.display = authMode === 'login' ? 'none' : 'block';
      document.getElementById('aBtn').textContent = authMode === 'login' ? 'Continue' : 'Register';
      document.getElementById('authToggleHint').textContent = authMode === 'login' ? "Don't have an account?" : 'Already registered?';
    }

    async function handleAuth(e) {
      e.preventDefault();
      const email = document.getElementById('aEmail').value;
      const password = document.getElementById('aPass').value;
      const fullName = document.getElementById('aName').value || 'User';

      const url = authMode === 'login' ? '/auth/login' : '/auth/register';
      const body = authMode === 'login' ? { email, password } : { full_name: fullName, email, password };

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        if (res.ok && data.access_token) {
          localStorage.setItem('plantcare_token', data.access_token);
          document.getElementById('authBtn').textContent = data.user?.full_name || 'Account';
          closeAuthModal();
        } else {
          alert(data.detail || 'Authentication error');
        }
      } catch (err) {
        alert('Network request failed');
      }
    }

    function openAddModal() { document.getElementById('addModal').style.display = 'flex'; }
    function closeAddModal() { document.getElementById('addModal').style.display = 'none'; }
    function handleAdd(e) {
      e.preventDefault();
      garden.unshift({
        id: Date.now(),
        name: document.getElementById('pName').value,
        type: document.getElementById('pType').value || 'Houseplant',
        status: 'healthy',
        location: document.getElementById('pLoc').value || 'Home'
      });
      renderGarden();
      closeAddModal();
    }

    async function testPing(path) {
      const res = await fetch(path);
      const data = await res.json();
      alert('Diagnostic Response:\\n' + JSON.stringify(data, null, 2));
    }

    renderGarden();
  </script>
</body>
</html>`;
}

module.exports = { renderDashboardHtml };
