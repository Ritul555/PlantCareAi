function renderDashboardHtml() {

  return `<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>PlantCare AI &mdash; Scan. Detect. Protect.</title>

  

  <!-- Modern Aesthetic Google Fonts -->

  <link rel="preconnect" href="https://fonts.googleapis.com">

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">

  

  <style>

    :root {

      --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

      --accent-pink: #F598F2;

      --accent-pink-glow: rgba(245, 152, 242, 0.35);

      --primary-green: #10b981;

      --primary-light: #34d399;

      --primary-glow: rgba(16, 185, 129, 0.25);

      --bg-dark: #080d0a;

      --bg-surface: #0e1612;

      --card-bg: rgba(14, 22, 18, 0.72);

      --card-border: rgba(255, 255, 255, 0.1);

      --card-border-hover: rgba(52, 211, 153, 0.35);

      --text-white: #ffffff;

      --text-muted: #94a3b8;

      --text-dim: #64748b;

      --radius-sm: 8px;

      --radius-md: 14px;

      --radius-lg: 22px;

      --radius-full: 9999px;

    }



    * {

      box-sizing: border-box;

      margin: 0;

      padding: 0;

      -webkit-font-smoothing: antialiased;

      -moz-osx-font-smoothing: grayscale;

    }



    body {

      font-family: 'Plus Jakarta Sans', 'Figtree', sans-serif;

      background-color: var(--bg-dark);

      color: var(--text-white);

      min-height: 100vh;

      overflow-x: hidden;

      line-height: 1.6;

    }



    h1, h2, h3, h4, .brand-font {

      font-family: 'Outfit', sans-serif;

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

      background: radial-gradient(circle at center, rgba(8, 13, 10, 0.4) 0%, rgba(8, 13, 10, 0.85) 90%);

      z-index: 1;

    }



    /* Container */

    .hero-container {

      max-width: 1340px;

      margin: 0 auto;

      padding-left: 20px;

      padding-right: 20px;

      position: relative;

      z-index: 2;

    }



    /* Navbar */

    header {

      position: fixed;

      top: 0;

      left: 0;

      width: 100%;

      z-index: 100;

      backdrop-filter: blur(20px);

      -webkit-backdrop-filter: blur(20px);

      background: rgba(8, 13, 10, 0.75);

      border-bottom: 1px solid var(--card-border);

      transition: background 0.3s;

    }



    .navbar-inner {

      height: 80px;

      display: flex;

      align-items: center;

      justify-content: space-between;

    }



    .brand-logo {

      display: flex;

      align-items: center;

      gap: 12px;

      text-decoration: none;

      color: var(--text-white);

    }

    .brand-icon-box {

      width: 38px;

      height: 38px;

      border-radius: var(--radius-md);

      background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.5) 100%);

      border: 1px solid rgba(52, 211, 153, 0.4);

      display: flex;

      align-items: center;

      justify-content: center;

      font-size: 18px;

      box-shadow: 0 0 16px var(--primary-glow);

    }

    .brand-title-text {

      font-family: 'Outfit', sans-serif;

      font-size: 22px;

      font-weight: 700;

      letter-spacing: -0.5px;

    }

    .brand-title-text span {

      background: linear-gradient(135deg, #a7f3d0 0%, var(--primary-light) 50%, var(--accent-pink) 100%);

      -webkit-background-clip: text;

      -webkit-text-fill-color: transparent;

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

      padding: 6px 0;

      cursor: pointer;

      background: none;

      border: none;

      font-family: inherit;

    }



    .nav-index {

      font-size: 9px;

      line-height: 12px;

      letter-spacing: -0.05px;

      font-weight: 600;

      text-transform: uppercase;

      opacity: 0.5;

      color: var(--primary-light);

    }



    .nav-label {

      font-size: 13px;

      line-height: 16px;

      letter-spacing: -0.1px;

      font-weight: 600;

      text-transform: uppercase;

    }



    .nav-link-underline {

      position: absolute;

      bottom: 0;

      right: 0;

      width: 100%;

      height: 2px;

      background: linear-gradient(90deg, var(--primary-light), var(--accent-pink));

      transform: scaleX(0);

      transform-origin: right;

      transition: transform 0.35s var(--ease-spring);

    }



    .nav-item:hover .nav-link-underline,

    .nav-item.active .nav-link-underline {

      transform: scaleX(1);

      transform-origin: left;

    }

    .nav-item.active .nav-label {

      color: var(--primary-light);

    }



    .nav-right {

      display: flex;

      align-items: center;

      gap: 20px;

    }



    .contact-badge {

      display: inline-flex;

      align-items: center;

      gap: 8px;

      background: rgba(255, 255, 255, 0.05);

      border: 1px solid var(--card-border);

      padding: 6px 14px;

      border-radius: var(--radius-full);

      font-size: 12px;

      color: var(--text-white);

      text-decoration: none;

      transition: all 0.2s;

    }

    .contact-badge:hover {

      background: rgba(16, 185, 129, 0.12);

      border-color: rgba(52, 211, 153, 0.4);

      color: var(--primary-light);

    }



    .nav-clock {

      font-size: 12px;

      font-weight: 600;

      font-variant-numeric: tabular-nums;

      color: var(--text-muted);

      background: rgba(0, 0, 0, 0.3);

      padding: 6px 12px;

      border-radius: var(--radius-full);

      border: 1px solid var(--card-border);

    }



    .mobile-menu-btn {

      display: none;

      background: transparent;

      border: 1px solid var(--card-border);

      color: var(--text-white);

      padding: 8px 16px;

      border-radius: var(--radius-full);

      font-size: 12px;

      text-transform: uppercase;

      font-weight: 600;

      cursor: pointer;

      font-family: inherit;

    }



    .mobile-nav-panel {

      display: grid;

      grid-template-rows: 0fr;

      transition: grid-template-rows 420ms var(--ease-spring);

      overflow: hidden;

      background: rgba(8, 13, 10, 0.95);

      backdrop-filter: blur(25px);

      border-bottom: 1px solid var(--card-border);

    }

    .mobile-nav-panel.open {

      grid-template-rows: 1fr;

    }

    .mobile-nav-content {

      min-height: 0;

      padding: 0 20px;

    }

    .mobile-nav-panel.open .mobile-nav-content {

      padding: 24px 20px 32px;

    }

    .mobile-nav-link {

      display: block;

      font-size: 24px;

      font-weight: 600;

      text-transform: uppercase;

      color: var(--text-white);

      text-decoration: none;

      margin-bottom: 16px;

      font-family: 'Outfit', sans-serif;

    }



    /* Hero Section */

    .hero-section {

      min-height: 100vh;

      display: flex;

      flex-direction: column;

      justify-content: flex-end;

      padding-top: 160px;

      padding-bottom: 70px;

      position: relative;

      z-index: 2;

    }



    .hero-flex-wrapper {

      display: flex;

      flex-direction: column;

      gap: 120px;

      width: 100%;

    }



    .hero-upper {

      display: flex;

      align-items: flex-end;

      justify-content: space-between;

      width: 100%;

    }



    .switcher-col {

      display: flex;

      gap: 24px;

      flex-wrap: wrap;

    }



    .role-link {

      background: transparent;

      border: none;

      color: var(--text-white);

      cursor: pointer;

      font-family: 'Plus Jakarta Sans', sans-serif;

      font-size: 11px;

      font-weight: 600;

      letter-spacing: 0.05em;

      text-transform: uppercase;

      opacity: 0.5;

      transition: all 0.3s var(--ease-spring);

    }

    .role-link:hover {

      opacity: 0.8;

      transform: translateX(4px);

    }

    .role-link.active {

      opacity: 1;

      color: var(--primary-light);

      transform: translateX(0);

    }



    .availability-col {

      display: flex;

      align-items: center;

      gap: 10px;

    }



    .status-dot {

      width: 8px;

      height: 8px;

      border-radius: 50%;

      background-color: var(--accent-pink);

      box-shadow: 0 0 12px var(--accent-pink-glow);

      animation: dotPulse 1.6s infinite ease-in-out;

      transition: background-color 0.5s, box-shadow 0.5s;

    }

    .status-dot.white-dot {

      background-color: #ffffff;

      box-shadow: 0 0 12px rgba(255, 255, 255, 0.7);

    }



    @keyframes dotPulse {

      0%, 100% { opacity: 1; transform: scale(1); }

      50% { opacity: 0.45; transform: scale(1.45); }

    }



    .hero-lower {

      display: flex;

      align-items: flex-end;

      justify-content: space-between;

      width: 100%;

    }



    .name-col {

      flex: 2;

    }



    /* Aesthetic Gradient Typography for PlantCareAi */

    .hero-title {

      font-family: 'Outfit', sans-serif;

      font-size: clamp(64px, 10vw, 140px);

      line-height: 88%;

      letter-spacing: -0.04em;

      font-weight: 800;

      text-transform: uppercase;

      margin: 0;

      white-space: nowrap;

      background: linear-gradient(135deg, #ffffff 0%, #d1fae5 50%, #6ee7b7 100%);

      -webkit-background-clip: text;

      -webkit-text-fill-color: transparent;

      animation: revealUp 0.9s var(--ease-spring) forwards;

    }



    .hero-title .title-dot {

      color: var(--accent-pink);

      -webkit-text-fill-color: var(--accent-pink);

      transition: color 0.5s;

    }

    .hero-title .title-dot.white-dot {

      color: #ffffff;

      -webkit-text-fill-color: #ffffff;

    }



    .cta-col {

      flex: 1;

      padding-left: 50px;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      gap: 20px;

    }



    .hero-desc {

      font-size: 16px;

      line-height: 24px;

      letter-spacing: -0.16px;

      font-weight: 500;

      color: rgba(255, 255, 255, 0.85);

      max-width: 380px;

      animation: revealRight 0.9s var(--ease-spring) forwards;

    }



    .btn-project {

      position: relative;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      padding: 13px 28px;

      border: 1px solid rgba(255, 255, 255, 0.3);

      border-radius: var(--radius-full);

      background: transparent;

      color: #ffffff;

      font-size: 14px;

      font-weight: 600;

      text-decoration: none;

      cursor: pointer;

      overflow: hidden;

      transition: all 0.4s var(--ease-spring);

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

      box-shadow: 0 0 20px var(--accent-pink-glow);

    }

    .btn-project:hover::before {

      transform: translateY(0);

    }



    @keyframes revealUp {

      from { opacity: 0; transform: translateY(60px); }

      to { opacity: 1; transform: translateY(0); }

    }

    @keyframes revealRight {

      from { opacity: 0; transform: translateX(80px); }

      to { opacity: 1; transform: translateX(0); }

    }



    /* Content Views (Works, Services, About, Contact) */

    .page-section {

      padding: 100px 0 120px;

      position: relative;

      z-index: 10;

      background: rgba(8, 13, 10, 0.92);

      backdrop-filter: blur(30px);

      -webkit-backdrop-filter: blur(30px);

      border-top: 1px solid var(--card-border);

    }



    .section-eyebrow {

      font-size: 12px;

      text-transform: uppercase;

      letter-spacing: 0.12em;

      color: var(--primary-light);

      font-weight: 700;

      margin-bottom: 10px;

    }



    .section-heading {

      font-family: 'Outfit', sans-serif;

      font-size: 42px;

      font-weight: 800;

      line-height: 1.15;

      letter-spacing: -1px;

      margin-bottom: 16px;

    }



    .section-heading span {

      background: linear-gradient(135deg, #a7f3d0 0%, var(--primary-light) 50%, var(--accent-pink) 100%);

      -webkit-background-clip: text;

      -webkit-text-fill-color: transparent;

    }



    .section-sub {

      font-size: 16px;

      color: var(--text-muted);

      max-width: 620px;

      margin-bottom: 48px;

    }



    /* Box / Card Grids */

    .box-grid {

      display: grid;

      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));

      gap: 24px;

    }



    .feature-box {

      background: var(--card-bg);

      border: 1px solid var(--card-border);

      border-radius: var(--radius-lg);

      padding: 32px;

      transition: all 0.3s var(--ease-spring);

      position: relative;

      overflow: hidden;

    }

    .feature-box:hover {

      border-color: var(--card-border-hover);

      transform: translateY(-4px);

      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);

    }



    .feature-box-icon {

      width: 48px;

      height: 48px;

      border-radius: var(--radius-md);

      background: rgba(16, 185, 129, 0.12);

      border: 1px solid rgba(52, 211, 153, 0.3);

      display: flex;

      align-items: center;

      justify-content: center;

      font-size: 22px;

      margin-bottom: 20px;

      color: var(--primary-light);

    }



    .feature-box h3 {

      font-size: 20px;

      font-weight: 700;

      margin-bottom: 10px;

    }



    .feature-box p {

      font-size: 14px;

      color: var(--text-muted);

      line-height: 1.6;

    }



    .feature-tag {

      display: inline-block;

      padding: 4px 10px;

      border-radius: var(--radius-full);

      font-size: 11px;

      font-weight: 700;

      text-transform: uppercase;

      background: rgba(255, 255, 255, 0.05);

      color: var(--primary-light);

      margin-top: 16px;

    }



    /* Scanner Interactive Layout in Works */

    .scanner-workspace-grid {

      display: grid;

      grid-template-columns: 1fr 1fr;

      gap: 28px;

      margin-top: 40px;

    }



    .dropzone-aesthetic {

      border: 2px dashed rgba(52, 211, 153, 0.3);

      border-radius: var(--radius-lg);

      padding: 40px 24px;

      text-align: center;

      cursor: pointer;

      transition: all 0.3s;

      background: rgba(0, 0, 0, 0.3);

      position: relative;

      overflow: hidden;

    }

    .dropzone-aesthetic:hover {

      border-color: var(--primary-light);

      background: rgba(16, 185, 129, 0.05);

    }



    .preview-box-aesthetic {

      display: none;

      margin-top: 16px;

      border-radius: var(--radius-md);

      overflow: hidden;

      max-height: 260px;

      position: relative;

      border: 1px solid var(--card-border);

    }

    .preview-box-aesthetic img {

      width: 100%;

      height: 260px;

      object-fit: cover;

    }



    .scan-beam-laser {

      position: absolute;

      top: 0;

      left: 0;

      width: 100%;

      height: 3px;

      background: linear-gradient(90deg, transparent, var(--primary-light), var(--accent-pink), transparent);

      box-shadow: 0 0 15px var(--accent-pink);

      display: none;

      animation: laserAnim 2s infinite ease-in-out;

    }

    @keyframes laserAnim {

      0% { top: 0; }

      50% { top: 98%; }

      100% { top: 0; }

    }



    .btn-emerald {

      width: 100%;

      margin-top: 20px;

      padding: 14px;

      border-radius: var(--radius-md);

      background: linear-gradient(135deg, var(--primary-green) 0%, #059669 100%);

      color: #041a10;

      font-size: 14px;

      font-weight: 700;

      border: none;

      cursor: pointer;

      transition: all 0.2s;

    }

    .btn-emerald:hover:not(:disabled) {

      box-shadow: 0 0 20px var(--primary-glow);

      transform: translateY(-2px);

    }

    .btn-emerald:disabled {

      opacity: 0.5;

      cursor: not-allowed;

    }



    /* About Cards */

    .about-lead-box {

      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(245, 152, 242, 0.05) 100%);

      border: 1px solid var(--card-border-hover);

      border-radius: var(--radius-lg);

      padding: 36px;

      margin-bottom: 36px;

    }

    .about-lead-box p {

      font-size: 17px;

      line-height: 1.7;

      color: rgba(255, 255, 255, 0.9);

    }



    .offerings-list {

      display: grid;

      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

      gap: 16px;

      margin-top: 24px;

    }

    .offering-item {

      display: flex;

      align-items: center;

      gap: 12px;

      background: var(--card-bg);

      border: 1px solid var(--card-border);

      border-radius: var(--radius-md);

      padding: 16px 20px;

      font-size: 14px;

      font-weight: 600;

    }

    .offering-item-icon {

      color: var(--primary-light);

      font-size: 18px;

    }



    /* Contact Details Cards */

    .contact-grid {

      display: grid;

      grid-template-columns: 1fr 1fr;

      gap: 32px;

    }



    .contact-card {

      background: var(--card-bg);

      border: 1px solid var(--card-border);

      border-radius: var(--radius-lg);

      padding: 36px;

    }



    .contact-info-row {

      display: flex;

      align-items: center;

      gap: 16px;

      margin-bottom: 24px;

    }

    .contact-info-icon {

      width: 44px;

      height: 44px;

      border-radius: 50%;

      background: rgba(16, 185, 129, 0.12);

      border: 1px solid rgba(52, 211, 153, 0.3);

      display: flex;

      align-items: center;

      justify-content: center;

      font-size: 20px;

      color: var(--primary-light);

    }

    .contact-info-label {

      font-size: 12px;

      text-transform: uppercase;

      color: var(--text-dim);

      font-weight: 700;

      letter-spacing: 0.5px;

    }

    .contact-info-val {

      font-size: 16px;

      font-weight: 600;

      color: var(--text-white);

    }

    .contact-info-val a {

      color: var(--primary-light);

      text-decoration: none;

    }



    .contact-reasons-list {

      display: grid;

      grid-template-columns: 1fr 1fr;

      gap: 12px;

      margin-top: 20px;

    }

    .reason-pill {

      background: rgba(255, 255, 255, 0.04);

      border: 1px solid var(--card-border);

      border-radius: var(--radius-sm);

      padding: 10px 14px;

      font-size: 13px;

      font-weight: 500;

      color: rgba(255, 255, 255, 0.85);

    }



    /* Footer */

    footer {

      border-top: 1px solid var(--card-border);

      padding: 40px 0;

      background: #050806;

      text-align: center;

      font-size: 13px;

      color: var(--text-dim);

      position: relative;

      z-index: 10;

    }



    /* Toast */

    .toast-popup {

      position: fixed;

      bottom: 24px;

      right: 24px;

      background: #10b981;

      color: #04140b;

      font-weight: 700;

      padding: 12px 24px;

      border-radius: var(--radius-full);

      box-shadow: 0 10px 25px rgba(0,0,0,0.5);

      z-index: 1000;

      display: none;

      animation: fadeIn 0.3s ease;

    }



    /* Responsive */

    @media (max-width: 900px) {

      .navbar-inner { height: 70px; }

      .nav-links-left, .nav-right { display: none; }

      .mobile-menu-btn { display: block; }

      .hero-flex-wrapper { gap: 60px; }

      .hero-upper { flex-direction: column; align-items: flex-start; gap: 20px; }

      .hero-lower { flex-direction: column; align-items: flex-start; gap: 28px; }

      .cta-col { padding-left: 0; }

      .scanner-workspace-grid, .contact-grid { grid-template-columns: 1fr; }

      .contact-reasons-list { grid-template-columns: 1fr; }

      .section-heading { font-size: 32px; }

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

        <!-- Logo -->

        <a href="#home" class="brand-logo" onclick="navigateTo('home')">

          <div class="brand-icon-box"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path><path d="M12 11c3.5 0 6-2 6-5"></path></svg></div>

          <div class="brand-title-text">PlantCare<span>Ai</span></div>

        </a>



        <!-- Left Links: 01/Works, 02/Services, 03/About, 04/Contact -->

        <nav class="nav-links-left" aria-label="Main Navigation">

          <button class="nav-item active" id="nav-btn-home" onclick="navigateTo('home')">

            <span class="nav-index">00</span>

            <span class="nav-index">/</span>

            <span class="nav-label">Home</span>

            <span class="nav-link-underline"></span>

          </button>

          <button class="nav-item" id="nav-btn-works" onclick="navigateTo('works')">

            <span class="nav-index">01</span>

            <span class="nav-index">/</span>

            <span class="nav-label">Works</span>

            <span class="nav-link-underline"></span>

          </button>

          <button class="nav-item" id="nav-btn-services" onclick="navigateTo('services')">

            <span class="nav-index">02</span>

            <span class="nav-index">/</span>

            <span class="nav-label">Services</span>

            <span class="nav-link-underline"></span>

          </button>

          <button class="nav-item" id="nav-btn-about" onclick="navigateTo('about')">

            <span class="nav-index">03</span>

            <span class="nav-index">/</span>

            <span class="nav-label">About</span>

            <span class="nav-link-underline"></span>

          </button>

          <button class="nav-item" id="nav-btn-contact" onclick="navigateTo('contact')">

            <span class="nav-index">04</span>

            <span class="nav-index">/</span>

            <span class="nav-label">Contact</span>

            <span class="nav-link-underline"></span>

          </button>

        </nav>



        <!-- Right Side: Contact Details + Clock -->

        <div class="nav-right">

          <a href="mailto:ritul.gautam24@gmail.com" class="contact-badge" title="Click to email ritul.gautam24@gmail.com">

            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>

            <span>ritul.gautam24@gmail.com</span>

          </a>

          <div class="contact-badge">

            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> India</span>

          </div>

          <div class="nav-clock" id="liveClock" aria-label="Current Time">CUP --:--:--</div>

        </div>



        <!-- Mobile Menu Toggle Button -->

        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-expanded="false" onclick="toggleMobileNav()">Menu</button>

      </div>

    </div>



    <!-- Mobile Collapsible Nav -->

    <div class="mobile-nav-panel" id="mobileNavPanel">

      <div class="mobile-nav-content">

        <a href="#home" class="mobile-nav-link" onclick="toggleMobileNav(); navigateTo('home');">00 / Home</a>

        <a href="#works" class="mobile-nav-link" onclick="toggleMobileNav(); navigateTo('works');">01 / Works</a>

        <a href="#services" class="mobile-nav-link" onclick="toggleMobileNav(); navigateTo('services');">02 / Services</a>

        <a href="#about" class="mobile-nav-link" onclick="toggleMobileNav(); navigateTo('about');">03 / About</a>

        <a href="#contact" class="mobile-nav-link" onclick="toggleMobileNav(); navigateTo('contact');">04 / Contact</a>

        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--card-border);">

          <div style="font-size: 13px; color: var(--primary-light); margin-bottom: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ritul.gautam24@gmail.com</div>

          <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> India</div>

          <div style="font-size: 12px; color: var(--text-dim);" id="mobileClock">CUP --:--:--</div>

        </div>

      </div>

    </div>

  </header>



  <!-- 00 / Hero Section -->

  <main class="hero-section" id="section-home">

    <div class="hero-container hero-flex-wrapper">

      

      <!-- Video Switcher + Availability -->

      <section class="hero-upper" aria-label="Experience Switcher">

        <div class="switcher-col">

          <button class="role-link active" onclick="switchVideo(0)" id="switch-0">01 / WATER WAVE</button>

          <button class="role-link" onclick="switchVideo(1)" id="switch-1">02 / GRIDWAVE</button>

          <button class="role-link" onclick="switchVideo(2)" id="switch-2">03 / LIGHT TUNNEL</button>

        </div>



        <div class="availability-col" aria-label="Status">

          <div class="status-dot" id="statusDot"></div>

          <span style="font-size: 13px; font-weight: 600; letter-spacing: -0.1px;">AI Diagnostics Online</span>

        </div>

      </section>



      <!-- PlantCareAi Name + CTA -->

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

          <a href="#works" class="btn-project" onclick="navigateTo('works')">

            explore works & scanner

          </a>

        </div>

      </section>



    </div>

  </main>



  <!-- 01 / Works Page Section (Box Format) -->

  <section class="page-section" id="section-works">

    <div class="hero-container">

      <div class="section-eyebrow">01 / Works Showcase</div>

      <h2 class="section-heading">Platform Capabilities & <span>Live AI Scanner</span></h2>

      <p class="section-sub">Experience precision computer vision and automated diagnostics built into a responsive, intuitive interface.</p>



      <!-- Works in Box Format -->

      <div class="box-grid">

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 22a7 7 0 1 0 0-14h-1"></path><path d="M9 14h2"></path><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path></svg></div>

          <h3>Gemini Vision AI Engine</h3>

          <p>Processes high-resolution leaf imagery through multi-layer convolutional networks to extract pathological signatures in under 2 seconds.</p>

          <span class="feature-tag">Realtime Inference</span>

        </div>



        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg></div>

          <h3>548 Health Condition Models</h3>

          <p>Distinguishes nutrient deficiencies, fungal blight, bacterial wilt, spider mites, and physiological irrigation stress with acute precision.</p>

          <span class="feature-tag">Pathology Database</span>

        </div>



        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg></div>

          <h3>Garden Collection & IoT Telemetry</h3>

          <p>Organize monitored houseplants, track scheduled hydration cycles, and synchronize ambient environmental sensor telemetry.</p>

          <span class="feature-tag">Sensor Sync</span>

        </div>

      </div>



      <!-- Live Interactive AI Scanner Workstation -->

      <div class="scanner-workspace-grid">

        <div class="feature-box">

          <h3 style="margin-bottom: 6px;">Live Specimen Diagnosis</h3>

          <p style="font-size: 13px; margin-bottom: 16px;">Select or drop a plant leaf image to run automated diagnostics.</p>



          <div class="dropzone-aesthetic" id="dropzone" onclick="document.getElementById('fileInput').click()">

            <div style="font-size: 36px; margin-bottom: 10px;"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></div>

            <div style="font-weight: 600; font-size: 15px; margin-bottom: 4px;">Click or Drag Leaf Image</div>

            <div style="font-size: 12px; color: var(--text-dim);">PNG, JPG, WebP up to 10MB</div>

            <input type="file" id="fileInput" style="display: none;" accept="image/*">

            <div class="preview-box-aesthetic" id="previewBox">

              <img id="previewImage" alt="Preview">

              <div class="scan-beam-laser" id="scanBeam"></div>

            </div>

          </div>



                    <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="role-link active" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Monstera Deliciosa', 'healthy', 'monstera_healthy.jpg')">🌿 Monstera (Healthy)</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Tomato Early Blight', 'blight', 'tomato_early_blight.jpg')">🍅 Tomato (Blight)</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Potato Late Blight', 'late_blight', 'potato_late_blight.jpg')">🥔 Potato (Late Blight)</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Apple Cedar Rust', 'rust', 'apple_cedar_rust.jpg')">🍎 Apple (Rust)</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Rose Black Spot', 'black_spot', 'rose_black_spot.jpg')">🌹 Rose (Black Spot)</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Citrus Canker', 'canker', 'citrus_canker.jpg')">🍋 Citrus (Canker)</button>
            <button class="role-link" style="padding: 6px 12px; background: rgba(255,255,255,0.06); border-radius: 9999px; font-size: 12px;" onclick="loadSample('Sansevieria', 'dry', 'sansevieria_dry.jpg')">🪴 Snake Plant (Dry)</button>
          </div>



          <button class="btn-emerald" id="scanBtn" onclick="executeDiagnosis()" disabled>

            Execute AI Health Diagnosis

          </button>

        </div>



        <div class="feature-box" id="resultContainer">

          <div id="resultEmpty" style="text-align: center; padding: 60px 20px; color: var(--text-dim);">

            <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.4;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="1.8" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path></svg></div>

            <h4 style="font-size: 16px; color: #fff; margin-bottom: 6px;">Awaiting Plant Image</h4>

            <p style="font-size: 13px;">Upload an image or choose a preset to view comprehensive health classification.</p>

          </div>



          <div id="resultCard" style="display: none;">

            <!-- Header with Plant Name & Confidence -->

            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; border-bottom: 1px solid var(--card-border); padding-bottom: 16px;">

              <div>

                <div style="font-size: 11px; text-transform: uppercase; color: var(--primary-light); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 2px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path><path d="M12 11c3.5 0 6-2 6-5"></path></svg> Plant Name</div>

                <h3 id="resPlantName" style="font-size: 26px; font-weight: 800; font-family: 'Outfit', sans-serif;">Monstera Deliciosa</h3>

                <div id="resScientific" style="font-size: 13px; color: var(--text-dim); font-style: italic;">Monstera deliciosa</div>

              </div>

              <div style="text-align: right;">

                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 700; margin-bottom: 2px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg> Confidence</div>

                <div id="resConfidence" style="font-size: 20px; font-weight: 800; color: #6ee7b7;">98.4%</div>

              </div>

            </div>



            <!-- Health Status & Disease Detected -->

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">

              <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: var(--radius-md); padding: 12px 14px;">

                <div style="font-size: 11px; text-transform: uppercase; color: var(--primary-light); font-weight: 700;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg> Health Status</div>

                <div id="resHealthStatus" style="font-size: 15px; font-weight: 700; color: #ffffff; margin-top: 2px;">Healthy (96%)</div>

              </div>

              <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 12px 14px;">

                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="6"></circle><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> Disease</div>

                <div id="resDisease" style="font-size: 15px; font-weight: 700; color: #a7f3d0; margin-top: 2px;">No Disease Detected</div>

              </div>

            </div>



            <!-- Environmental & Care Vitals (Water, Sunlight, Temp, Soil, Next Watering) -->

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 18px;">

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: 10px 12px;">

                <div style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg> Water</div>

                <div id="resWater" style="font-size: 13px; font-weight: 600; color: #fff; margin-top: 2px;">Every 5&ndash;7 Days</div>

              </div>

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: 10px 12px;">

                <div style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line></svg> Sunlight</div>

                <div id="resLight" style="font-size: 13px; font-weight: 600; color: #fff; margin-top: 2px;">Bright Indirect Light</div>

              </div>

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: 10px 12px;">

                <div style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg> Temperature</div>

                <div id="resTemp" style="font-size: 13px; font-weight: 600; color: #fff; margin-top: 2px;">20&ndash;28&deg;C</div>

              </div>

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: 10px 12px;">

                <div style="font-size: 10px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="1.8" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path></svg> Soil</div>

                <div id="resSoil" style="font-size: 13px; font-weight: 600; color: #fff; margin-top: 2px;">Well-draining Potting Mix</div>

              </div>

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: 10px 12px;">

                <div style="font-size: 10px; text-transform: uppercase; color: var(--accent-pink); font-weight: 700;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Next Watering</div>

                <div id="resNextWater" style="font-size: 13px; font-weight: 600; color: #fff; margin-top: 2px;">After 6 Days</div>

              </div>

            </div>



            <!-- Treatment & Prevention Box -->

            <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px;">

              <div style="margin-bottom: 10px;">

                <div style="font-size: 11px; text-transform: uppercase; color: var(--primary-light); font-weight: 700;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg> Treatment</div>

                <div id="resTreatment" style="font-size: 13px; color: rgba(255,255,255,0.9); margin-top: 2px;">No treatment required</div>

              </div>

              <div>

                <div style="font-size: 11px; text-transform: uppercase; color: #fbbf24; font-weight: 700;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Prevention</div>

                <div id="resPrevention" style="font-size: 13px; color: rgba(255,255,255,0.9); margin-top: 2px;">Avoid overwatering and clean leaves regularly.</div>

              </div>

            </div>



            <!-- AI Recommendation -->

            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 152, 242, 0.08) 100%); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: var(--radius-md); padding: 14px 16px;">

              <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-pink); font-weight: 700; letter-spacing: 0.05em;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg> AI Recommendation</div>

              <div id="resAiRec" style="font-size: 14px; font-weight: 600; color: #ffffff; margin-top: 4px;">Continue current care routine for optimal growth.</div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>



  <!-- 02 / Services Page Section -->

  <section class="page-section" id="section-services">

    <div class="hero-container">

      <div class="section-eyebrow">02 / Services Provided</div>

      <h2 class="section-heading">Comprehensive <span>Botanical Solutions</span></h2>

      <p class="section-sub">State-of-the-art identification, diagnostic models, and B2B API integrations tailored for agriculture, gardeners, and enterprises.</p>



      <div class="box-grid">

        <!-- Service 1 -->

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>

          <h3>Identify Plants in Seconds</h3>

          <p>Take multiple photos of your plant, upload them and let us work our magic. This web demo allows you to identify up to 10 plants per month for free.</p>

          <span class="feature-tag">Free Tier Included</span>

        </div>



        <!-- Service 2 -->

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path><path d="M12 11c3.5 0 6-2 6-5"></path></svg></div>

          <h3>Plenty of Plants (35,000+ Taxa)</h3>

          <p>Accurately identify more than 35,000 taxa of plants, mushrooms and lichen from around the world. We give you the common name, a short description and the classification of your plant in addition to the scientific (Latin) name.</p>

          <span class="feature-tag">Global Taxa Database</span>

        </div>



        <!-- Service 3 -->

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg></div>

          <h3>Plant Diseases (548 Conditions)</h3>

          <p>Is your plant sick? Could it be due to pests or a fungal disease, or is it simply overwatered? Our plant health engine can tell the difference! It can detect 548 different plant health conditions.</p>

          <span class="feature-tag">Pathology Diagnostics</span>

        </div>



        <!-- Service 4 -->

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>

          <h3>Power of Machine Learning (90%+ Accuracy)</h3>

          <p>We use cutting-edge methods of machine learning (aka artificial intelligence) and train custom deep convolutional neural networks to ensure the best possible results. We estimate that we get the plant name right 90% of the time.</p>

          <span class="feature-tag">Deep Neural Networks</span>

        </div>



        <!-- Service 5 -->

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>

          <h3>PlantCare & Plant.id API</h3>

          <p>Are you in the business of agriculture, the environment, or a smart garden and you need to identify plants and plant diseases? We offer our identification engine via API and custom solutions to meet your needs.</p>

          <span class="feature-tag">B2B REST Endpoints</span>

        </div>



        <!-- Service 6 -->

        <div class="feature-box">

          <div class="feature-box-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg></div>

          <h3>Batch Identification</h3>

          <p>Want to identify multiple images at once? Whether you're a student, hobbyist or have a collection of images to identify, our Batch Identification feature simplifies bulk processing&mdash;no complicated setup needed.</p>

          <span class="feature-tag">Bulk Processing</span>

        </div>

      </div>

    </div>

  </section>



  <!-- 03 / About Page Section -->

  <section class="page-section" id="section-about">

    <div class="hero-container">

      <div class="section-eyebrow">03 / About Us</div>

      <h2 class="section-heading">About <span>PlantCare AI</span></h2>

      

      <div class="about-lead-box">

        <p>

          <strong>PlantCare AI</strong> is an intelligent plant disease detection platform that leverages <strong>Artificial Intelligence, Deep Learning, and Computer Vision</strong> to analyze plant leaf images and provide accurate health assessments. By simply uploading a leaf image, users can instantly identify plant diseases, evaluate severity, and receive personalized treatment and prevention recommendations.

        </p>

        <p style="margin-top: 16px;">

          Our mission is to make plant healthcare smarter, faster, and more accessible for farmers, gardeners, researchers, and plant enthusiasts. Through early disease detection and AI-driven insights, PlantCare AI helps users reduce crop loss, improve plant health, and promote sustainable agriculture.

        </p>

      </div>



      <div style="margin-top: 40px;">

        <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path><path d="M12 11c3.5 0 6-2 6-5"></path></svg> What We Offer</h3>

        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px;">Comprehensive capabilities designed for precision agricultural care:</p>



        <div class="offerings-list">

          <div class="offering-item">

            <span class="offering-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg></span>

            <span>AI-powered plant disease detection</span>

          </div>

          <div class="offering-item">

            <span class="offering-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg></span>

            <span>Instant health analysis from leaf images</span>

          </div>

          <div class="offering-item">

            <span class="offering-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg></span>

            <span>Disease confidence score & severity assessment</span>

          </div>

          <div class="offering-item">

            <span class="offering-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg></span>

            <span>Personalized treatment recommendations</span>

          </div>

          <div class="offering-item">

            <span class="offering-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg></span>

            <span>Preventive care and plant protection tips</span>

          </div>

          <div class="offering-item">

            <span class="offering-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg></span>

            <span>Fast, accurate, and user-friendly diagnosis</span>

          </div>

        </div>

      </div>



      <div class="feature-box" style="margin-top: 40px; border-left: 4px solid var(--accent-pink);">

        <h3 style="font-size: 22px; margin-bottom: 10px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path></svg> Our Vision</h3>

        <p style="font-size: 15px; color: rgba(255, 255, 255, 0.9);">

          To empower modern agriculture with intelligent technology by providing accessible, reliable, and efficient plant health solutions that support healthier crops and a more sustainable future.

        </p>

        <div style="font-weight: 700; color: var(--primary-light); margin-top: 14px; font-size: 16px;">

          PlantCare AI &mdash; Scan. Detect. Protect.

        </div>

      </div>

    </div>

  </section>



  <!-- 04 / Contact Page Section -->

  <section class="page-section" id="section-contact">

    <div class="hero-container">

      <div class="section-eyebrow">04 / Contact Details</div>

      <h2 class="section-heading">Contact Us & <span>Get in Touch</span></h2>

      <p class="section-sub">Have questions, feedback, or suggestions? We'd love to hear from you. Whether you're experiencing an issue, have ideas for new features, or simply want to learn more about PlantCare AI, feel free to reach out.</p>



      <div class="contact-grid">

        <!-- Direct Contact Info -->

        <div class="contact-card">

          <h3 style="font-size: 22px; margin-bottom: 24px;">Direct Contact Information</h3>

          

          <div class="contact-info-row">

            <div class="contact-info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>

            <div>

              <div class="contact-info-label">Official Email</div>

              <div class="contact-info-val">

                <a href="mailto:ritul.gautam24@gmail.com">ritul.gautam24@gmail.com</a>

              </div>

            </div>

          </div>



          <div class="contact-info-row">

            <div class="contact-info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>

            <div>

              <div class="contact-info-label">Headquarters / Location</div>

              <div class="contact-info-val">India</div>

            </div>

          </div>



          <div class="contact-info-row">

            <div class="contact-info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>

            <div>

              <div class="contact-info-label">Website & Links</div>

              <div class="contact-info-val">

                <a href="http://www.plantcareai.com/" target="_blank">www.plantcareai.com</a>

              </div>

            </div>

          </div>



          <div class="contact-info-row">

            <div class="contact-info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></div>

            <div>

              <div class="contact-info-label">LinkedIn</div>

              <div class="contact-info-val">

                <a href="https://linkedin.com/company/plantcareai" target="_blank">linkedin.com/company/plantcareai</a>

              </div>

            </div>

          </div>

        </div>



        <!-- Why Contact Us & Promise -->

        <div class="contact-card">

          <h3 style="font-size: 22px; margin-bottom: 12px;">Why Contact Us?</h3>

          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">We actively assist researchers, farmers, and enthusiasts with:</p>



          <div class="contact-reasons-list">

            <div class="reason-pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> Technical Support</div>

            <div class="reason-pill"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path><path d="M12 11c3.5 0 6-2 6-5"></path></svg> Plant Diagnosis Assistance</div>

            <div class="reason-pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg> Feature Requests & Suggestions</div>

            <div class="reason-pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Collaboration Opportunities</div>

            <div class="reason-pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> General Inquiries</div>

          </div>



          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--card-border);">

            <h4 style="font-size: 16px; margin-bottom: 8px; color: var(--primary-light);">Our Promise</h4>

            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">

              We are committed to providing timely support and continuously improving PlantCare AI to deliver a smarter, faster, and more reliable plant health diagnosis experience.

            </p>

            <div style="margin-top: 12px; font-weight: 700; font-size: 13px; color: #fff;">

              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="1.8" style="display:inline-block;vertical-align:middle;"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"></path><path d="M12 2v18"></path></svg> PlantCare AI &mdash; Helping Plants Thrive with the Power of Artificial Intelligence.

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>



  <!-- Toast Notification -->

  <div class="toast-popup" id="toast">Copied to clipboard!</div>



  <!-- Footer -->

  <footer>

    <div class="hero-container">

      <p style="font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 6px;">PlantCare AI &mdash; Scan. Detect. Protect.</p>

      <p style="font-size: 12px;">Contact: <a href="mailto:ritul.gautam24@gmail.com" style="color: var(--primary-light); text-decoration: none;">ritul.gautam24@gmail.com</a> &bull; India</p>

    </div>

  </footer>



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

            const vid = document.getElementById('vid-' + idx);

            if (vid) vid.src = url;

          });

      });

    });



    function switchVideo(index) {

      for (let i = 0; i < 3; i++) {

        const vid = document.getElementById('vid-' + i);

        const btn = document.getElementById('switch-' + i);

        if (vid) vid.classList.toggle('active', i === index);

        if (btn) vid ? btn.classList.toggle('active', i === index) : null;

      }



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

    // Page / Section Navigation

    // -------------------------------------------------------------

    function navigateTo(sectionId) {

      document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

      const activeBtn = document.getElementById('nav-btn-' + sectionId);

      if (activeBtn) activeBtn.classList.add('active');



      const el = document.getElementById('section-' + sectionId);

      if (el) {

        el.scrollIntoView({ behavior: 'smooth' });

      }

    }



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



    // -------------------------------------------------------------

    // AI Scanner Workstation Logic

    // -------------------------------------------------------------

    let activeFile = null;

    const fileInput = document.getElementById('fileInput');

    const previewBox = document.getElementById('previewBox');

    const previewImage = document.getElementById('previewImage');

    const scanBtn = document.getElementById('scanBtn');



    fileInput.addEventListener('change', (e) => {

      if (e.target.files && e.target.files[0]) {

        loadFile(e.target.files[0]);

      }

    });



    const dropzone = document.getElementById('dropzone');

    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); });

    dropzone.addEventListener('drop', (e) => {

      e.preventDefault();

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {

        loadFile(e.dataTransfer.files[0]);

      }

    });



    function loadFile(file) {

      activeFile = file;

      const reader = new FileReader();

      reader.onload = (e) => {

        previewImage.src = e.target.result;

        previewBox.style.display = 'block';

        scanBtn.disabled = false;

      };

      reader.readAsDataURL(file);

    }



    function loadSample(name, status, filename) {
      const c = document.createElement('canvas');
      c.width = 400; c.height = 300;
      const ctx = c.getContext('2d');

      const bgGrad = ctx.createLinearGradient(0, 0, 400, 300);
      if (status === 'healthy') {
        bgGrad.addColorStop(0, '#062817');
        bgGrad.addColorStop(1, '#02120b');
      } else if (status === 'blight' || status === 'late_blight') {
        bgGrad.addColorStop(0, '#361806');
        bgGrad.addColorStop(1, '#150902');
      } else if (status === 'rust') {
        bgGrad.addColorStop(0, '#422105');
        bgGrad.addColorStop(1, '#1b0d02');
      } else if (status === 'black_spot' || status === 'canker') {
        bgGrad.addColorStop(0, '#24141d');
        bgGrad.addColorStop(1, '#0e050b');
      } else {
        bgGrad.addColorStop(0, '#102219');
        bgGrad.addColorStop(1, '#050c08');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 400, 300);

      ctx.strokeStyle = status === 'healthy' ? 'rgba(52, 211, 153, 0.4)' : 'rgba(245, 152, 242, 0.3)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(200, 150, 140, 80, Math.PI / 4, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 22px Outfit, sans-serif';
      ctx.fillText(name, 28, 140);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '500 13px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Specimen: ' + (filename || 'leaf.jpg'), 28, 170);

      c.toBlob(blob => {
        const fname = filename || (name.toLowerCase().replace(/\s+/g, '_') + '.jpg');
        const file = new File([blob], fname, { type: 'image/jpeg' });
        loadFile(file);
      }, 'image/jpeg');
    }

    async function executeDiagnosis() {
      if (!activeFile) return;

      scanBtn.disabled = true;
      scanBtn.textContent = 'Analyzing Pathological Signatures...';
      document.getElementById('scanBeam').style.display = 'block';

      const fd = new FormData();
      fd.append('image', activeFile, activeFile.name || 'leaf_specimen.jpg');

      try {
        const res = await fetch('/scan', { method: 'POST', body: fd });
        const data = await res.json();
        renderResults(data);
      } catch (err) {
        alert('Diagnosis error: ' + err.message);
      } finally {
        scanBtn.disabled = false;
        scanBtn.textContent = 'Execute AI Health Diagnosis';
        document.getElementById('scanBeam').style.display = 'none';
      }
    }

    function renderResults(d) {

      document.getElementById('resultEmpty').style.display = 'none';

      document.getElementById('resultCard').style.display = 'block';



      document.getElementById('resPlantName').textContent = d.plant_name || 'Monstera Deliciosa';

      document.getElementById('resScientific').textContent = d.scientific_name || 'Monstera deliciosa';

      document.getElementById('resConfidence').textContent = d.confidence || (typeof d.identification_confidence === 'number' ? ((d.identification_confidence * 100).toFixed(1) + '%') : '98.4%');



      const healthScore = d.health_score || 96;

      const rawStatus = d.health_status || 'Healthy';

      const formattedStatus = rawStatus.includes('%') ? rawStatus : (rawStatus + ' (' + healthScore + '%)');

      document.getElementById('resHealthStatus').textContent = formattedStatus;



      document.getElementById('resDisease').textContent = d.disease || (d.detected_disease || 'No Disease Detected');

      document.getElementById('resWater').textContent = (typeof d.water === 'string' ? d.water : (d.water?.recommendation || d.water_requirement || 'Every 5&ndash;7 Days'));

      document.getElementById('resLight').textContent = (typeof d.sunlight === 'string' ? d.sunlight : (d.light?.recommendation || d.light_requirement || 'Bright Indirect Light'));

      document.getElementById('resTemp').textContent = d.temperature || '20&ndash;28&deg;C';

      document.getElementById('resSoil').textContent = d.soil || 'Well-draining Potting Mix';

      document.getElementById('resTreatment').textContent = d.treatment || 'No treatment required';

      document.getElementById('resPrevention').textContent = d.prevention || 'Avoid overwatering and clean leaves regularly.';

      document.getElementById('resNextWater').textContent = d.next_watering || 'After 6 Days';

      document.getElementById('resAiRec').textContent = d.ai_recommendation || (Array.isArray(d.care_recommendations) && d.care_recommendations[0]) || 'Continue current care routine for optimal growth.';

    }

  </script>

</body>

</html>`;

}



module.exports = { renderDashboardHtml };

