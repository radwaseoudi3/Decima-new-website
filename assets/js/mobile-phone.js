(function () {
  'use strict';

  var phoneQuery = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;

  function isPhone() {
    return phoneQuery ? phoneQuery.matches : window.innerWidth <= 767;
  }

  function initPhoneUiFlag() {
    if (isPhone()) document.body.classList.add('mobile-phone-ui');
  }

  function initMobileMenuState() {
    if (!isPhone()) return;

    var originalReveal = document.querySelector('.meanmenu-reveal');
    var nav = document.querySelector('.mean-nav');
    var rootList = nav ? nav.querySelector('ul') : null;
    if (!originalReveal || !nav || !rootList) return;

    /*
       MeanMenu's legacy click handler can be clipped by the original theme's
       overflow rules on modern mobile browsers. Replace only the top-level
       reveal control with a clean copy and manage the open/closed state
       ourselves. Sub-menu expand/collapse handlers remain MeanMenu's.
    */
    var reveal = originalReveal.cloneNode(true);
    originalReveal.parentNode.replaceChild(reveal, originalReveal);
    var isOpen = false;

    function renderRevealIcon(open) {
      if (open) {
        reveal.textContent = '×';
      } else {
        reveal.innerHTML = '<span></span><span></span><span></span>';
      }
    }

    function setOpen(open) {
      isOpen = Boolean(open);
      document.body.classList.toggle('mobile-nav-open', isOpen);
      reveal.classList.toggle('meanclose', isOpen);
      reveal.setAttribute('aria-expanded', String(isOpen));
      reveal.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      nav.setAttribute('aria-hidden', String(!isOpen));
      rootList.style.display = isOpen ? 'block' : 'none';
      nav.style.display = 'block';
      renderRevealIcon(isOpen);
    }

    reveal.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!isOpen);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        setOpen(false);
        reveal.focus();
      }
    });

    setOpen(false);
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
      card.setAttribute('aria-label', ((card.querySelector('h3') && card.querySelector('h3').textContent) || 'View project').trim());

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

  var insightSummaries = {
    'insight-ai-ready-data-center-infrastructure.html': 'Why extreme power density, advanced cooling, phased scalability, and integrated controls are changing the way high-performance computing campuses are planned and delivered.',
    'insight-program-governance-complex-capital-programs.html': 'A practical look at decision rights, reporting rhythms, organizational assets, and the governance systems that keep complex programs aligned.',
    'insight-alternative-fuels-data-center-transition.html': 'How compliance, existing conditions, generator systems, procurement, and operational continuity shape multi-country fuel-transition programs.'
  };

  function normalizeHref(link) {
    if (!link) return '';
    try {
      var url = new URL(link.getAttribute('href'), window.location.href);
      return url.pathname.split('/').pop();
    } catch (error) {
      return (link.getAttribute('href') || '').split('/').pop();
    }
  }

  function closeSiblingBlogCards(card) {
    var scope = card.parentElement && card.parentElement.parentElement ? card.parentElement.parentElement : card.parentElement;
    if (!scope) scope = document;
    scope.querySelectorAll('.is-mobile-blog-open').forEach(function (other) {
      if (other === card) return;
      other.classList.remove('is-mobile-blog-open');
      var otherToggle = other.querySelector(':scope > .mobile-blog-toggle');
      if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
    });
  }

  function initArchiveBlogAccordion() {
    if (!isPhone()) return;
    if (!document.body.classList.contains('insights-page') && !document.body.classList.contains('home-page')) return;

    document.querySelectorAll('.decima-insights-archive .single-blog-box, .decima-home-blog .single-blog-box').forEach(function (card, index) {
      var titleLink = card.querySelector('.blog-title h3 a[href]');
      if (!titleLink || card.querySelector(':scope > .mobile-blog-toggle')) return;
      var title = titleLink.textContent.trim();
      var hrefKey = normalizeHref(titleLink);

      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'mobile-blog-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Show details for ' + title);
      var label = document.createElement('span');
      label.textContent = title;
      toggle.appendChild(label);
      card.insertBefore(toggle, card.firstChild);

      var excerpt = document.createElement('p');
      excerpt.className = 'mobile-blog-excerpt';
      excerpt.textContent = insightSummaries[hrefKey] || 'Open this insight for Decima’s perspective, practical context, and project-delivery considerations.';
      var blogButton = card.querySelector('.blog-button');
      card.insertBefore(excerpt, blogButton || null);

      function setOpen(open) {
        if (open) closeSiblingBlogCards(card);
        card.classList.toggle('is-mobile-blog-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', (open ? 'Hide details for ' : 'Show details for ') + title);
      }

      toggle.addEventListener('click', function () {
        setOpen(!card.classList.contains('is-mobile-blog-open'));
      });

      card.addEventListener('click', function (event) {
        if (!card.classList.contains('is-mobile-blog-open')) return;
        if (event.target.closest('button, a')) return;
        window.location.href = titleLink.href;
      });
    });
  }

  function initRelatedInsightAccordion() {
    if (!isPhone() || !document.body.classList.contains('insight-detail-page')) return;

    document.querySelectorAll('.insight-detail-page .decima-section.is-offwhite .insight-card').forEach(function (card) {
      var titleLink = card.querySelector('.insight-body h3 a[href]') || card.querySelector('.insight-image[href]');
      if (!titleLink || card.querySelector(':scope > .mobile-blog-toggle')) return;
      var titleNode = card.querySelector('.insight-body h3');
      var title = (titleNode ? titleNode.textContent : 'Read insight').trim();

      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'mobile-blog-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Show details for ' + title);
      var label = document.createElement('span');
      label.textContent = title;
      toggle.appendChild(label);
      card.insertBefore(toggle, card.firstChild);

      function setOpen(open) {
        if (open) closeSiblingBlogCards(card);
        card.classList.toggle('is-mobile-blog-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', (open ? 'Hide details for ' : 'Show details for ') + title);
      }

      toggle.addEventListener('click', function () {
        setOpen(!card.classList.contains('is-mobile-blog-open'));
      });

      card.addEventListener('click', function (event) {
        if (!card.classList.contains('is-mobile-blog-open')) return;
        if (event.target.closest('button, a')) return;
        window.location.href = titleLink.href;
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

  function initMobileProjectMap() {
    if (!isPhone() || !document.body.classList.contains('projects-page')) return;
    var map = document.querySelector('.projects-map-section .project-map');
    if (!map || map.classList.contains('is-mobile-map-ready')) return;
    var canvas = map.querySelector('.map-canvas');
    if (!canvas) return;
    map.classList.add('is-mobile-map-ready');

    var stage = document.createElement('div');
    stage.className = 'map-mobile-stage';
    canvas.parentNode.insertBefore(stage, canvas);
    stage.appendChild(canvas);

    var viewport = document.createElement('div');
    viewport.className = 'map-viewport';
    var base = canvas.querySelector('.map-base');
    if (base) viewport.appendChild(base);
    Array.from(canvas.querySelectorAll('.map-pin')).forEach(function (pin) {
      viewport.appendChild(pin);
    });
    canvas.insertBefore(viewport, canvas.firstChild);

    var controls = document.createElement('div');
    controls.className = 'map-mobile-controls';
    controls.setAttribute('aria-label', 'Map view controls');
    controls.innerHTML = [
      '<button type="button" class="map-rotate-control" data-map-action="rotate" aria-label="Rotate map to landscape view" aria-pressed="false" title="Rotate map to landscape view"><i class="bi bi-phone-landscape" aria-hidden="true"></i><span class="map-control-label">Landscape</span></button>',
      '<button type="button" data-map-action="zoom-out" aria-label="Zoom out" title="Zoom out"><span aria-hidden="true">−</span></button>',
      '<button type="button" data-map-action="reset" aria-label="Reset map zoom" title="Reset map zoom"><span aria-hidden="true">1:1</span></button>',
      '<button type="button" data-map-action="zoom-in" aria-label="Zoom in" title="Zoom in"><span aria-hidden="true">+</span></button>'
    ].join('');
    stage.insertBefore(controls, canvas);

    var scale = 1;
    var translateX = 0;
    var translateY = 0;
    var minScale = 1;
    var maxScale = 4;
    var pointers = new Map();
    var pinchStartDistance = 0;
    var pinchStartScale = 1;
    var lastSinglePoint = null;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function constrainTranslation() {
      var rect = canvas.getBoundingClientRect();
      var maxX = Math.max(0, ((scale - 1) * rect.width) / 2);
      var maxY = Math.max(0, ((scale - 1) * rect.height) / 2);
      translateX = clamp(translateX, -maxX, maxX);
      translateY = clamp(translateY, -maxY, maxY);
    }

    function renderTransform() {
      if (scale <= 1.001) {
        scale = 1;
        translateX = 0;
        translateY = 0;
      }
      constrainTranslation();
      viewport.style.transform = 'translate3d(' + translateX.toFixed(2) + 'px,' + translateY.toFixed(2) + 'px,0) scale(' + scale.toFixed(3) + ')';
      canvas.classList.toggle('is-map-zoomed', scale > 1.001);
    }

    function setScale(nextScale) {
      scale = clamp(nextScale, minScale, maxScale);
      renderTransform();
    }

    function resetMapView() {
      scale = 1;
      translateX = 0;
      translateY = 0;
      renderTransform();
    }

    controls.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-map-action]');
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      var action = button.getAttribute('data-map-action');
      if (action === 'zoom-in') setScale(scale + 0.5);
      if (action === 'zoom-out') setScale(scale - 0.5);
      if (action === 'reset') resetMapView();
      if (action === 'rotate') toggleLandscapeView(button);
    });

    function distanceBetween(a, b) {
      var dx = b.clientX - a.clientX;
      var dy = b.clientY - a.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    canvas.addEventListener('pointerdown', function (event) {
      if (event.target.closest('.map-mobile-controls')) return;
      pointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
      if (canvas.setPointerCapture) {
        try { canvas.setPointerCapture(event.pointerId); } catch (error) { /* no-op */ }
      }
      if (pointers.size === 2) {
        var pair = Array.from(pointers.values());
        pinchStartDistance = distanceBetween(pair[0], pair[1]);
        pinchStartScale = scale;
        lastSinglePoint = null;
      } else if (pointers.size === 1 && scale > 1) {
        lastSinglePoint = { clientX: event.clientX, clientY: event.clientY };
        canvas.classList.add('is-map-dragging');
      }
    });

    canvas.addEventListener('pointermove', function (event) {
      if (!pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });

      if (pointers.size >= 2) {
        event.preventDefault();
        var pair = Array.from(pointers.values()).slice(0, 2);
        var currentDistance = distanceBetween(pair[0], pair[1]);
        if (pinchStartDistance > 0) {
          scale = clamp(pinchStartScale * (currentDistance / pinchStartDistance), minScale, maxScale);
          renderTransform();
        }
        return;
      }

      if (pointers.size === 1 && scale > 1 && lastSinglePoint) {
        event.preventDefault();
        var current = Array.from(pointers.values())[0];
        translateX += current.clientX - lastSinglePoint.clientX;
        translateY += current.clientY - lastSinglePoint.clientY;
        lastSinglePoint = { clientX: current.clientX, clientY: current.clientY };
        renderTransform();
      }
    }, { passive: false });

    function releasePointer(event) {
      pointers.delete(event.pointerId);
      canvas.classList.remove('is-map-dragging');
      if (pointers.size < 2) {
        pinchStartDistance = 0;
        pinchStartScale = scale;
      }
      if (pointers.size === 1 && scale > 1) {
        var only = Array.from(pointers.values())[0];
        lastSinglePoint = { clientX: only.clientX, clientY: only.clientY };
      } else {
        lastSinglePoint = null;
      }
    }

    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);
    canvas.addEventListener('lostpointercapture', releasePointer);

    function isLandscapeView() {
      return stage.classList.contains('is-landscape-fallback');
    }

    function updateRotateButton(button) {
      if (!button) return;
      var active = isLandscapeView();
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? 'Exit landscape map view' : 'Rotate map to landscape view');
      button.setAttribute('title', active ? 'Exit landscape map view' : 'Rotate map to landscape view');
      button.innerHTML = active
        ? '<i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i><span class="map-control-label">Exit</span>'
        : '<i class="bi bi-phone-landscape" aria-hidden="true"></i><span class="map-control-label">Landscape</span>';
    }

    function toggleLandscapeView(button) {
      var active = !isLandscapeView();
      stage.classList.toggle('is-landscape-fallback', active);
      document.body.classList.toggle('map-landscape-fallback', active);
      updateRotateButton(button);
      window.setTimeout(renderTransform, 80);
    }

    var rotateButton = controls.querySelector('[data-map-action="rotate"]');
    updateRotateButton(rotateButton);

    window.addEventListener('resize', function () {
      window.setTimeout(renderTransform, 60);
    });

    buildMobileLocationDirectory(map);
    renderTransform();
  }

  function buildMobileLocationDirectory(map) {
    if (!map || map.querySelector(':scope > .mobile-location-directory')) return;
    var pins = Array.from(map.querySelectorAll('.map-pin'));
    if (!pins.length) return;

    var regionOrder = ['Americas', 'EMEA', 'APAC'];
    var continentOrder = {
      'Americas': ['North America', 'South America'],
      'EMEA': ['Europe', 'Middle East', 'Africa'],
      'APAC': ['Asia', 'Oceania']
    };

    var directory = document.createElement('div');
    directory.className = 'mobile-location-directory';
    var heading = document.createElement('h3');
    heading.textContent = 'Project Locations by Region';
    directory.appendChild(heading);
    var intro = document.createElement('p');
    intro.textContent = 'Expand a region, then a continent, to browse the location list without changing the project portfolio below.';
    directory.appendChild(intro);

    regionOrder.forEach(function (region, regionIndex) {
      var regionPins = pins.filter(function (pin) { return pin.dataset.region === region; });
      if (!regionPins.length) return;

      var regionDetails = document.createElement('details');
      regionDetails.className = 'mobile-location-region';
      if (regionIndex === 0) regionDetails.open = true;
      var regionSummary = document.createElement('summary');
      regionSummary.textContent = region + ' (' + regionPins.length + ')';
      regionDetails.appendChild(regionSummary);

      (continentOrder[region] || []).forEach(function (continent, continentIndex) {
        var continentPins = regionPins.filter(function (pin) { return pin.dataset.continent === continent; });
        if (!continentPins.length) return;

        var continentDetails = document.createElement('details');
        continentDetails.className = 'mobile-location-continent';
        if (regionIndex === 0 && continentIndex === 0) continentDetails.open = true;
        var continentSummary = document.createElement('summary');
        continentSummary.textContent = continent + ' (' + continentPins.length + ')';
        continentDetails.appendChild(continentSummary);

        var table = document.createElement('table');
        table.className = 'mobile-location-table';
        table.setAttribute('aria-label', continent + ' project locations');
        var tbody = document.createElement('tbody');
        continentPins
          .sort(function (a, b) { return (a.dataset.name || '').localeCompare(b.dataset.name || ''); })
          .forEach(function (pin) {
            var row = document.createElement('tr');
            var locationCell = document.createElement('td');
            locationCell.textContent = pin.dataset.name || 'Project location';
            var regionCell = document.createElement('td');
            regionCell.textContent = region;
            row.appendChild(locationCell);
            row.appendChild(regionCell);
            tbody.appendChild(row);
          });
        table.appendChild(tbody);
        continentDetails.appendChild(table);
        regionDetails.appendChild(continentDetails);
      });

      directory.appendChild(regionDetails);
    });

    var status = map.querySelector('.project-map-status');
    if (status && status.parentNode) status.parentNode.insertBefore(directory, status.nextSibling);
    else map.appendChild(directory);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPhoneUiFlag();
    initMobileMenuState();
    initHomeServiceAccordion();
    makeMobileProjectCardsClickable();
    initArchiveBlogAccordion();
    initRelatedInsightAccordion();
    pausePartnerCarouselOnTap();
    initMobileProjectMap();
  });
})();
