(function () {
  'use strict';

  var phoneQuery = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;

  function isPhone() {
    return phoneQuery ? phoneQuery.matches : window.innerWidth <= 767;
  }

  function initHomeServiceAccordion() {
    if (!isPhone() || !document.body.classList.contains('home-page')) return;

    document.querySelectorAll('.home-page .decima-template-services .single-service-box').forEach(function (box, index) {
      var toggle = box.querySelector('.service-title');
      if (!toggle) return;

      var panelId = 'mobile-service-panel-' + (index + 1);
      var row = box.querySelector(':scope > .row');
      if (row) row.id = panelId;

      toggle.setAttribute('role', 'button');
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('aria-expanded', 'false');
      if (row) toggle.setAttribute('aria-controls', panelId);

      function setOpen(open) {
        box.classList.toggle('is-mobile-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      }

      function activate(event) {
        if (event && event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
        if (event && event.type === 'keydown') event.preventDefault();
        var willOpen = !box.classList.contains('is-mobile-open');
        if (willOpen) {
          document.querySelectorAll('.home-page .decima-template-services .single-service-box.is-mobile-open').forEach(function (otherBox) {
            if (otherBox === box) return;
            otherBox.classList.remove('is-mobile-open');
            var otherToggle = otherBox.querySelector('.service-title');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          });
        }
        setOpen(willOpen);
      }

      toggle.addEventListener('click', activate);
      toggle.addEventListener('keydown', activate);
    });
  }

  function makeMobileProjectCardsClickable() {
    if (!isPhone() || !document.body.classList.contains('home-page')) return;

    document.querySelectorAll('.home-page .decima-template-projects .template-project').forEach(function (card) {
      var link = card.querySelector('.project-button a[href]');
      if (!link) return;
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', (card.querySelector('h3')?.textContent || 'View project').trim());

      function openCard() { window.location.href = link.href; }

      card.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) return;
        openCard();
      });

      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          openCard();
        }
      });
    });
  }

  function makeRelatedInsightsClickable() {
    if (!isPhone() || !document.body.classList.contains('insight-detail-page')) return;

    document.querySelectorAll('.insight-detail-page .decima-section.is-offwhite .insight-card').forEach(function (card) {
      var link = card.querySelector('.insight-image[href], h3 a[href]');
      if (!link) return;
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', (card.querySelector('h3')?.textContent || 'Read insight').trim());

      function openCard() { window.location.href = link.href; }

      card.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) return;
        openCard();
      });

      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          openCard();
        }
      });
    });
  }

  function pausePartnerCarouselOnTap() {
    if (!isPhone() || !document.body.classList.contains('home-page') || !window.jQuery) return;
    var $ = window.jQuery;
    var $carousel = $('.home-page .brand_list');
    if (!$carousel.length) return;

    $carousel.on('click.decimaMobilePause', function () {
      $carousel.trigger('stop.owl.autoplay');
      $carousel.addClass('is-mobile-paused');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHomeServiceAccordion();
    makeMobileProjectCardsClickable();
    makeRelatedInsightsClickable();
    pausePartnerCarouselOnTap();
  });
})();
