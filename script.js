/* ============================================
   Nicolas Vannson — Portfolio scripts
   Hamburger menu + Dark/Light theme + Email protection
   ============================================ */

   (function () {
    'use strict';
  
    // ============================================
    // 1. HAMBURGER MENU
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-links');
  
    if (menuToggle && navList) {
      // Open/close menu on click
      menuToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });
  
      // Close menu when clicking a link (useful on mobile)
      navList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navList.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (
          navList.classList.contains('active') &&
          !navList.contains(e.target) &&
          !menuToggle.contains(e.target)
        ) {
          navList.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
  
      // Close menu on Escape key (accessibility)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
          navList.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.focus();
        }
      });
    }
  
    // ============================================
    // 2. DARK / LIGHT MODE
    // ============================================
    const STORAGE_KEY = 'nv-theme';
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
  
    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      const isDark = theme === 'dark';
  
      if (themeToggle) {
        const icon = themeToggle.querySelector('.theme-icon');
        const label = themeToggle.querySelector('.theme-label');
        if (icon) icon.textContent = isDark ? '◑' : '◐';
        if (label) label.textContent = isDark ? 'Light' : 'Dark';
        themeToggle.setAttribute('aria-pressed', String(isDark));
      }
    }
  
    function getInitialTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
  
    // Initialize on load
    applyTheme(getInitialTheme());
  
    // Click handler
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      });
    }
  
    // Follow system preference if user has never chosen manually
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  
    // Sync across open tabs
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
        applyTheme(e.newValue);
      }
    });
  
    // ============================================
    // 3. PROTECTED EMAIL BUTTONS (anti-scraping)
    // ============================================
    const mailButtons = document.querySelectorAll('[data-mail]');
    if (mailButtons.length > 0) {
      // Email assembled at runtime — never appears in raw HTML
      const user = 'vannson.nicolas';
      const domain = 'gmail.com';
      const email = user + '@' + domain;

      mailButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const subject = 'CV request - Nicolas Vannson';
          const body = 'Hi Nicolas,\n\nI would like to receive your CV.\n\nContext: ';
          const url = 'mailto:' + email
            + '?subject=' + encodeURIComponent(subject)
            + '&body=' + encodeURIComponent(body);
          window.location.href = url;
        });
      });
    }
          
      
  
     



  
  })();