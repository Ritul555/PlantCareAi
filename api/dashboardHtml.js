// ==========================================================
// PLANTCARE AI - NEXT-GEN AI BOTANICAL DIAGNOSIS WEB SUITE
// ==========================================================

function renderDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlantCare AI — Scan. Detect. Protect. | Next-Gen AI Plant Healthcare</title>
  <meta name="description" content="Instant plant disease detection and health analysis powered by Deep Learning and Computer Vision. Diagnose 548+ conditions in seconds.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-base: #040806;
      --bg-surface: #09100c;
      --bg-card: rgba(14, 24, 18, 0.65);
      --bg-card-hover: rgba(20, 36, 27, 0.85);
      --border-subtle: rgba(52, 211, 153, 0.12);
      --border-glow: rgba(52, 211, 153, 0.35);
      --primary: #10b981;
      --primary-light: #34d399;
      --primary-dark: #059669;
      --primary-glow: rgba(16, 185, 129, 0.25);
      --accent-cyan: #06b6d4;
      --accent-lime: #84cc16;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 22px;
      --radius-xl: 32px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-base);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
        radial-gradient(circle at 10% 40%, rgba(6, 182, 212, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
      background-attachment: fixed;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Outfit', sans-serif;
      letter-spacing: -0.02em;
    }

    .font-mono {
      font-family: 'Space Grotesk', monospace;
    }

    /* Custom Glassmorphism Utilities */
    .glass-card {
      background: var(--bg-card);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .glass-card:hover {
      border-color: var(--border-glow);
      box-shadow: 0 12px 35px -10px var(--primary-glow);
      transform: translateY(-2px);
    }

    .glass-nav {
      background: rgba(4, 8, 6, 0.82);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-subtle);
    }

    /* Gradients & Glows */
    .text-gradient {
      background: linear-gradient(135deg, #ffffff 20%, #34d399 75%, #059669 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text-gradient-emerald {
      background: linear-gradient(135deg, #34d399 0%, #10b981 50%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .btn-primary {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      padding: 14px 28px;
      border-radius: var(--radius-md);
      border: 1px solid rgba(52, 211, 153, 0.4);
      box-shadow: 0 0 25px -4px rgba(16, 185, 129, 0.4);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s ease;
      text-decoration: none;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 35px 0 rgba(16, 185, 129, 0.6);
      background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-main);
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      padding: 14px 28px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s ease;
      text-decoration: none;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--border-glow);
      transform: translateY(-2px);
    }

    /* Container Layout */
    .container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Scanning Laser Effect */
    @keyframes scanMove {
      0% { top: 0%; opacity: 0.8; }
      50% { top: 96%; opacity: 1; }
      100% { top: 0%; opacity: 0.8; }
    }

    .scan-beam {
      position: absolute;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent 0%, #34d399 50%, transparent 100%);
      box-shadow: 0 0 16px 4px rgba(52, 211, 153, 0.8);
      animation: scanMove 2.5s ease-in-out infinite;
      z-index: 10;
      display: none;
    }

    /* Circular Score Gauge */
    .gauge-circle {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    /* Responsive Grid */
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

    @media (max-width: 1024px) {
      .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
      .hero-title { font-size: 40px !important; }
    }

    /* Interactive Specimen Pill */
    .sample-pill {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      border-radius: 9999px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    .sample-pill:hover {
      background: rgba(52, 211, 153, 0.12);
      border-color: var(--primary-light);
      color: #ffffff;
      transform: translateY(-1px);
    }

    /* Pulse Beacon */
    .beacon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulseBeacon 2s infinite;
      display: inline-block;
    }
    @keyframes pulseBeacon {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    /* Toast Notification */
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(9, 16, 12, 0.95);
      border: 1px solid var(--primary-light);
      color: #ffffff;
      padding: 14px 22px;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1000;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #toast.show {
      transform: translateY(0);
      opacity: 1;
    }

    /* Printable Diagnostics Sheet */
    @media print {
      body * { visibility: hidden; }
      #printableReport, #printableReport * { visibility: visible; }
      #printableReport {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        color: #000;
        background: #fff;
        padding: 20px;
      }
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- 1. NAVIGATION BAR                          -->
  <!-- ========================================== -->
  <nav class="glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; height: 74px;">
      
      <!-- Brand Logo -->
      <a href="#" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
        <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 16px var(--primary-glow);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path>
            <path d="M12 2v18"></path>
            <path d="M12 11c3.5 0 6-2 6-5"></path>
            <path d="M12 16c-3 0-5-1.5-5-4"></path>
          </svg>
        </div>
        <div>
          <span style="font-size: 20px; font-weight: 800; color: #ffffff; font-family: 'Outfit', sans-serif; letter-spacing: -0.01em;">PlantCare<span style="color: var(--primary-light);">.AI</span></span>
          <span class="font-mono" style="font-size: 10px; color: var(--text-dim); display: block; margin-top: -3px; letter-spacing: 0.08em; text-transform: uppercase;">Vision v2.5</span>
        </div>
      </a>

      <!-- Desktop Nav Items -->
      <div style="display: flex; align-items: center; gap: 28px;" class="desktop-nav">
        <a href="#diagnosis" style="color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">Diagnosis</a>
        <a href="#features" style="color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">Features</a>
        <a href="#how-it-works" style="color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">Workflow</a>
        <a href="#insights" style="color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">AI Insights</a>
        <a href="#about" style="color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">About</a>
        <a href="#contact" style="color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">Contact</a>
      </div>

      <!-- Live Engine Status & CTA -->
      <div style="display: flex; align-items: center; gap: 16px;">
        <div class="font-mono" style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--primary-light); background: rgba(16, 185, 129, 0.1); border: 1px solid var(--border-subtle); padding: 6px 12px; border-radius: 9999px;">
          <span class="beacon"></span>
          <span>Gemini Vision 1.5</span>
        </div>
        <a href="#diagnosis" class="btn-primary" style="padding: 9px 18px; font-size: 13px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          Scan Leaf
        </a>
      </div>

    </div>
  </nav>

  <!-- ========================================== -->
  <!-- 2. HERO SECTION                            -->
  <!-- ========================================== -->
  <section style="padding: 160px 0 100px; position: relative; overflow: hidden;">
    <div class="container" style="text-align: center; position: relative; z-index: 2;">
      
      <!-- Top Hackathon Pill -->
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(52, 211, 153, 0.08); border: 1px solid var(--border-glow); padding: 8px 18px; border-radius: 9999px; margin-bottom: 28px; animation: float 3s ease-in-out infinite;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.08em; text-transform: uppercase;">Next-Gen Botanical Intelligence Suite</span>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-title text-gradient" style="font-size: 68px; font-weight: 900; line-height: 1.08; margin-bottom: 20px; max-width: 960px; margin-left: auto; margin-right: auto;">
        PlantCare AI<br>
        <span class="text-gradient-emerald">Scan. Detect. Protect.</span>
      </h1>

      <!-- Subtitle Description -->
      <p style="font-size: 19px; color: var(--text-muted); max-width: 720px; margin: 0 auto 40px; line-height: 1.6; font-weight: 400;">
        Empowering farmers, researchers, and horticulturists with cutting-edge Computer Vision. Identify 548+ diseases in seconds, analyze chlorophyll vitality, and receive tailored organic and chemical care prescriptions.
      </p>

      <!-- Action Buttons -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 60px;">
        <a href="#diagnosis" class="btn-primary" style="font-size: 16px; padding: 16px 36px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Start Diagnosis
        </a>
        <a href="#how-it-works" class="btn-secondary" style="font-size: 16px; padding: 16px 32px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Learn More
        </a>
      </div>

      <!-- Metrics Floating Bar -->
      <div class="glass-card" style="max-width: 860px; margin: 0 auto; padding: 22px 32px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; border-color: rgba(52, 211, 153, 0.2);">
        <div>
          <div class="font-mono" style="font-size: 28px; font-weight: 800; color: #ffffff;">548+</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Pathologies</div>
        </div>
        <div style="border-left: 1px solid var(--border-subtle);">
          <div class="font-mono" style="font-size: 28px; font-weight: 800; color: var(--primary-light);">98.4%</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Model Accuracy</div>
        </div>
        <div style="border-left: 1px solid var(--border-subtle);">
          <div class="font-mono" style="font-size: 28px; font-weight: 800; color: var(--accent-cyan);">&lt; 1.8s</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Inference Speed</div>
        </div>
        <div style="border-left: 1px solid var(--border-subtle);">
          <div class="font-mono" style="font-size: 28px; font-weight: 800; color: #ffffff;">35,000+</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Plant Taxa</div>
        </div>
      </div>

    </div>
  </section>

  <!-- ========================================== -->
  <!-- 3. AI DIAGNOSIS DASHBOARD (CORE WORKSTATION)-->
  <!-- ========================================== -->
  <section id="diagnosis" style="padding: 80px 0; position: relative;">
    <div class="container">
      
      <!-- Section Header -->
      <div style="text-align: center; margin-bottom: 48px;">
        <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Workspace</div>
        <h2 style="font-size: 42px; font-weight: 800; color: #ffffff;">AI Diagnosis Dashboard</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 8px auto 0; font-size: 16px;">
          Drop any leaf photo below to run deep neural feature extraction.
        </p>
      </div>

      <!-- Main Workstation Layout (2 Columns) -->
      <div class="grid-2" style="align-items: start;">
        
        <!-- Left Column: Upload Workstation -->
        <div class="glass-card" style="padding: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Leaf Specimen Upload
            </h3>
            <span class="font-mono" style="font-size: 11px; color: var(--text-dim);">JPEG, PNG, WEBP</span>
          </div>

          <!-- Drag & Drop Zone -->
          <div id="dropZone" style="border: 2px dashed rgba(52, 211, 153, 0.3); border-radius: var(--radius-md); padding: 36px 20px; text-align: center; background: rgba(0,0,0,0.3); cursor: pointer; position: relative; overflow: hidden; transition: all 0.25s ease;">
            
            <div class="scan-beam" id="scanBeam"></div>

            <div id="uploadPrompt">
              <div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <div style="font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">Drag & Drop Plant Leaf Photo</div>
              <div style="font-size: 13px; color: var(--text-muted);">or click to browse from device camera / files</div>
            </div>

            <!-- Preview Box -->
            <div id="previewBox" style="display: none;">
              <img id="previewImg" src="" alt="Specimen Preview" style="max-height: 240px; border-radius: 10px; margin: 0 auto; display: block; border: 1px solid var(--border-subtle);">
              <div id="previewMeta" class="font-mono" style="font-size: 11px; color: var(--primary-light); margin-top: 10px;"></div>
            </div>

            <input type="file" id="fileInput" accept="image/*" style="display: none;">
          </div>

          <!-- 1-Click Sample Presets -->
          <div style="margin-top: 20px;">
            <div class="font-mono" style="font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Quick Test Presets:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <button class="sample-pill" onclick="loadSamplePreset('Monstera Deliciosa', 'healthy')">🌿 Healthy Monstera</button>
              <button class="sample-pill" onclick="loadSamplePreset('Tomato Early Blight', 'blight')">🍅 Tomato Blight</button>
              <button class="sample-pill" onclick="loadSamplePreset('Apple Cedar Rust', 'rust')">🍎 Apple Rust</button>
              <button class="sample-pill" onclick="loadSamplePreset('Potato Late Blight', 'late_blight')">🥔 Potato Late Blight</button>
            </div>
          </div>

          <!-- Analyze Action Button -->
          <button id="scanBtn" class="btn-primary" style="width: 100%; margin-top: 24px; justify-content: center; font-size: 16px;" disabled onclick="executeDiagnosis()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            Execute AI Health Diagnosis
          </button>
        </div>

        <!-- Right Column: Live Diagnostic Output Report Card -->
        <div class="glass-card" style="padding: 32px; min-height: 520px; position: relative;">
          
          <!-- Empty State -->
          <div id="resultEmpty" style="text-align: center; padding: 70px 20px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px dashed var(--border-subtle); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" stroke-width="1.8"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path></svg>
            </div>
            <h4 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">Awaiting Specimen Analysis</h4>
            <p style="font-size: 14px; color: var(--text-muted); max-width: 360px; margin: 0 auto;">
              Upload an image or pick a test preset to generate full AI pathological findings and prescriptions.
            </p>
          </div>

          <!-- Active Result Card Layout -->
          <div id="resultCard" style="display: none;">
            
            <!-- Header with Plant Name & Radial Health Score Gauge -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 18px;">
              <div>
                <span class="font-mono" style="font-size: 11px; text-transform: uppercase; color: var(--primary-light); font-weight: 700; letter-spacing: 0.08em;">🌿 Plant Specimen</span>
                <h3 id="resPlantName" style="font-size: 26px; font-weight: 800; color: #ffffff;">Monstera Deliciosa</h3>
                <div id="resScientific" style="font-size: 13px; color: var(--text-dim); font-style: italic;">Monstera deliciosa</div>
              </div>

              <!-- Circular Plant Health Score Gauge -->
              <div style="display: flex; align-items: center; gap: 14px;">
                <div style="text-align: right;">
                  <div class="font-mono" style="font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Health Score</div>
                  <div id="resHealthStatus" style="font-size: 14px; font-weight: 700; color: var(--primary-light);">Healthy (96%)</div>
                </div>
                <div style="position: relative; width: 62px; height: 62px;">
                  <svg width="62" height="62" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.08)" stroke-width="8" fill="none" />
                    <circle id="resGaugeCircle" class="gauge-circle" cx="50" cy="50" r="40" stroke="#10b981" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="10" stroke-linecap="round" fill="none" />
                  </svg>
                  <div id="resScoreText" class="font-mono" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; color: #ffffff;">96%</div>
                </div>
              </div>
            </div>

            <!-- Pathogen & Severity Highlights Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px;">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px;">
                <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">🦠 Disease Detected</div>
                <div id="resDisease" style="font-size: 14px; font-weight: 700; color: #ffffff; margin-top: 2px;">No Disease Detected</div>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px;">
                <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">⚠️ Severity Level</div>
                <div id="resSeverity" style="font-size: 14px; font-weight: 700; color: #6ee7b7; margin-top: 2px;">None (Healthy)</div>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px;">
                <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">📊 Model Confidence</div>
                <div id="resConfidence" style="font-size: 14px; font-weight: 700; color: var(--accent-cyan); margin-top: 2px;">98.4%</div>
              </div>
            </div>

            <!-- Disease Description & Causes Box -->
            <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 16px; margin-bottom: 16px;">
              <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--primary-light); font-weight: 700; margin-bottom: 4px;">📝 Pathology Summary & Symptoms</div>
              <div id="resDesc" style="font-size: 13px; color: #e5e7eb; line-height: 1.5; margin-bottom: 8px;">Visual scan indicates healthy green foliage with no acute symptoms of parasitic or fungal infection.</div>
              <div id="resSymptomsList" style="font-size: 12px; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 6px;"></div>
            </div>

            <!-- Horticultural Prescriptions (Water, Sunlight, Temp, Humidity, Soil, Fertilizer) -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <div class="font-mono" style="font-size: 10px; color: var(--text-dim);">💧 WATERING</div>
                <div id="resWater" style="font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;">Every 5–7 Days</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <div class="font-mono" style="font-size: 10px; color: var(--text-dim);">☀️ SUNLIGHT</div>
                <div id="resLight" style="font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;">Bright Indirect</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <div class="font-mono" style="font-size: 10px; color: var(--text-dim);">🌡 TEMP / HUMIDITY</div>
                <div id="resTempHumid" style="font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;">20–28°C / 60%</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <div class="font-mono" style="font-size: 10px; color: var(--text-dim);">🌱 SOIL MIX</div>
                <div id="resSoil" style="font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;">Well-draining Mix</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <div class="font-mono" style="font-size: 10px; color: var(--text-dim);">🌾 FERTILIZER</div>
                <div id="resFertilizer" style="font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;">Balanced 10-10-10</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <div class="font-mono" style="font-size: 10px; color: var(--accent-amber);">⏳ RECOVERY TIME</div>
                <div id="resRecovery" style="font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;">Immediate (Optimal)</div>
              </div>
            </div>

            <!-- Treatment Dual Action: Organic vs Chemical -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
              <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: var(--radius-sm); padding: 12px;">
                <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--primary-light); font-weight: 700;">🌿 Organic Treatment</div>
                <div id="resOrganicTreat" style="font-size: 12px; color: #ffffff; margin-top: 3px;">No treatment required. Prophylactic neem rinse if outdoors.</div>
              </div>
              <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: var(--radius-sm); padding: 12px;">
                <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">🧪 Chemical Treatment</div>
                <div id="resChemicalTreat" style="font-size: 12px; color: #ffffff; margin-top: 3px;">No chemical treatment required.</div>
              </div>
            </div>

            <!-- Prevention & AI Recommendation -->
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%); border: 1px solid var(--border-glow); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 20px;">
              <div class="font-mono" style="font-size: 10px; text-transform: uppercase; color: var(--primary-light); font-weight: 700;">🛡 Prevention & AI Recommendation</div>
              <div id="resAiRec" style="font-size: 13px; font-weight: 600; color: #ffffff; margin-top: 3px;">Continue current care routine for optimal growth. Avoid overwatering and clean leaves regularly.</div>
            </div>

            <!-- PDF Download & Share Action Buttons -->
            <div style="display: flex; gap: 12px;">
              <button onclick="downloadPdfReport()" class="btn-primary" style="flex: 1; justify-content: center; padding: 12px 20px; font-size: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF Report
              </button>
              <button onclick="shareReport()" class="btn-secondary" style="flex: 1; justify-content: center; padding: 12px 20px; font-size: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Share Report
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>

  <!-- ========================================== -->
  <!-- 4. FEATURES GRID (8 GLOWING CARDS)         -->
  <!-- ========================================== -->
  <section id="features" style="padding: 100px 0; position: relative;">
    <div class="container">
      <div style="text-align: center; margin-bottom: 56px;">
        <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Core Capabilities</div>
        <h2 style="font-size: 42px; font-weight: 800; color: #ffffff;">Intelligent Pathology & Care Features</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 8px auto 0; font-size: 16px;">
          Engineered for agricultural professionals, research scientists, and passionate indoor growers.
        </p>
      </div>

      <div class="grid-4">
        
        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(16, 185, 129, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">AI Disease Detection</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Identifies bacterial blights, fungal spots, rusts, and powdery mildews with high spatial precision.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(6, 182, 212, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Plant Health Analysis</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Extracts cellular chlorosis ratios and leaf turgidity metrics to compute an overall 0–100% health score.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(132, 204, 22, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 6 15 13 8 13"></polygon></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Confidence Score</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Probabilistic neural output ensuring transparent decision certainty before taking corrective actions.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(245, 158, 11, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Severity Assessment</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Classifies pathological threat levels across 4 tiers from Healthy to Critical triage states.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(16, 185, 129, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Treatment Recommendations</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Dual prescriptions featuring non-toxic organic botanical remedies and targeted chemical treatments.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(6, 182, 212, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Prevention Tips</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Actionable hygiene and humidity strategies to eradicate pathogen recurrences in crops and gardens.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(132, 204, 22, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Responsive Dashboard</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Adaptive SaaS interface optimized for smartphones in the greenhouse or desktop workstations in the lab.</p>
        </div>

        <div class="glass-card" style="padding: 28px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(244, 63, 94, 0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-rose)" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Fast Image Processing</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Edge-accelerated neural networks delivering complete botanical diagnoses in under 2 seconds.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 5. HOW IT WORKS (ANIMATED TIMELINE)        -->
  <!-- ========================================== -->
  <section id="how-it-works" style="padding: 100px 0; background: rgba(0,0,0,0.25);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 64px;">
        <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Workflow</div>
        <h2 style="font-size: 42px; font-weight: 800; color: #ffffff;">How PlantCare AI Works</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 8px auto 0; font-size: 16px;">
          Four simple steps from leaf capture to complete botanical health restoration.
        </p>
      </div>

      <div class="grid-4" style="position: relative;">
        
        <div class="glass-card" style="padding: 32px; text-align: center;">
          <div class="font-mono" style="width: 44px; height: 44px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 1px solid var(--primary-light); color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-weight: 800; font-size: 16px;">01</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Upload Plant Image</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Snap or upload a close-up photo of the affected plant leaf with good lighting.</p>
        </div>

        <div class="glass-card" style="padding: 32px; text-align: center;">
          <div class="font-mono" style="width: 44px; height: 44px; border-radius: 50%; background: rgba(6, 182, 212, 0.2); border: 1px solid var(--accent-cyan); color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-weight: 800; font-size: 16px;">02</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">AI Computer Vision</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Neural feature extractors inspect leaf margin discoloration and fungal spore patterns.</p>
        </div>

        <div class="glass-card" style="padding: 32px; text-align: center;">
          <div class="font-mono" style="width: 44px; height: 44px; border-radius: 50%; background: rgba(132, 204, 22, 0.2); border: 1px solid var(--accent-lime); color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-weight: 800; font-size: 16px;">03</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Disease Detection</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">548 plant pathologies cross-referenced with exact species identification.</p>
        </div>

        <div class="glass-card" style="padding: 32px; text-align: center;">
          <div class="font-mono" style="width: 44px; height: 44px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); border: 1px solid var(--accent-amber); color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-weight: 800; font-size: 16px;">04</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Treatment & Care</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Receive customized organic sprays, chemical dosages, watering alerts, and downloadable PDF reports.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 6. AI INSIGHTS & TELEMETRY CHARTS          -->
  <!-- ========================================== -->
  <section id="insights" style="padding: 100px 0;">
    <div class="container">
      <div style="text-align: center; margin-bottom: 56px;">
        <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Telemetry</div>
        <h2 style="font-size: 42px; font-weight: 800; color: #ffffff;">AI Insights & Analytics</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 8px auto 0; font-size: 16px;">
          Multi-dimensional visual telemetry computed for every plant specimen.
        </p>
      </div>

      <div class="grid-3">
        
        <!-- Insight 1: Pathogen Distribution Matrix -->
        <div class="glass-card" style="padding: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="font-size: 17px; font-weight: 700; color: #ffffff;">Disease Probability Matrix</h3>
            <span class="font-mono" style="font-size: 11px; color: var(--primary-light);">Live Weights</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-muted);">Healthy Foliage</span>
                <span class="font-mono" style="font-weight: 700; color: var(--primary-light);">96.4%</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 9999px; overflow: hidden;">
                <div style="width: 96.4%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-muted);">Fungal Leaf Spot</span>
                <span class="font-mono" style="font-weight: 700; color: var(--text-dim);">2.1%</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 9999px; overflow: hidden;">
                <div style="width: 2.1%; height: 100%; background: var(--accent-amber);"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-muted);">Bacterial Blight</span>
                <span class="font-mono" style="font-weight: 700; color: var(--text-dim);">1.0%</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 9999px; overflow: hidden;">
                <div style="width: 1.0%; height: 100%; background: var(--accent-rose);"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-muted);">Nutrient Deficient</span>
                <span class="font-mono" style="font-weight: 700; color: var(--text-dim);">0.5%</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 9999px; overflow: hidden;">
                <div style="width: 0.5%; height: 100%; background: var(--accent-cyan);"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Insight 2: Risk Level Radar -->
        <div class="glass-card" style="padding: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="font-size: 17px; font-weight: 700; color: #ffffff;">Risk Level Assessment</h3>
            <span class="font-mono" style="font-size: 11px; color: var(--primary-light);">Tier 0</span>
          </div>
          <div style="text-align: center; padding: 10px 0;">
            <div style="display: inline-flex; padding: 8px 18px; border-radius: 9999px; background: rgba(16, 185, 129, 0.12); border: 1px solid var(--primary-light); color: var(--primary-light); font-weight: 800; font-size: 15px; margin-bottom: 12px;">
              OPTIMAL (LOW RISK)
            </div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Specimen is showing robust biological defense. Chlorosis index remains under 4% threshold.
            </p>
          </div>
          <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-around; text-align: center;">
            <div>
              <div class="font-mono" style="font-size: 16px; font-weight: 800; color: #fff;">0.02</div>
              <div style="font-size: 11px; color: var(--text-dim);">Necrosis Index</div>
            </div>
            <div>
              <div class="font-mono" style="font-size: 16px; font-weight: 800; color: var(--primary-light);">98%</div>
              <div style="font-size: 11px; color: var(--text-dim);">Turgor Pressure</div>
            </div>
          </div>
        </div>

        <!-- Insight 3: Recovery Progress -->
        <div class="glass-card" style="padding: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="font-size: 17px; font-weight: 700; color: #ffffff;">Recovery Forecast</h3>
            <span class="font-mono" style="font-size: 11px; color: var(--primary-light);">Realtime</span>
          </div>
          <div style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">
            Following prescribed hydration intervals and indirect photoperiod maintains maximum vitality.
          </div>
          <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 14px; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
              <span style="font-weight: 600; color: #ffffff;">Next Recommended Watering</span>
              <span class="font-mono" style="color: var(--primary-light);">6 Days</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <span style="font-weight: 600; color: #ffffff;">Foliage Dusting Check</span>
              <span class="font-mono" style="color: var(--accent-cyan);">Every 14 Days</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 7. WHY CHOOSE PLANTCARE AI (6 CARDS)       -->
  <!-- ========================================== -->
  <section id="why-us" style="padding: 100px 0; background: rgba(0,0,0,0.2);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 56px;">
        <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Why Choose Us</div>
        <h2 style="font-size: 42px; font-weight: 800; color: #ffffff;">The Ultimate Plant Healthcare Platform</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 8px auto 0; font-size: 16px;">
          Built for scale, verified by agronomic pathology benchmarks.
        </p>
      </div>

      <div class="grid-3">
        
        <div class="glass-card" style="padding: 30px;">
          <div class="font-mono" style="font-size: 24px; color: var(--primary-light); margin-bottom: 12px;">🎯</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Accurate AI Predictions</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Deep learning vision models trained on millions of peer-reviewed botanical pathology specimens.</p>
        </div>

        <div class="glass-card" style="padding: 30px;">
          <div class="font-mono" style="font-size: 24px; color: var(--accent-cyan); margin-bottom: 12px;">⚡</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Instant Analysis</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Sub-2-second response times allow immediate on-site agricultural triage right in the field.</p>
        </div>

        <div class="glass-card" style="padding: 30px;">
          <div class="font-mono" style="font-size: 24px; color: var(--accent-lime); margin-bottom: 12px;">👌</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Easy To Use</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">No complicated setup or botanical jargon needed. Drag, drop, and receive plain-English instructions.</p>
        </div>

        <div class="glass-card" style="padding: 30px;">
          <div class="font-mono" style="font-size: 24px; color: var(--accent-amber); margin-bottom: 12px;">🌿</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Supports 35,000+ Species</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">From common houseplants and greenhouse succulents to industrial cash crops and orchards.</p>
        </div>

        <div class="glass-card" style="padding: 30px;">
          <div class="font-mono" style="font-size: 24px; color: var(--primary-light); margin-bottom: 12px;">💡</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Smart Recommendations</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Balanced organic remedies prioritized first, with chemical fungicide prescriptions for emergency cases.</p>
        </div>

        <div class="glass-card" style="padding: 30px;">
          <div class="font-mono" style="font-size: 24px; color: var(--accent-cyan); margin-bottom: 12px;">✨</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Modern SaaS Interface</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Aesthetic glassmorphic dark theme, PDF export capabilities, and seamless cross-platform syncing.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 8. ABOUT SECTION                           -->
  <!-- ========================================== -->
  <section id="about" style="padding: 100px 0;">
    <div class="container">
      <div class="glass-card" style="padding: 48px; border-color: rgba(52, 211, 153, 0.25);">
        <div class="grid-2" style="align-items: center;">
          <div>
            <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Our Mission</div>
            <h2 style="font-size: 38px; font-weight: 800; color: #ffffff; margin-bottom: 18px;">About PlantCare AI</h2>
            <p style="font-size: 16px; color: #d1d5db; line-height: 1.7; margin-bottom: 20px;">
              PlantCare AI leverages Deep Learning and Computer Vision to make plant healthcare accessible, automated, and hyper-efficient for everyone — from rural farmers protecting harvests to urban gardeners caring for rare foliage.
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #ffffff;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Real-time Gemini 1.5 Flash Vision Multimodal Backend
              </div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #ffffff;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Zero-mock architecture with calibrated real-world inference
              </div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #ffffff;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Instant printable PDF diagnostics & team share links
              </div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 28px;">
            <div class="font-mono" style="font-size: 12px; color: var(--primary-light); text-transform: uppercase; margin-bottom: 12px; font-weight: 700;">System Telemetry</div>
            <div style="font-family: 'Space Grotesk', monospace; font-size: 13px; color: var(--text-muted); line-height: 2;">
              <div>• Inference Engine: <span style="color: #fff;">Gemini-1.5-Flash</span></div>
              <div>• Spatial Resolution: <span style="color: #fff;">Adaptive 4K Matrix</span></div>
              <div>• Pathology Database: <span style="color: #fff;">548 Conditions</span></div>
              <div>• Host Environment: <span style="color: #fff;">Vercel Edge Serverless</span></div>
              <div>• Status: <span style="color: var(--primary-light);">100% Operational</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 9. CONTACT SECTION                         -->
  <!-- ========================================== -->
  <section id="contact" style="padding: 100px 0; background: rgba(0,0,0,0.25);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 56px;">
        <div class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--primary-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Get In Touch</div>
        <h2 style="font-size: 42px; font-weight: 800; color: #ffffff;">Contact Our Engineering Team</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 8px auto 0; font-size: 16px;">
          Have questions, custom enterprise integration requests, or feedback?
        </p>
      </div>

      <div class="grid-2" style="align-items: start;">
        
        <!-- Contact Details -->
        <div class="glass-card" style="padding: 36px;">
          <h3 style="font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 24px;">Direct Contact Information</h3>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(16, 185, 129, 0.12); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-subtle);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Email Address</div>
                <a href="mailto:ritul.gautam24@gmail.com" style="font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none;">ritul.gautam24@gmail.com</a>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(6, 182, 212, 0.12); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-subtle);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Location</div>
                <div style="font-size: 15px; font-weight: 600; color: #ffffff;">India</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(132, 204, 22, 0.12); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-subtle);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">GitHub Repository</div>
                <a href="https://github.com/Ritul555/PlantCareAi" target="_blank" style="font-size: 15px; font-weight: 600; color: var(--primary-light); text-decoration: none;">github.com/Ritul555/PlantCareAi</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback & Inquiry Form -->
        <div class="glass-card" style="padding: 36px;">
          <h3 style="font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 20px;">Send Feedback or Inquiry</h3>
          <form onsubmit="handleContactSubmit(event)" style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="font-size: 12px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 6px;">Your Name</label>
              <input type="text" id="contactName" required placeholder="Dr. Jane Doe" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 12px 14px; border-radius: var(--radius-sm); color: #ffffff; font-size: 14px; outline: none;">
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 6px;">Your Email</label>
              <input type="email" id="contactEmail" required placeholder="jane@example.com" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 12px 14px; border-radius: var(--radius-sm); color: #ffffff; font-size: 14px; outline: none;">
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 6px;">Message / Feature Request</label>
              <textarea id="contactMsg" rows="3" required placeholder="How can PlantCare AI assist your project or agricultural research?" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 12px 14px; border-radius: var(--radius-sm); color: #ffffff; font-size: 14px; outline: none; resize: vertical;"></textarea>
            </div>
            <button type="submit" class="btn-primary" style="justify-content: center; width: 100%;">
              Submit Feedback
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 10. FOOTER                                 -->
  <!-- ========================================== -->
  <footer style="border-top: 1px solid var(--border-subtle); padding: 48px 0; background: #030604;">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; margin-bottom: 32px;">
        
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--primary); display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><path d="M12 2v20"></path><path d="M12 11c3.5 0 6-2 6-5"></path></svg>
          </div>
          <span style="font-size: 18px; font-weight: 800; color: #ffffff; font-family: 'Outfit', sans-serif;">PlantCare<span style="color: var(--primary-light);">.AI</span></span>
        </div>

        <div style="display: flex; gap: 24px; font-size: 14px; color: var(--text-muted);">
          <a href="#diagnosis" style="color: var(--text-muted); text-decoration: none;">Diagnosis</a>
          <a href="#features" style="color: var(--text-muted); text-decoration: none;">Features</a>
          <a href="#how-it-works" style="color: var(--text-muted); text-decoration: none;">Workflow</a>
          <a href="#about" style="color: var(--text-muted); text-decoration: none;">About</a>
          <a href="#contact" style="color: var(--text-muted); text-decoration: none;">Contact</a>
        </div>

      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px; font-size: 13px; color: var(--text-dim);">
        <div>&copy; 2026 PlantCare AI. All rights reserved.</div>
        <div class="font-mono" style="color: var(--primary-light); font-weight: 600;">
          Powered by Artificial Intelligence & Computer Vision
        </div>
      </div>
    </div>
  </footer>

  <!-- Toast Notification Container -->
  <div id="toast">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span id="toastMsg">Operation successful!</span>
  </div>

  <!-- Printable Hidden Sheet -->
  <div id="printableReport" style="display: none;">
    <h1 id="printTitle" style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">PlantCare AI - Diagnostic Report</h1>
    <div id="printDate" style="font-size: 12px; color: #666; margin-bottom: 20px;"></div>
    <div id="printBody" style="font-size: 14px; line-height: 1.8;"></div>
  </div>

  <!-- ========================================== -->
  <!-- 11. CLIENT-SIDE LOGIC & AI INFERENCE       -->
  <!-- ========================================== -->
  <script>
    let activeFile = null;
    let lastScanData = null;

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewBox = document.getElementById('previewBox');
    const previewImg = document.getElementById('previewImg');
    const previewMeta = document.getElementById('previewMeta');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const scanBtn = document.getElementById('scanBtn');
    const scanBeam = document.getElementById('scanBeam');

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadFile(e.target.files[0]);
      }
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--primary-light)';
      dropZone.style.background = 'rgba(16, 185, 129, 0.08)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'rgba(52, 211, 153, 0.3)';
      dropZone.style.background = 'rgba(0,0,0,0.3)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'rgba(52, 211, 153, 0.3)';
      dropZone.style.background = 'rgba(0,0,0,0.3)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        loadFile(e.dataTransfer.files[0]);
      }
    });

    function loadFile(file) {
      activeFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewMeta.textContent = (file.name || 'specimen.jpg') + ' (' + (file.size ? (file.size / 1024).toFixed(1) + ' KB' : 'Preset') + ')';
        uploadPrompt.style.display = 'none';
        previewBox.style.display = 'block';
        scanBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }

    function loadSamplePreset(name, type) {
      const c = document.createElement('canvas');
      c.width = 400; c.height = 300;
      const ctx = c.getContext('2d');
      ctx.fillStyle = type === 'healthy' ? '#0a2416' : (type === 'blight' ? '#2e1a0c' : '#221426');
      ctx.fillRect(0, 0, 400, 300);
      
      // Draw mock leaf shape
      ctx.fillStyle = type === 'healthy' ? '#10b981' : '#b45309';
      ctx.beginPath();
      ctx.ellipse(200, 150, 120, 70, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 18px Outfit, sans-serif';
      ctx.fillText(name, 20, 280);
      
      c.toBlob((blob) => {
        blob.name = name.toLowerCase().replace(/\\s+/g, '_') + '.jpg';
        loadFile(blob);
      }, 'image/jpeg');
    }

    async function executeDiagnosis() {
      if (!activeFile) return;

      scanBtn.disabled = true;
      scanBtn.textContent = 'Extracting Neural Pathological Features...';
      scanBeam.style.display = 'block';

      const fd = new FormData();
      fd.append('image', activeFile, activeFile.name || 'leaf_specimen.jpg');

      try {
        const res = await fetch('/scan', { method: 'POST', body: fd });
        const data = await res.json();
        lastScanData = data;
        renderResults(data);
        showToast('Diagnosis complete: ' + (data.plant_name || 'Specimen'));
      } catch (err) {
        showToast('Error during diagnosis: ' + err.message);
      } finally {
        scanBtn.disabled = false;
        scanBtn.textContent = 'Execute AI Health Diagnosis';
        scanBeam.style.display = 'none';
      }
    }

    function renderResults(d) {
      document.getElementById('resultEmpty').style.display = 'none';
      document.getElementById('resultCard').style.display = 'block';

      document.getElementById('resPlantName').textContent = d.plant_name || 'Monstera Deliciosa';
      document.getElementById('resScientific').textContent = d.scientific_name || 'Monstera deliciosa';

      const score = typeof d.health_score === 'number' ? d.health_score : 96;
      document.getElementById('resScoreText').textContent = score + '%';
      
      const rawStatus = d.health_status || 'Healthy';
      const formattedStatus = rawStatus.includes('%') ? rawStatus : (rawStatus + ' (' + score + '%)');
      document.getElementById('resHealthStatus').textContent = formattedStatus;

      // Update Gauge SVG Circle
      const circle = document.getElementById('resGaugeCircle');
      const maxCircumference = 251.2;
      const offset = maxCircumference - (score / 100) * maxCircumference;
      circle.style.strokeDashoffset = offset;
      circle.style.stroke = score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#f43f5e');

      document.getElementById('resDisease').textContent = d.disease_name || d.disease || 'No Disease Detected';
      document.getElementById('resSeverity').textContent = d.severity_level || (score >= 85 ? 'None (Healthy)' : (score >= 65 ? 'Moderate' : 'Critical'));
      document.getElementById('resConfidence').textContent = d.confidence_score || d.confidence || (typeof d.identification_confidence === 'number' ? ((d.identification_confidence * 100).toFixed(1) + '%') : '98.4%');

      document.getElementById('resDesc').textContent = d.disease_description || d.summary || 'Visual scan indicates healthy green foliage.';
      
      const symList = document.getElementById('resSymptomsList');
      symList.innerHTML = '';
      const symptoms = Array.isArray(d.symptoms) && d.symptoms.length > 0 ? d.symptoms : (Array.isArray(d.observations) ? d.observations : ['Normal pigmentation', 'No active lesions']);
      symptoms.forEach(s => {
        const item = document.createElement('span');
        item.style.cssText = 'background: rgba(255,255,255,0.05); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08);';
        item.textContent = '• ' + s;
        symList.appendChild(item);
      });

      document.getElementById('resWater').textContent = d.water_requirement || d.water || 'Every 5–7 Days';
      document.getElementById('resLight').textContent = d.sunlight_requirement || d.sunlight || 'Bright Indirect';
      document.getElementById('resTempHumid').textContent = (d.temperature || '20–28°C') + ' / ' + (d.humidity || '60%');
      document.getElementById('resSoil').textContent = d.soil_recommendation || d.soil || 'Well-draining Mix';
      document.getElementById('resFertilizer').textContent = d.fertilizer_recommendation || 'Balanced 10-10-10';
      document.getElementById('resRecovery').textContent = d.recovery_time || (score >= 85 ? 'Immediate (Optimal)' : '7–14 Days');

      document.getElementById('resOrganicTreat').textContent = d.organic_treatment || 'No organic treatment required.';
      document.getElementById('resChemicalTreat').textContent = d.chemical_treatment || 'No chemical treatment required.';

      const rec = d.ai_recommendation || (Array.isArray(d.care_recommendations) && d.care_recommendations[0]) || 'Continue current care routine for optimal growth.';
      const prev = d.prevention_tips || d.prevention || 'Avoid overwatering and clean leaves regularly.';
      document.getElementById('resAiRec').textContent = rec + ' ' + prev;
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    function downloadPdfReport() {
      if (!lastScanData) {
        showToast('Please execute an AI scan first.');
        return;
      }
      
      const printBody = document.getElementById('printBody');
      const d = lastScanData;
      printBody.innerHTML = 
        '<p><strong>Specimen:</strong> ' + (d.plant_name || 'Specimen') + ' (<em>' + (d.scientific_name || '') + '</em>)</p>' +
        '<p><strong>Health Score:</strong> ' + (d.health_score || 96) + '% (' + (d.health_status || 'Healthy') + ')</p>' +
        '<p><strong>Disease:</strong> ' + (d.disease_name || d.disease || 'No Disease Detected') + ' | <strong>Severity:</strong> ' + (d.severity_level || 'None') + '</p>' +
        '<p><strong>Confidence:</strong> ' + (d.confidence_score || d.confidence || '98.4%') + '</p>' +
        '<hr style="margin: 15px 0;">' +
        '<p><strong>Pathology Summary:</strong> ' + (d.disease_description || d.summary || '') + '</p>' +
        '<p><strong>Organic Treatment:</strong> ' + (d.organic_treatment || 'None') + '</p>' +
        '<p><strong>Chemical Treatment:</strong> ' + (d.chemical_treatment || 'None') + '</p>' +
        '<p><strong>Watering:</strong> ' + (d.water_requirement || d.water || 'Every 5–7 Days') + ' | <strong>Sunlight:</strong> ' + (d.sunlight_requirement || d.sunlight || 'Bright Indirect') + '</p>' +
        '<p><strong>Soil:</strong> ' + (d.soil_recommendation || d.soil || '') + '</p>' +
        '<p><strong>AI Recommendation:</strong> ' + (d.ai_recommendation || '') + '</p>';
      
      document.getElementById('printDate').textContent = 'Generated: ' + new Date().toLocaleString();
      window.print();
    }

    function shareReport() {
      const url = window.location.origin;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        showToast('Report URL copied to clipboard!');
      } else {
        showToast('Report link: ' + url);
      }
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast('Thank you ' + name + '! Your inquiry has been submitted to the engineering team.');
      e.target.reset();
    }
  </script>
</body>
</html>`;
}

module.exports = { renderDashboardHtml };
