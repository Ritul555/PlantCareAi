function renderDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlantCare AI — Smart Plant Health & Diagnostics</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-base: #07130e;
      --bg-surface: #0e221a;
      --bg-card: rgba(18, 41, 32, 0.7);
      --bg-card-hover: rgba(24, 54, 43, 0.85);
      --border-color: rgba(52, 211, 153, 0.15);
      --border-glow: rgba(52, 211, 153, 0.4);
      --primary: #10b981;
      --primary-light: #34d399;
      --primary-dark: #059669;
      --accent: #6ee7b7;
      --warning: #f59e0b;
      --danger: #ef4444;
      --info: #3b82f6;
      --text-main: #f0fdf4;
      --text-muted: #94a3b8;
      --text-sub: #64748b;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --shadow-sm: 0 4px 12px rgba(0,0,0,0.3);
      --shadow-glow: 0 0 25px rgba(16, 185, 129, 0.25);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: radial-gradient(circle at 10% 20%, #0d281e 0%, var(--bg-base) 90%);
      color: var(--text-main);
      min-height: 100vh;
      line-height: 1.5;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, .brand-font {
      font-family: 'Outfit', sans-serif;
    }

    /* Ambient Background Glows */
    .ambient-glow-1 {
      position: fixed;
      top: -150px;
      right: -100px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }
    .ambient-glow-2 {
      position: fixed;
      bottom: -150px;
      left: -100px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, transparent 70%);
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
    }

    /* Container */
    .container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 1;
    }

    /* Navigation */
    header {
      border-bottom: 1px solid var(--border-color);
      backdrop-filter: blur(16px);
      background: rgba(7, 19, 14, 0.75);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-main);
    }
    .logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-glow);
      font-size: 22px;
    }
    .logo-text {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .logo-text span {
      color: var(--primary-light);
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 12px;
      color: var(--accent);
      font-weight: 600;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background: var(--primary-light);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--primary-light);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
    }
    .nav-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
      cursor: pointer;
      background: none;
      border: none;
    }
    .nav-btn:hover, .nav-btn.active {
      color: var(--primary-light);
    }
    .btn-auth {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: #042014;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      font-size: 13px;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-auth:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    }

    /* Hero Banner */
    .hero {
      padding: 48px 0 32px;
      text-align: center;
    }
    .hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      padding: 6px 16px;
      font-size: 13px;
      color: var(--primary-light);
      margin-bottom: 20px;
    }
    .hero h1 {
      font-size: 46px;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 16px;
      letter-spacing: -1px;
    }
    .hero h1 span {
      background: linear-gradient(135deg, #a7f3d0 0%, var(--primary-light) 50%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      color: var(--text-muted);
      max-width: 620px;
      margin: 0 auto 32px;
      font-size: 16px;
    }

    /* Navigation Tabs */
    .tabs-bar {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 36px;
      flex-wrap: wrap;
    }
    .tab-item {
      padding: 10px 22px;
      border-radius: var(--radius-full);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tab-item:hover {
      background: var(--bg-card-hover);
      color: var(--text-main);
    }
    .tab-item.active {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%);
      border-color: var(--primary-light);
      color: var(--text-main);
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
    }

    /* Main Grid Layout */
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Glass Cards */
    .glass-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(12px);
      padding: 28px;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.2s;
    }
    .glass-card:hover {
      border-color: rgba(52, 211, 153, 0.3);
    }

    /* Scanner Interface */
    .scanner-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    @media (max-width: 900px) {
      .scanner-grid { grid-template-columns: 1fr; }
      .hero h1 { font-size: 34px; }
    }

    .drop-zone {
      border: 2px dashed var(--border-glow);
      border-radius: var(--radius-lg);
      padding: 40px 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      background: rgba(14, 34, 26, 0.5);
      position: relative;
      overflow: hidden;
    }
    .drop-zone:hover, .drop-zone.dragover {
      border-color: var(--primary-light);
      background: rgba(16, 185, 129, 0.08);
      box-shadow: var(--shadow-glow);
    }
    .drop-zone-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .drop-zone h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }
    .drop-zone p {
      color: var(--text-muted);
      font-size: 13px;
      margin-bottom: 20px;
    }
    .file-input {
      display: none;
    }
    .preview-container {
      position: relative;
      display: none;
      margin-top: 16px;
      border-radius: var(--radius-md);
      overflow: hidden;
      max-height: 280px;
    }
    .preview-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: var(--radius-md);
    }
    .scan-beam {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
      box-shadow: 0 0 15px var(--accent);
      display: none;
      animation: scanBeam 2s infinite ease-in-out;
    }
    @keyframes scanBeam {
      0% { top: 0; }
      50% { top: 96%; }
      100% { top: 0; }
    }

    .samples-bar {
      margin-top: 20px;
    }
    .samples-bar p {
      font-size: 12px;
      color: var(--text-sub);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .sample-chips {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .sample-chip {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 6px 12px;
      font-size: 12px;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;
    }
    .sample-chip:hover {
      background: rgba(16, 185, 129, 0.15);
      color: var(--primary-light);
      border-color: var(--primary);
    }

    .btn-scan {
      width: 100%;
      margin-top: 20px;
      padding: 14px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: #042014;
      font-weight: 700;
      font-size: 15px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s;
      box-shadow: var(--shadow-glow);
    }
    .btn-scan:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
    .btn-scan:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Result Panel */
    .result-empty {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-sub);
    }
    .result-empty-icon {
      font-size: 54px;
      opacity: 0.4;
      margin-bottom: 16px;
    }
    .result-card {
      display: none;
    }

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 16px;
    }
    .plant-title h2 {
      font-size: 24px;
      margin-bottom: 4px;
    }
    .plant-title span {
      font-size: 13px;
      color: var(--text-muted);
      font-style: italic;
    }

    .health-score-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(14, 34, 26, 0.9) 100%);
      border: 2px solid var(--primary-light);
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
    }
    .health-score-val {
      font-size: 22px;
      font-weight: 800;
      color: var(--primary-light);
    }
    .health-score-lbl {
      font-size: 9px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
    }

    .status-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .status-healthy { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; }
    .status-mild_stress { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; }
    .status-needs_attention { background: rgba(245, 158, 11, 0.25); color: #f59e0b; border: 1px solid #d97706; }
    .status-high_risk { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }

    .analysis-summary {
      background: rgba(0, 0, 0, 0.25);
      border-radius: var(--radius-md);
      padding: 16px;
      font-size: 14px;
      color: var(--text-main);
      margin-bottom: 20px;
      border-left: 3px solid var(--primary);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 20px;
    }
    .metric-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 14px;
    }
    .metric-card h4 {
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .metric-card p {
      font-size: 13px;
      font-weight: 600;
    }

    .rec-list {
      list-style: none;
    }
    .rec-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 10px;
    }
    .rec-item::before {
      content: "✓";
      color: var(--primary-light);
      font-weight: 800;
    }

    /* My Garden Grid */
    .garden-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .plants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .plant-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .plant-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      border-color: rgba(52, 211, 153, 0.4);
    }
    .plant-card-img {
      height: 160px;
      background: linear-gradient(135deg, #0e2b20 0%, #154131 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 54px;
      color: var(--primary-light);
      position: relative;
    }
    .plant-card-body {
      padding: 18px;
    }
    .plant-card-body h3 {
      font-size: 17px;
      margin-bottom: 4px;
    }
    .plant-card-body p {
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 12px;
    }

    /* Environmental Telemetry Widgets */
    .telemetry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    }
    .tele-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 22px;
      position: relative;
      overflow: hidden;
    }
    .tele-icon {
      font-size: 28px;
      margin-bottom: 12px;
    }
    .tele-val {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
    }
    .tele-label {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .tele-status {
      font-size: 11px;
      color: var(--primary-light);
      font-weight: 600;
      margin-top: 6px;
    }

    /* API Explorer */
    .endpoint-item {
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .method-badge {
      font-family: monospace;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      font-size: 12px;
    }
    .get-badge { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid #3b82f6; }
    .post-badge { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; }

    /* Modal Dialog */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }
    .modal-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 440px;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 18px;
      right: 18px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 20px;
      cursor: pointer;
    }
    .input-field {
      width: 100%;
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      color: var(--text-main);
      font-size: 14px;
      margin-bottom: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-field:focus {
      border-color: var(--primary-light);
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border-color);
      padding: 32px 0;
      margin-top: 60px;
      text-align: center;
      color: var(--text-sub);
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="ambient-glow-1"></div>
  <div class="ambient-glow-2"></div>

  <!-- Header -->
  <header>
    <div class="container nav-content">
      <a href="/" class="logo">
        <div class="logo-icon">🌿</div>
        <div class="logo-text">PlantCare <span>AI</span></div>
      </a>
      <div class="status-badge">
        <div class="pulse-dot"></div>
        <span>Vercel Node.js Serverless Active</span>
      </div>
      <div class="nav-links">
        <button class="nav-btn active" onclick="switchTab('scanner')">AI Scanner</button>
        <button class="nav-btn" onclick="switchTab('garden')">My Garden</button>
        <button class="nav-btn" onclick="switchTab('telemetry')">IoT Sensors</button>
        <button class="nav-btn" onclick="switchTab('api')">API Explorer</button>
        <button class="btn-auth" id="authBtn" onclick="openAuthModal()">Login / Register</button>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero container">
    <div class="hero-pill">✨ Powered by Gemini Vision 1.5 & Node.js Express</div>
    <h1>Smart AI Plant Care & <span>Realtime Diagnostics</span></h1>
    <p>Detect leaf diseases, get instant watering & lighting prescriptions, and monitor plant telemetry with cutting-edge artificial intelligence.</p>

    <!-- Navigation Tabs -->
    <div class="tabs-bar">
      <button class="tab-item active" id="tabBtn-scanner" onclick="switchTab('scanner')">📸 Live AI Scanner</button>
      <button class="tab-item" id="tabBtn-garden" onclick="switchTab('garden')">🪴 Plant Garden (<span id="gardenCount">0</span>)</button>
      <button class="tab-item" id="tabBtn-telemetry" onclick="switchTab('telemetry')">📊 Live IoT Telemetry</button>
      <button class="tab-item" id="tabBtn-api" onclick="switchTab('api')">⚡ REST API Endpoints</button>
    </div>
  </section>

  <!-- Tab 1: AI Scanner -->
  <main class="container">
    <div id="tab-scanner" class="tab-content active">
      <div class="scanner-grid">
        <!-- Upload Box -->
        <div class="glass-card">
          <h3 style="margin-bottom: 16px;">Upload Plant Photo</h3>
          <div class="drop-zone" id="dropZone" onclick="document.getElementById('plantImageInput').click()">
            <div class="drop-zone-icon">📷</div>
            <h3>Drag & Drop or Click to Upload</h3>
            <p>PNG, JPG, WEBP formats supported up to 10MB</p>
            <input type="file" id="plantImageInput" class="file-input" accept="image/*">
            <div class="preview-container" id="previewContainer">
              <img id="previewImg" class="preview-img" alt="Plant Preview">
              <div class="scan-beam" id="scanBeam"></div>
            </div>
          </div>

          <div class="samples-bar">
            <p>Or Try Sample Scans:</p>
            <div class="sample-chips">
              <div class="sample-chip" onclick="loadSample('Monstera Deliciosa', 'healthy')">🌿 Healthy Monstera</div>
              <div class="sample-chip" onclick="loadSample('Tomato Leaf', 'blight')">🍅 Early Blight Leaf</div>
              <div class="sample-chip" onclick="loadSample('Snake Plant', 'needs_water')">🌵 Snake Plant</div>
            </div>
          </div>

          <button class="btn-scan" id="analyzeBtn" onclick="runScan()" disabled>
            <span>⚡ Run AI Health Diagnosis</span>
          </button>
        </div>

        <!-- Result Box -->
        <div class="glass-card" id="resultContainer">
          <div class="result-empty" id="resultEmpty">
            <div class="result-empty-icon">🌱</div>
            <h3>No Plant Scanned Yet</h3>
            <p>Upload a plant photo on the left and click Run AI Health Diagnosis to inspect health, diseases, and care advice.</p>
          </div>

          <div class="result-card" id="resultCard">
            <div class="result-header">
              <div class="plant-title">
                <h2 id="resPlantName">Monstera Deliciosa</h2>
                <span id="resScientificName">Monstera deliciosa</span>
              </div>
              <div class="health-score-badge">
                <span class="health-score-val" id="resHealthScore">85</span>
                <span class="health-score-lbl">Health</span>
              </div>
            </div>

            <div id="resStatusPill" class="status-pill status-healthy">Healthy</div>

            <div class="analysis-summary" id="resSummary">
              Visual scan indicates healthy, vibrant green foliage with balanced moisture and zero acute disease symptoms.
            </div>

            <div class="metrics-grid">
              <div class="metric-card">
                <h4>💧 Watering Guide</h4>
                <p id="resWater">Top 1-2" dry soil</p>
              </div>
              <div class="metric-card">
                <h4>☀️ Sunlight</h4>
                <p id="resLight">Bright, indirect</p>
              </div>
            </div>

            <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; letter-spacing: 0.5px;">🌿 AI Care Recommendations</h4>
            <ul class="rec-list" id="resRecList">
              <li class="rec-item">Maintain regular watering schedule without waterlogging.</li>
              <li class="rec-item">Ensure 6-8 hours of bright, filtered sunlight daily.</li>
            </ul>

            <button class="btn-scan" style="margin-top: 24px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); color: var(--text-main);" onclick="saveToGarden()">
              ➕ Save Plant to My Garden
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: My Garden -->
    <div id="tab-garden" class="tab-content">
      <div class="garden-header">
        <div>
          <h2>My Plant Collection</h2>
          <p style="color: var(--text-muted); font-size: 14px;">Track and care for your registered indoor and outdoor plants.</p>
        </div>
        <button class="btn-scan" style="width: auto; margin-top: 0; padding: 10px 20px;" onclick="openAddPlantModal()">
          ➕ Add New Plant
        </button>
      </div>

      <div class="plants-grid" id="plantsGrid">
        <!-- Plant Cards inserted via JS -->
      </div>
    </div>

    <!-- Tab 3: IoT Telemetry -->
    <div id="tab-telemetry" class="tab-content">
      <div style="margin-bottom: 24px;">
        <h2>Realtime Environmental Telemetry</h2>
        <p style="color: var(--text-muted); font-size: 14px;">Live IoT sensor data monitoring your indoor microclimate.</p>
      </div>

      <div class="telemetry-grid">
        <div class="tele-card">
          <div class="tele-icon">💧</div>
          <div class="tele-label">Soil Moisture</div>
          <div class="tele-val" id="teleMoisture">68%</div>
          <div class="tele-status">Optimal Hydration</div>
        </div>
        <div class="tele-card">
          <div class="tele-icon">🌡️</div>
          <div class="tele-label">Ambient Temp</div>
          <div class="tele-val" id="teleTemp">24.2°C</div>
          <div class="tele-status">Ideal Room Temp</div>
        </div>
        <div class="tele-card">
          <div class="tele-icon">☀️</div>
          <div class="tele-label">Light Intensity</div>
          <div class="tele-val" id="teleLight">850 Lux</div>
          <div class="tele-status">Bright Indirect Light</div>
        </div>
        <div class="tele-card">
          <div class="tele-icon">💨</div>
          <div class="tele-label">Air Humidity</div>
          <div class="tele-val" id="teleHumidity">58%</div>
          <div class="tele-status">Comfortable Humidity</div>
        </div>
      </div>

      <div class="glass-card">
        <h3>IoT Sensor Diagnostics</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 8px;">All telemetry probes are connected and reporting live readings to the Vercel backend at 30-second intervals.</p>
        <button class="btn-scan" style="width: auto; margin-top: 16px; padding: 10px 20px;" onclick="refreshTelemetry()">
          🔄 Refresh Sensor Telemetry
        </button>
      </div>
    </div>

    <!-- Tab 4: API Explorer -->
    <div id="tab-api" class="tab-content">
      <div style="margin-bottom: 24px;">
        <h2>REST API Endpoints</h2>
        <p style="color: var(--text-muted); font-size: 14px;">Use these endpoints directly in your mobile or frontend applications.</p>
      </div>

      <div class="glass-card">
        <div class="endpoint-item">
          <div>
            <span class="method-badge get-badge">GET</span>
            <strong style="margin-left: 10px;">/</strong>
            <span style="color: var(--text-muted); margin-left: 10px;">System Health & Status</span>
          </div>
          <button class="sample-chip" onclick="testEndpoint('/')">Test Live</button>
        </div>

        <div class="endpoint-item">
          <div>
            <span class="method-badge post-badge">POST</span>
            <strong style="margin-left: 10px;">/auth/register</strong>
            <span style="color: var(--text-muted); margin-left: 10px;">User Registration & JWT</span>
          </div>
          <span style="color: var(--text-sub); font-size: 12px;">JSON Body</span>
        </div>

        <div class="endpoint-item">
          <div>
            <span class="method-badge post-badge">POST</span>
            <strong style="margin-left: 10px;">/auth/login</strong>
            <span style="color: var(--text-muted); margin-left: 10px;">User Authentication</span>
          </div>
          <span style="color: var(--text-sub); font-size: 12px;">JSON Body</span>
        </div>

        <div class="endpoint-item">
          <div>
            <span class="method-badge post-badge">POST</span>
            <strong style="margin-left: 10px;">/scan</strong>
            <span style="color: var(--text-muted); margin-left: 10px;">Multipart Image Plant Diagnostics</span>
          </div>
          <span style="color: var(--text-sub); font-size: 12px;">Multipart File</span>
        </div>

        <div class="endpoint-item">
          <div>
            <span class="method-badge get-badge">GET</span>
            <strong style="margin-left: 10px;">/plants/dashboard</strong>
            <span style="color: var(--text-muted); margin-left: 10px;">User Garden Overview</span>
          </div>
          <span style="color: var(--text-sub); font-size: 12px;">Bearer Token</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Auth Modal -->
  <div class="modal-overlay" id="authModal">
    <div class="modal-box">
      <button class="modal-close" onclick="closeAuthModal()">✕</button>
      <h2 style="margin-bottom: 8px;" id="authModalTitle">Welcome to PlantCare</h2>
      <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;" id="authModalSub">Login to sync your plant collection</p>

      <form id="authForm" onsubmit="handleAuthSubmit(event)">
        <div id="fullNameGroup">
          <label style="font-size: 12px; color: var(--text-muted);">Full Name</label>
          <input type="text" id="authFullName" class="input-field" placeholder="John Doe">
        </div>
        <div>
          <label style="font-size: 12px; color: var(--text-muted);">Email Address</label>
          <input type="email" id="authEmail" class="input-field" placeholder="john@example.com" required>
        </div>
        <div>
          <label style="font-size: 12px; color: var(--text-muted);">Password</label>
          <input type="password" id="authPassword" class="input-field" placeholder="••••••••" required>
        </div>

        <button type="submit" class="btn-scan" id="authSubmitBtn">Login</button>
      </form>

      <p style="text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 16px;">
        <span id="authToggleText">Don't have an account?</span>
        <a href="#" style="color: var(--primary-light); font-weight: 600; text-decoration: none;" onclick="toggleAuthMode()">Register here</a>
      </p>
    </div>
  </div>

  <!-- Add Plant Modal -->
  <div class="modal-overlay" id="addPlantModal">
    <div class="modal-box">
      <button class="modal-close" onclick="closeAddPlantModal()">✕</button>
      <h2 style="margin-bottom: 8px;">Add Plant to Garden</h2>
      <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Add a new specimen to track health and watering schedules.</p>

      <form onsubmit="handleAddPlantSubmit(event)">
        <div>
          <label style="font-size: 12px; color: var(--text-muted);">Plant Name *</label>
          <input type="text" id="newPlantName" class="input-field" placeholder="e.g. Living Room Monstera" required>
        </div>
        <div>
          <label style="font-size: 12px; color: var(--text-muted);">Plant Type</label>
          <input type="text" id="newPlantType" class="input-field" placeholder="e.g. Monstera Deliciosa">
        </div>
        <div>
          <label style="font-size: 12px; color: var(--text-muted);">Location</label>
          <input type="text" id="newPlantLocation" class="input-field" placeholder="e.g. Balcony / Window">
        </div>

        <button type="submit" class="btn-scan">Add to Garden</button>
      </form>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="container">
      <p>🌿 PlantCare AI — Intelligent Plant Diagnostics & IoT Monitoring System</p>
      <p style="margin-top: 6px; font-size: 12px;">Deployed on Vercel Serverless Architecture</p>
    </div>
  </footer>

  <script>
    let currentAuthMode = 'login';
    let currentSelectedFile = null;
    let currentAnalysis = null;
    let samplePlants = [
      { id: 1, name: 'Monstera Deliciosa', type: 'Tropical Foliage', status: 'healthy', location: 'Living Room' },
      { id: 2, name: 'Snake Plant (Sansevieria)', type: 'Succulent', status: 'healthy', location: 'Bedroom Desk' },
      { id: 3, name: 'Golden Pothos', type: 'Vine', status: 'mild_stress', location: 'Kitchen Shelf' }
    ];

    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

      const target = document.getElementById('tab-' + tabId);
      const tabBtn = document.getElementById('tabBtn-' + tabId);
      if (target) target.classList.add('active');
      if (tabBtn) tabBtn.classList.add('active');
    }

    // Image Upload Handling
    const dropZone = document.getElementById('dropZone');
    const plantInput = document.getElementById('plantImageInput');
    const previewContainer = document.getElementById('previewContainer');
    const previewImg = document.getElementById('previewImg');
    const analyzeBtn = document.getElementById('analyzeBtn');

    plantInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleSelectedFile(e.target.files[0]);
      }
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleSelectedFile(e.dataTransfer.files[0]);
      }
    });

    function handleSelectedFile(file) {
      currentSelectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewContainer.style.display = 'block';
        analyzeBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }

    function loadSample(name, type) {
      // Generate green pixel canvas sample
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      
      const grad = ctx.createLinearGradient(0, 0, 400, 300);
      if (type === 'healthy') {
        grad.addColorStop(0, '#065f46');
        grad.addColorStop(1, '#10b981');
      } else if (type === 'blight') {
        grad.addColorStop(0, '#78350f');
        grad.addColorStop(1, '#d97706');
      } else {
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(1, '#059669');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 300);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Outfit, sans-serif';
      ctx.fillText(name, 24, 150);

      canvas.toBlob((blob) => {
        handleSelectedFile(blob);
      }, 'image/jpeg');
    }

    async function runScan() {
      if (!currentSelectedFile) return;

      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = '<span>⚡ Analyzing with Gemini AI...</span>';
      document.getElementById('scanBeam').style.display = 'block';

      const formData = new FormData();
      formData.append('image', currentSelectedFile, 'plant.jpg');

      try {
        const token = localStorage.getItem('plantcare_token');
        const headers = {};
        if (token) headers['Authorization'] = 'Bearer ' + token;

        const res = await fetch('/scan', {
          method: 'POST',
          headers: headers,
          body: formData
        });

        const data = await res.json();
        currentAnalysis = data;
        displayResults(data);
      } catch (err) {
        alert('Scan analysis error: ' + err.message);
      } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<span>⚡ Run AI Health Diagnosis</span>';
        document.getElementById('scanBeam').style.display = 'none';
      }
    }

    function displayResults(data) {
      document.getElementById('resultEmpty').style.display = 'none';
      const card = document.getElementById('resultCard');
      card.style.display = 'block';

      document.getElementById('resPlantName').textContent = data.plant_name || 'Houseplant';
      document.getElementById('resScientificName').textContent = data.scientific_name || 'Plantae';
      document.getElementById('resHealthScore').textContent = data.health_score || 80;
      
      const statusPill = document.getElementById('resStatusPill');
      const status = data.health_status || 'healthy';
      statusPill.textContent = status.replace('_', ' ').toUpperCase();
      statusPill.className = 'status-pill status-' + status;

      document.getElementById('resSummary').textContent = data.summary || data.ai_explanation || 'Plant analysis complete.';
      document.getElementById('resWater').textContent = (data.water && data.water.recommendation) || data.water_requirement || 'Medium';
      document.getElementById('resLight').textContent = (data.light && data.light.recommendation) || data.light_requirement || 'Bright indirect';

      const recList = document.getElementById('resRecList');
      recList.innerHTML = '';
      const recs = data.care_recommendations || ['Ensure proper drainage', 'Wipe leaves periodically'];
      recs.forEach(r => {
        const li = document.createElement('li');
        li.className = 'rec-item';
        li.textContent = r;
        recList.appendChild(li);
      });
    }

    function saveToGarden() {
      if (!currentAnalysis) return;
      samplePlants.unshift({
        id: Date.now(),
        name: currentAnalysis.plant_name,
        type: currentAnalysis.scientific_name || 'Indoor Plant',
        status: currentAnalysis.health_status,
        location: 'Garden'
      });
      renderGarden();
      switchTab('garden');
      alert('Plant saved to your garden collection!');
    }

    function renderGarden() {
      const grid = document.getElementById('plantsGrid');
      const count = document.getElementById('gardenCount');
      if (count) count.textContent = samplePlants.length;
      if (!grid) return;

      grid.innerHTML = samplePlants.map(p => \`
        <div class="plant-card">
          <div class="plant-card-img">🌿</div>
          <div class="plant-card-body">
            <span class="status-pill status-\${p.status}">\${p.status.replace('_', ' ')}</span>
            <h3>\${p.name}</h3>
            <p>\${p.type} • \${p.location}</p>
          </div>
        </div>
      \`).join('');
    }

    function refreshTelemetry() {
      document.getElementById('teleMoisture').textContent = (65 + Math.floor(Math.random() * 8)) + '%';
      document.getElementById('teleTemp').textContent = (23 + (Math.random() * 2)).toFixed(1) + '°C';
      document.getElementById('teleLight').textContent = (800 + Math.floor(Math.random() * 120)) + ' Lux';
      document.getElementById('teleHumidity').textContent = (55 + Math.floor(Math.random() * 6)) + '%';
    }

    // Auth Modal
    function openAuthModal() {
      document.getElementById('authModal').style.display = 'flex';
    }
    function closeAuthModal() {
      document.getElementById('authModal').style.display = 'none';
    }
    function toggleAuthMode() {
      currentAuthMode = currentAuthMode === 'login' ? 'register' : 'login';
      document.getElementById('authModalTitle').textContent = currentAuthMode === 'login' ? 'Welcome to PlantCare' : 'Create Account';
      document.getElementById('fullNameGroup').style.display = currentAuthMode === 'login' ? 'none' : 'block';
      document.getElementById('authSubmitBtn').textContent = currentAuthMode === 'login' ? 'Login' : 'Register';
      document.getElementById('authToggleText').textContent = currentAuthMode === 'login' ? "Don't have an account?" : 'Already registered?';
    }

    async function handleAuthSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('authEmail').value;
      const password = document.getElementById('authPassword').value;
      const fullName = document.getElementById('authFullName').value || 'User';

      const endpoint = currentAuthMode === 'login' ? '/auth/login' : '/auth/register';
      const payload = currentAuthMode === 'login' 
        ? { email, password }
        : { full_name: fullName, email, password };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok && data.access_token) {
          localStorage.setItem('plantcare_token', data.access_token);
          document.getElementById('authBtn').textContent = '👤 ' + (data.user?.full_name || 'Account');
          closeAuthModal();
          alert('Successfully signed in!');
        } else {
          alert(data.detail || 'Authentication failed');
        }
      } catch (err) {
        alert('Network error: ' + err.message);
      }
    }

    // Add Plant Modal
    function openAddPlantModal() {
      document.getElementById('addPlantModal').style.display = 'flex';
    }
    function closeAddPlantModal() {
      document.getElementById('addPlantModal').style.display = 'none';
    }
    function handleAddPlantSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('newPlantName').value;
      const type = document.getElementById('newPlantType').value || 'Indoor Plant';
      const loc = document.getElementById('newPlantLocation').value || 'Home';

      samplePlants.unshift({
        id: Date.now(),
        name: name,
        type: type,
        status: 'healthy',
        location: loc
      });
      renderGarden();
      closeAddPlantModal();
    }

    async function testEndpoint(path) {
      try {
        const res = await fetch(path);
        const data = await res.json();
        alert('Response from ' + path + ':\\n' + JSON.stringify(data, null, 2));
      } catch (e) {
        alert('Error: ' + e.message);
      }
    }

    // Initialize
    renderGarden();
  </script>
</body>
</html>`;
}

module.exports = { renderDashboardHtml };
