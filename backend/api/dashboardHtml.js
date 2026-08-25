function renderDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlantCare AI — Botanical Vision Intelligence</title>
  
  <!-- Google Fonts: Figtree -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
      --accent-pink: #F598F2;
      --accent-pink-glow: rgba(245, 152, 242, 0.45);
      --text-white: #ffffff;
      --border-light: rgba(255, 255, 255, 0.15);
      --card-bg: rgba(10, 10, 10, 0.75);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-family: 'Figtree', sans-serif;
      background-color: #000000;
      color: var(--text-white);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* Video Background Stack */
    .video-background-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
    }

    .bg-video {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      object-fit: cover;
      opacity: 0;
      transition: opacity 1200ms ease-in-out;
    }

    .bg-video.active {
      opacity: 1;
    }

    .video-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.25);
      z-index: 1;
    }

    /* Common Container */
    .hero-container {
      max-width: 1340px;
      margin: 0 auto;
      padding-left: 15px;
      padding-right: 15px;
      position: relative;
      z-index: 2;
    }

    /* Navbar */
    header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 20;
    }

    .navbar-inner {
      padding-top: 36px;
      padding-bottom: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-links-left {
      display: flex;
      align-items: center;
      gap: 32px;
    }

    .nav-item {
      display: flex;
      align-items: baseline;
      gap: 6px;
      text-decoration: none;
      color: var(--text-white);
      position: relative;
      padding-bottom: 4px;
      cursor: pointer;
    }

    .nav-index {
      font-size: 8px;
      line-height: 12px;
      letter-spacing: -0.08px;
      font-weight: 500;
      text-transform: uppercase;
      opacity: 0.6;
    }

    .nav-label {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .nav-link-underline {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 1px;
      background-color: var(--text-white);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s var(--ease-spring);
    }

    .nav-item:hover .nav-link-underline {
      transform: scaleX(1);
      transform-origin: left;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 32px;
      text-align: right;
    }

    .nav-email {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.12px;
      font-weight: 500;
      text-decoration: none;
      color: var(--text-white);
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .nav-email:hover { opacity: 1; }

    .nav-clock {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.12px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      opacity: 0.9;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-btn {
      display: none;
      background: transparent;
      border: 1px solid var(--border-light);
      color: var(--text-white);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
    }

    .mobile-nav-panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 420ms var(--ease-spring);
      overflow: hidden;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-light);
    }
    .mobile-nav-panel.open {
      grid-template-rows: 1fr;
    }
    .mobile-nav-content {
      min-height: 0;
      padding: 0 18px;
    }
    .mobile-nav-panel.open .mobile-nav-content {
      padding: 24px 18px 32px;
    }
    .mobile-nav-link {
      display: block;
      font-size: 28px;
      line-height: 32px;
      letter-spacing: -0.84px;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--text-white);
      text-decoration: none;
      margin-bottom: 18px;
    }

    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-top: 190px;
      padding-bottom: 60px;
    }

    .hero-flex-wrapper {
      display: flex;
      flex-direction: column;
      gap: 150px;
      width: 100%;
    }

    /* Upper Section: Video Switcher + Availability */
    .hero-upper {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
    }

    .switcher-col {
      flex: 4;
      display: flex;
      gap: 28px;
      flex-wrap: wrap;
    }

    .role-link {
      background: transparent;
      border: none;
      color: var(--text-white);
      cursor: pointer;
      font-family: 'Figtree', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      opacity: 0.55;
      transition: all 0.3s var(--ease-spring);
      display: inline-block;
    }
    .role-link:hover {
      opacity: 0.75;
      transform: translateX(4px);
    }
    .role-link.active {
      opacity: 1;
      font-weight: 600;
      transform: translateX(0);
    }

    .availability-col {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: var(--accent-pink);
      box-shadow: 0 0 10px var(--accent-pink-glow);
      animation: dotPulse 1.6s infinite ease-in-out;
      transition: background-color 0.5s, box-shadow 0.5s;
    }
    .status-dot.white-dot {
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    }

    @keyframes dotPulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.45;
        transform: scale(1.45);
      }
    }

    .status-text {
      font-size: 13px;
      line-height: 16px;
      font-weight: 500;
      letter-spacing: -0.13px;
      white-space: nowrap;
    }

    /* Lower Section: Name + CTA */
    .hero-lower {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
    }

    .name-col {
      flex: 2;
    }

    .hero-title {
      font-size: clamp(72px, 10.5vw, 150px);
      line-height: 85%;
      letter-spacing: -0.04em;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0;
      white-space: nowrap;
      animation: revealUp 0.9s var(--ease-spring) forwards;
    }

    .hero-title .title-dot {
      color: var(--accent-pink);
      transition: color 0.5s;
    }
    .hero-title .title-dot.white-dot {
      color: #ffffff;
    }

    .cta-col {
      flex: 1;
      padding-left: 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }

    .hero-desc {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
      max-width: 380px;
      animation: revealRight 0.9s var(--ease-spring) forwards;
    }

    /* Start Project / Launch AI Button with Fill-Up Animation */
    .btn-project {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      border: 1px solid #ffffff;
      border-radius: 9999px;
      background: transparent;
      color: #ffffff;
      font-family: 'Figtree', sans-serif;
      font-size: 14px;
      font-weight: 500;
      text-transform: lowercase;
      text-decoration: none;
      cursor: pointer;
      overflow: hidden;
      transition: color 0.4s var(--ease-spring), border-color 0.4s var(--ease-spring);
      animation: revealRight 0.9s var(--ease-spring) 0.08s forwards;
      opacity: 0;
      animation-fill-mode: forwards;
      z-index: 1;
    }

    .btn-project::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--accent-pink);
      transform: translateY(101%);
      transition: transform 0.45s var(--ease-spring);
      z-index: -1;
    }

    .btn-project:hover {
      color: #000000;
      border-color: var(--accent-pink);
    }

    .btn-project:hover::before {
      transform: translateY(0);
    }

    /* Animations */
    @keyframes revealUp {
      from {
        opacity: 0;
        transform: translateY(80px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes revealRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Interactive PlantCare AI Scanner Modal & Workspace */
    .interactive-panel {
      position: relative;
      z-index: 10;
      background: rgba(8, 8, 8, 0.92);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border-top: 1px solid var(--border-light);
      padding: 80px 0 100px;
    }

    .panel-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .panel-title {
      font-size: 40px;
      font-weight: 600;
      letter-spacing: -1.5px;
      margin-bottom: 12px;
    }
    .panel-sub {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.65);
      max-width: 500px;
      margin: 0 auto;
    }

    .workspace-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .card-box {
      background: rgba(18, 18, 18, 0.6);
      border: 1px solid var(--border-light);
      border-radius: 20px;
      padding: 32px;
    }

    .upload-zone {
      border: 1px dashed rgba(255, 255, 255, 0.25);
      border-radius: 14px;
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.3s;
      background: rgba(0, 0, 0, 0.3);
    }
    .upload-zone:hover {
      border-color: var(--accent-pink);
    }
    .upload-icon {
      font-size: 32px;
      margin-bottom: 12px;
      opacity: 0.8;
    }

    .preview-wrap {
      display: none;
      margin-top: 16px;
      border-radius: 12px;
      overflow: hidden;
      max-height: 260px;
      position: relative;
    }
    .preview-wrap img {
      width: 100%;
      height: 260px;
      object-fit: cover;
    }

    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--accent-pink);
      box-shadow: 0 0 12px var(--accent-pink);
      display: none;
      animation: scanLaser 2s infinite ease-in-out;
    }
    @keyframes scanLaser {
      0% { top: 0; }
      50% { top: 98%; }
      100% { top: 0; }
    }

    .btn-action {
      width: 100%;
      margin-top: 20px;
      padding: 14px;
      border-radius: 9999px;
      background: #ffffff;
      color: #000000;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-action:hover:not(:disabled) {
      background: var(--accent-pink);
      box-shadow: 0 0 20px var(--accent-pink-glow);
    }
    .btn-action:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .result-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      background: rgba(245, 152, 242, 0.15);
      color: var(--accent-pink);
      border: 1px solid rgba(245, 152, 242, 0.4);
      margin-bottom: 16px;
    }

    /* Responsive Breakpoints */
    /* Tablet: 810px - 1199.98px */
    @media (min-width: 810px) and (max-width: 1199.98px) {
      .navbar-inner {
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 18px;
        padding-right: 18px;
      }
      .nav-links-left {
        gap: 16px;
      }
      .hero-title {
        font-size: 129.6px;
        line-height: 113.4px;
        letter-spacing: -7.7px;
      }
      .hero-lower {
        gap: 28px;
        padding-bottom: 52px;
      }
      .cta-col {
        padding-left: 24px;
      }
    }

    /* Mobile: < 809.98px */
    @media (max-width: 809.98px) {
      .navbar-inner {
        padding-top: 24px;
        padding-bottom: 24px;
        padding-left: 18px;
        padding-right: 18px;
      }
      .nav-links-left, .nav-right {
        display: none;
      }
      .mobile-menu-btn {
        display: block;
      }
      .hero-section {
        justify-content: flex-end;
        align-items: flex-start;
        gap: 72px;
        padding-top: 140px;
        padding-left: 18px;
        padding-right: 18px;
      }
      .hero-flex-wrapper {
        gap: 72px;
      }
      .hero-upper {
        flex-direction: column;
        align-items: flex-start;
        gap: 28px;
      }
      .availability-col {
        justify-content: flex-start;
      }
      .hero-lower {
        flex-direction: column;
        align-items: flex-start;
        gap: 32px;
        padding-bottom: 44px;
      }
      .hero-title {
        font-size: clamp(68px, 21vw, 80px);
        line-height: 96px;
        letter-spacing: -4.8px;
      }
      .cta-col {
        padding-left: 0;
      }
      .hero-desc {
        max-width: 420px;
      }
      .workspace-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Fullscreen Crossfade Background Videos -->
  <div class="video-background-container" aria-hidden="true">
    <video class="bg-video active" id="vid-0" autoplay loop muted playsinline preload="auto">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4" type="video/mp4">
    </video>
    <video class="bg-video" id="vid-1" autoplay loop muted playsinline preload="auto">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4" type="video/mp4">
    </video>
    <video class="bg-video" id="vid-2" autoplay loop muted playsinline preload="auto">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4" type="video/mp4">
    </video>
    <div class="video-overlay"></div>
  </div>

  <!-- Navbar -->
  <header>
    <div class="hero-container">
      <div class="navbar-inner">
        <!-- Left: Index Links -->
        <nav class="nav-links-left" aria-label="Main Navigation">
          <a class="nav-item" href="#scanner" onclick="scrollToScanner()">
            <span class="nav-index">01</span>
            <span class="nav-index">/</span>
            <span class="nav-label">Works</span>
            <span class="nav-link-underline"></span>
          </a>
          <a class="nav-item" href="#scanner" onclick="scrollToScanner()">
            <span class="nav-index">02</span>
            <span class="nav-index">/</span>
            <span class="nav-label">Services</span>
            <span class="nav-link-underline"></span>
          </a>
          <a class="nav-item" href="#scanner" onclick="scrollToScanner()">
            <span class="nav-index">03</span>
            <span class="nav-index">/</span>
            <span class="nav-label">About</span>
            <span class="nav-link-underline"></span>
          </a>
          <a class="nav-item" href="#scanner" onclick="scrollToScanner()">
            <span class="nav-index">04</span>
            <span class="nav-index">/</span>
            <span class="nav-label">Contact</span>
            <span class="nav-link-underline"></span>
          </a>
        </nav>

        <!-- Right: Email + Realtime Clock -->
        <div class="nav-right">
          <a href="mailto:Davies@gmail.com" class="nav-email">Davies@gmail.com</a>
          <div class="nav-clock" id="liveClock" aria-label="Current Time">CUP --:--:--</div>
        </div>

        <!-- Mobile Toggle Button -->
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-expanded="false" onclick="toggleMobileNav()">Menu</button>
      </div>
    </div>

    <!-- Mobile Collapsible Nav -->
    <div class="mobile-nav-panel" id="mobileNavPanel">
      <div class="mobile-nav-content">
        <a href="#scanner" class="mobile-nav-link" onclick="toggleMobileNav(); scrollToScanner();">01 / Works</a>
        <a href="#scanner" class="mobile-nav-link" onclick="toggleMobileNav(); scrollToScanner();">02 / Services</a>
        <a href="#scanner" class="mobile-nav-link" onclick="toggleMobileNav(); scrollToScanner();">03 / About</a>
        <a href="#scanner" class="mobile-nav-link" onclick="toggleMobileNav(); scrollToScanner();">04 / Contact</a>
        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-light);">
          <div style="font-size: 13px; opacity: 0.7; margin-bottom: 6px;">Davies@gmail.com</div>
          <div style="font-size: 13px; opacity: 0.9;" id="mobileClock">CUP --:--:--</div>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Content -->
  <main class="hero-section">
    <div class="hero-container hero-flex-wrapper">
      
      <!-- Section 1: Video Switcher + Availability -->
      <section class="hero-upper" aria-label="Experience Switcher">
        <div class="switcher-col">
          <button class="role-link active" onclick="switchVideo(0)" id="switch-0">01 / WATER WAVE</button>
          <button class="role-link" onclick="switchVideo(1)" id="switch-1">02 / GRIDWAVE</button>
          <button class="role-link" onclick="switchVideo(2)" id="switch-2">03 / LIGHT TUNNEL</button>
        </div>

        <div class="availability-col" aria-label="Status">
          <div class="status-dot" id="statusDot"></div>
          <span class="status-text">Available for work</span>
        </div>
      </section>

      <!-- Section 2: Name + CTA -->
      <section class="hero-lower" aria-label="Introduction">
        <div class="name-col">
          <h1 class="hero-title">
            PlantCareAi<span class="title-dot" id="titleDot">.</span>
          </h1>
        </div>

        <div class="cta-col">
          <p class="hero-desc">
            Intelligent Plant Disease Detection & Care Recommendations
          </p>
          <a href="#scanner" class="btn-project" onclick="scrollToScanner()">
            start a project
          </a>
        </div>
      </section>

    </div>
  </main>

  <!-- Interactive AI Diagnostics Workspace -->
  <section class="interactive-panel" id="scanner">
    <div class="hero-container">
      <div class="panel-header">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-pink); font-weight: 600; margin-bottom: 8px;">AI Computer Vision Lab</div>
        <h2 class="panel-title">Precision Botanical Diagnostics</h2>
        <p class="panel-sub">Upload specimen leaves or select sample presets to evaluate pathogen probability, health index, and treatment roadmap.</p>
      </div>

      <div class="workspace-grid">
        <!-- Input Box -->
        <div class="card-box">
          <h3 style="font-size: 18px; margin-bottom: 16px; font-weight: 500;">Specimen Image</h3>
          <div class="upload-zone" onclick="document.getElementById('plantFileInput').click()">
            <div class="upload-icon">📷</div>
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 4px;">Drag & Drop or Click to Select</div>
            <div style="font-size: 13px; color: rgba(255,255,255,0.5);">PNG, JPG, WebP formats up to 10MB</div>
            <input type="file" id="plantFileInput" style="display: none;" accept="image/*">
            <div class="preview-wrap" id="previewWrap">
              <img id="previewImage" alt="Specimen Preview">
              <div class="scan-line" id="scanLine"></div>
            </div>
          </div>

          <div style="margin-top: 18px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="role-link active" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px;" onclick="loadSampleSpecimen('Monstera Deliciosa', 'healthy')">Healthy Monstera</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px;" onclick="loadSampleSpecimen('Tomato Early Blight', 'blight')">Tomato Blight</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px;" onclick="loadSampleSpecimen('Sansevieria Trifasciata', 'dry')">Snake Plant</button>
          </div>

          <button class="btn-action" id="diagnoseBtn" onclick="runDiagnostics()" disabled>
            Execute AI Health Diagnosis
          </button>
        </div>

        <!-- Output Box -->
        <div class="card-box" id="resultsBox">
          <div id="emptyResults" style="text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.4);">
            <div style="font-size: 36px; margin-bottom: 12px;">🌱</div>
            <h4 style="font-size: 16px; color: #fff; margin-bottom: 6px;">Awaiting Image Input</h4>
            <p style="font-size: 13px;">Upload an image on the left and trigger diagnosis to inspect pathological signatures.</p>
          </div>

          <div id="fullResults" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
              <div>
                <h3 id="resPlantName" style="font-size: 24px; font-weight: 600;">Monstera Deliciosa</h3>
                <span id="resScientificName" style="font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic;">Monstera deliciosa</span>
              </div>
              <div style="text-align: right;">
                <div id="resScore" style="font-size: 28px; font-weight: 700; color: var(--accent-pink);">85%</div>
                <div style="font-size: 10px; text-transform: uppercase; color: rgba(255,255,255,0.5);">Health Score</div>
              </div>
            </div>

            <div class="result-badge" id="resStatusBadge">Healthy Foliage</div>

            <p id="resSummary" style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; margin-bottom: 18px; border-left: 2px solid var(--accent-pink);">
              Leaf cellular structure is intact with vibrant chlorophyll distribution and no acute signs of pathogenic necrosis.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
              <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
                <div style="font-size: 11px; text-transform: uppercase; color: rgba(255,255,255,0.5); font-weight: 600;">Watering Strategy</div>
                <div id="resWater" style="font-size: 13px; font-weight: 600; margin-top: 2px;">Dry top 2 inches</div>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
                <div style="font-size: 11px; text-transform: uppercase; color: rgba(255,255,255,0.5); font-weight: 600;">Photometric Exposure</div>
                <div id="resLight" style="font-size: 13px; font-weight: 600; margin-top: 2px;">Bright Indirect</div>
              </div>
            </div>

            <div style="font-size: 11px; text-transform: uppercase; color: rgba(255,255,255,0.5); font-weight: 600; margin-bottom: 8px;">Actionable Prescriptions</div>
            <div id="resRecommendations" style="font-size: 13px; color: rgba(255,255,255,0.75);"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    // -------------------------------------------------------------
    // Realtime 24h Clock (CUP HH:MM:SS)
    // -------------------------------------------------------------
    function updateClock() {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const timeStr = 'CUP ' + formatter.format(now);
      const clockEl = document.getElementById('liveClock');
      const mobileClockEl = document.getElementById('mobileClock');
      if (clockEl) clockEl.textContent = timeStr;
      if (mobileClockEl) mobileClockEl.textContent = timeStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // -------------------------------------------------------------
    // Video Background Switcher & Preload
    // -------------------------------------------------------------
    const videoUrls = [
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4'
    ];

    let activeVideoIndex = 0;

    // Blob Preloader for instant playback
    window.addEventListener('DOMContentLoaded', () => {
      videoUrls.forEach((url, idx) => {
        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            const objectUrl = URL.createObjectURL(blob);
            const vid = document.getElementById('vid-' + idx);
            if (vid) vid.src = objectUrl;
          })
          .catch(() => {
            // Fallback to original URL if blob fetch fails
            const vid = document.getElementById('vid-' + idx);
            if (vid) vid.src = url;
          });
      });
    });

    function switchVideo(index) {
      activeVideoIndex = index;
      
      // Update video opacities
      for (let i = 0; i < 3; i++) {
        const vid = document.getElementById('vid-' + i);
        const btn = document.getElementById('switch-' + i);
        if (vid) {
          if (i === index) vid.classList.add('active');
          else vid.classList.remove('active');
        }
        if (btn) {
          if (i === index) btn.classList.add('active');
          else btn.classList.remove('active');
        }
      }

      // Slide 1 uses Pink (#F598F2), Slides 2-3 use White
      const statusDot = document.getElementById('statusDot');
      const titleDot = document.getElementById('titleDot');
      if (index === 0) {
        if (statusDot) statusDot.classList.remove('white-dot');
        if (titleDot) titleDot.classList.remove('white-dot');
      } else {
        if (statusDot) statusDot.classList.add('white-dot');
        if (titleDot) titleDot.classList.add('white-dot');
      }
    }

    // -------------------------------------------------------------
    // Mobile Nav Toggle
    // -------------------------------------------------------------
    function toggleMobileNav() {
      const panel = document.getElementById('mobileNavPanel');
      const btn = document.getElementById('mobileMenuBtn');
      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        btn.textContent = 'Menu';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        panel.classList.add('open');
        btn.textContent = 'Close';
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    function scrollToScanner() {
      const el = document.getElementById('scanner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    // -------------------------------------------------------------
    // Specimen Diagnostics Logic
    // -------------------------------------------------------------
    let selectedFile = null;
    const fileInput = document.getElementById('plantFileInput');
    const previewWrap = document.getElementById('previewWrap');
    const previewImage = document.getElementById('previewImage');
    const diagnoseBtn = document.getElementById('diagnoseBtn');

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadFile(e.target.files[0]);
      }
    });

    function loadFile(file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewWrap.style.display = 'block';
        diagnoseBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }

    function loadSampleSpecimen(name, status) {
      const c = document.createElement('canvas');
      c.width = 400; c.height = 300;
      const ctx = c.getContext('2d');
      ctx.fillStyle = status === 'healthy' ? '#081c12' : (status === 'blight' ? '#241408' : '#141c18');
      ctx.fillRect(0, 0, 400, 300);
      ctx.fillStyle = '#ffffff';
      ctx.font = '500 22px Figtree, sans-serif';
      ctx.fillText(name, 24, 150);
      c.toBlob(blob => loadFile(blob), 'image/jpeg');
    }

    async function runDiagnostics() {
      if (!selectedFile) return;

      diagnoseBtn.disabled = true;
      diagnoseBtn.textContent = 'Analyzing Vision Signatures...';
      document.getElementById('scanLine').style.display = 'block';

      const fd = new FormData();
      fd.append('image', selectedFile, 'specimen.jpg');

      try {
        const res = await fetch('/scan', { method: 'POST', body: fd });
        const data = await res.json();
        renderResults(data);
      } catch (err) {
        alert('Diagnostic error: ' + err.message);
      } finally {
        diagnoseBtn.disabled = false;
        diagnoseBtn.textContent = 'Execute AI Health Diagnosis';
        document.getElementById('scanLine').style.display = 'none';
      }
    }

    function renderResults(d) {
      document.getElementById('emptyResults').style.display = 'none';
      document.getElementById('fullResults').style.display = 'block';

      document.getElementById('resPlantName').textContent = d.plant_name || 'Houseplant';
      document.getElementById('resScientificName').textContent = d.scientific_name || 'Plantae';
      document.getElementById('resScore').textContent = (d.health_score || 85) + '%';
      
      const badge = document.getElementById('resStatusBadge');
      const st = d.health_status || 'healthy';
      badge.textContent = st.replace('_', ' ').toUpperCase();

      document.getElementById('resSummary').textContent = d.summary || d.ai_explanation || 'Foliage analysis complete.';
      document.getElementById('resWater').textContent = (d.water && d.water.recommendation) || d.water_requirement || 'Allow topsoil to dry';
      document.getElementById('resLight').textContent = (d.light && d.light.recommendation) || d.light_requirement || 'Bright Indirect';

      const recs = document.getElementById('resRecommendations');
      recs.innerHTML = '';
      (d.care_recommendations || ['Maintain standard hydration schedule']).forEach(r => {
        const item = document.createElement('div');
        item.style.marginBottom = '6px';
        item.textContent = '• ' + r;
        recs.appendChild(item);
      });
    }
  </script>
</body>
</html>`;
}

module.exports = { renderDashboardHtml };
