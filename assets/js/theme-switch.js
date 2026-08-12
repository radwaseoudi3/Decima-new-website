(function () {
  'use strict';

  var STORAGE_KEY = 'decima-theme';
  var root = document.documentElement;

  function storedTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateControls() {
    var theme = currentTheme();
    var next = theme === 'dark' ? 'light' : 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(theme === 'light'));
      button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      var icon = button.querySelector('.theme-toggle-icon i');
      var text = button.querySelector('.theme-toggle-text');
      if (icon) icon.className = next === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      if (text) text.textContent = next === 'light' ? 'Light mode' : 'Dark mode';
    });
  }

  function setTheme(theme, persist) {
    var safeTheme = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', safeTheme);
    root.style.colorScheme = safeTheme;
    if (document.body) document.body.classList.toggle('light-theme', safeTheme === 'light');
    if (persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, safeTheme); } catch (error) {}
    }
    updateControls();
  }

  // Apply before first paint. Dark remains the default/current design.
  setTheme(storedTheme() || 'dark', false);

  document.addEventListener('DOMContentLoaded', function () {
    setTheme(currentTheme(), false);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    });
    window.requestAnimationFrame(function () { root.classList.add('theme-ready'); });
  });

  window.DecimaTheme = { set: setTheme, get: currentTheme };
})();
