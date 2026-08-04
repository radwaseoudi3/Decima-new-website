(function ($) {
  'use strict';

  const locations = [
    { name: 'Virginia, USA', region: 'Americas', lat: 37.4, lon: -78.7 },
    { name: 'Washington, USA', region: 'Americas', lat: 47.4, lon: -120.7 },
    { name: 'Texas, USA', region: 'Americas', lat: 31.0, lon: -99.0 },
    { name: 'Iowa, USA', region: 'Americas', lat: 42.0, lon: -93.5 },
    { name: 'Illinois, USA', region: 'Americas', lat: 40.0, lon: -89.0 },
    { name: 'Wisconsin, USA', region: 'Americas', lat: 44.5, lon: -89.5 },
    { name: 'Wyoming, USA', region: 'Americas', lat: 43.0, lon: -107.5 },
    { name: 'Arizona, USA', region: 'Americas', lat: 34.0, lon: -111.7 },
    { name: 'Georgia, USA', region: 'Americas', lat: 32.7, lon: -83.3 },
    { name: 'Queretaro, Mexico', region: 'Americas', lat: 20.59, lon: -100.39 },
    { name: 'Toronto, Canada', region: 'Americas', lat: 43.65, lon: -79.38 },
    { name: 'Santiago, Chile', region: 'Americas', lat: -33.45, lon: -70.67 },
    { name: 'Rio de Janeiro, Brazil', region: 'Americas', lat: -22.91, lon: -43.17 },
    { name: 'Milan, Italy', region: 'EMEA', lat: 45.46, lon: 9.19 },
    { name: 'London, England', region: 'EMEA', lat: 51.51, lon: -0.13 },
    { name: 'Cairo, Egypt', region: 'EMEA', lat: 30.04, lon: 31.24 },
    { name: 'Brussels, Belgium', region: 'EMEA', lat: 50.85, lon: 4.35 },
    { name: 'Dubai, UAE', region: 'EMEA', lat: 25.20, lon: 55.27 },
    { name: 'Abu Dhabi, UAE', region: 'EMEA', lat: 24.45, lon: 54.38 },
    { name: 'Frankfurt, Germany', region: 'EMEA', lat: 50.11, lon: 8.68 },
    { name: 'Warsaw, Poland', region: 'EMEA', lat: 52.23, lon: 21.01 },
    { name: 'Gavle-Sandviken, Sweden', region: 'EMEA', lat: 60.67, lon: 17.14 },
    { name: 'Dublin, Ireland', region: 'EMEA', lat: 53.35, lon: -6.26 },
    { name: 'Amsterdam, Netherlands', region: 'EMEA', lat: 52.37, lon: 4.90 },
    { name: 'Madrid, Spain', region: 'EMEA', lat: 40.42, lon: -3.70 },
    { name: 'Cape Town, South Africa', region: 'EMEA', lat: -33.93, lon: 18.42 },
    { name: 'Johannesburg, South Africa', region: 'EMEA', lat: -26.20, lon: 28.04 },
    { name: 'Doha, Qatar', region: 'EMEA', lat: 25.29, lon: 51.53 },
    { name: 'Vienna, Austria', region: 'EMEA', lat: 48.21, lon: 16.37 },
    { name: 'Hong Kong, China', region: 'APAC', lat: 22.32, lon: 114.17 },
    { name: 'Hyderabad, India', region: 'APAC', lat: 17.39, lon: 78.49 },
    { name: 'Mumbai, India', region: 'APAC', lat: 19.08, lon: 72.88 },
    { name: 'Chennai, India', region: 'APAC', lat: 13.08, lon: 80.27 },
    { name: 'Pune, India', region: 'APAC', lat: 18.52, lon: 73.86 },
    { name: 'Jakarta, Indonesia', region: 'APAC', lat: -6.21, lon: 106.85 },
    { name: 'Kuala Lumpur, Malaysia', region: 'APAC', lat: 3.14, lon: 101.69 },
    { name: 'Johor Bahru, Malaysia', region: 'APAC', lat: 1.49, lon: 103.74 },
    { name: 'Auckland, New Zealand', region: 'APAC', lat: -36.85, lon: 174.76 },
    { name: 'Singapore, Singapore', region: 'APAC', lat: 1.35, lon: 103.82 },
    { name: 'Melbourne, Australia', region: 'APAC', lat: -37.81, lon: 144.96 },
    { name: 'Sydney, Australia', region: 'APAC', lat: -33.87, lon: 151.21 },
    { name: 'Seoul, South Korea', region: 'APAC', lat: 37.57, lon: 126.98 },
    { name: 'Taipei, Taiwan', region: 'APAC', lat: 25.03, lon: 121.56 },
    { name: 'Osaka, Japan', region: 'APAC', lat: 34.69, lon: 135.50 },
    { name: 'Tokyo, Japan', region: 'APAC', lat: 35.68, lon: 139.69 }
  ];

  function projectPoint(location) {
    return {
      x: ((location.lon + 180) / 360) * 100,
      y: ((90 - location.lat) / 180) * 100
    };
  }

  function applyProjectFilters(grid) {
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('[data-project-categories]'));
    const activeRegion = grid.dataset.activeRegion || 'All';
    const activeCategory = grid.dataset.activeCategory || 'All';
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = (card.dataset.projectCategories || '').split('|');
      const regions = (card.dataset.projectRegions || '').split('|');
      const matchesRegion = activeRegion === 'All' || regions.includes(activeRegion) || regions.includes('Global');
      const matchesCategory = activeCategory === 'All' || categories.includes(activeCategory);
      const visible = matchesRegion && matchesCategory;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    const section = grid.closest('section');
    const count = section ? section.querySelector('.project-results-count') : null;
    const emptyState = section ? section.querySelector('.project-empty-state') : null;
    const map = document.querySelector('[data-project-region-controller="#' + grid.id + '"]');
    const mapStatus = map ? map.querySelector('.project-map-status') : null;
    const regionLabel = activeRegion === 'All' ? 'all regions' : activeRegion;
    const typeLabel = activeCategory === 'All' ? 'all project types' : activeCategory;
    const profileWord = visibleCount === 1 ? 'profile' : 'profiles';

    if (count) count.textContent = 'Showing ' + visibleCount + ' project ' + profileWord + ' for ' + regionLabel + ' · ' + typeLabel;
    if (mapStatus) mapStatus.textContent = 'Showing ' + visibleCount + ' project ' + profileWord + ' associated with ' + regionLabel + '.';
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  function initMaps() {
    document.querySelectorAll('.project-map').forEach((map) => {
      const canvas = map.querySelector('.map-canvas');
      const tooltip = map.querySelector('.map-tooltip');
      const directory = map.querySelector('.location-directory');
      if (!canvas || !tooltip) return;

      locations.forEach((location, index) => {
        const point = projectPoint(location);
        const pin = document.createElement('button');
        pin.type = 'button';
        pin.className = 'map-pin';
        pin.dataset.region = location.region;
        pin.dataset.name = location.name;
        pin.style.left = point.x.toFixed(3) + '%';
        pin.style.top = point.y.toFixed(3) + '%';
        pin.style.animationDelay = ((index % 9) * 0.19).toFixed(2) + 's';
        pin.setAttribute('aria-label', location.name + ' project location');

        const showTooltip = () => {
          map.querySelectorAll('.map-pin.is-active').forEach((item) => item.classList.remove('is-active'));
          pin.classList.add('is-active');
          tooltip.innerHTML = '<strong>' + location.name + '</strong><span>' + location.region + '</span>';
          tooltip.style.left = point.x.toFixed(3) + '%';
          tooltip.style.top = point.y.toFixed(3) + '%';
          tooltip.classList.add('is-visible');
        };
        const hideTooltip = () => {
          pin.classList.remove('is-active');
          tooltip.classList.remove('is-visible');
        };
        pin.addEventListener('mouseenter', showTooltip);
        pin.addEventListener('focus', showTooltip);
        pin.addEventListener('mouseleave', hideTooltip);
        pin.addEventListener('blur', hideTooltip);
        pin.addEventListener('click', () => {
          const regionButton = map.querySelector('[data-map-filter="' + location.region + '"]');
          if (regionButton) regionButton.click();
          showTooltip();
        });
        canvas.appendChild(pin);

        if (directory) {
          const item = document.createElement('span');
          item.dataset.region = location.region;
          item.textContent = location.name;
          directory.appendChild(item);
        }
      });

      map.querySelectorAll('[data-map-filter]').forEach((button) => {
        button.addEventListener('click', () => {
          const region = button.dataset.mapFilter;
          map.querySelectorAll('[data-map-filter]').forEach((b) => {
            const active = b === button;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', String(active));
          });
          map.querySelectorAll('.map-pin').forEach((pin) => {
            const matches = region === 'All' || pin.dataset.region === region;
            pin.classList.toggle('is-dimmed', !matches);
          });
          if (directory) {
            directory.querySelectorAll('span').forEach((item) => {
              const matches = region === 'All' || item.dataset.region === region;
              item.hidden = !matches;
            });
          }

          const targetSelector = map.dataset.projectRegionController;
          const grid = targetSelector ? document.querySelector(targetSelector) : null;
          if (grid) {
            grid.dataset.activeRegion = region;
            applyProjectFilters(grid);
            const portfolioHeading = grid.closest('section')?.querySelector('.decima-heading');
            if (portfolioHeading) portfolioHeading.setAttribute('tabindex', '-1');
          }
        });
      });

      const toggle = map.querySelector('.location-directory-toggle');
      if (toggle && directory) {
        toggle.addEventListener('click', () => {
          const open = directory.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', String(open));
          toggle.textContent = open ? 'Hide project location list' : 'View all project locations';
        });
      }
    });
  }

  function initProjectFilters() {
    document.querySelectorAll('[data-project-filter-group]').forEach((group) => {
      const targetSelector = group.dataset.projectFilterGroup;
      const grid = document.querySelector(targetSelector);
      if (!grid) return;

      group.querySelectorAll('[data-project-filter]').forEach((button) => {
        button.addEventListener('click', () => {
          const filter = button.dataset.projectFilter;
          group.querySelectorAll('[data-project-filter]').forEach((b) => {
            const active = b === button;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', String(active));
          });
          grid.dataset.activeCategory = filter;
          applyProjectFilters(grid);
        });
      });

      const section = grid.closest('section');
      const reset = section ? section.querySelector('[data-reset-project-filters]') : null;
      if (reset) {
        reset.addEventListener('click', () => {
          grid.dataset.activeRegion = 'All';
          grid.dataset.activeCategory = 'All';
          const allType = group.querySelector('[data-project-filter="All"]');
          if (allType) allType.click();
          const map = document.querySelector('[data-project-region-controller="#' + grid.id + '"]');
          const allRegion = map ? map.querySelector('[data-map-filter="All"]') : null;
          if (allRegion) allRegion.click();
        });
      }

      applyProjectFilters(grid);
    });
  }

  function initContactForm() {
    const form = document.querySelector('[data-static-contact-form]');
    if (!form) return;
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const firstName = String(data.get('first_name') || '').trim();
      const lastName = String(data.get('last_name') || '').trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'a prospective client';
      const enquiryType = data.get('enquiry_type') || 'Website enquiry';
      const subject = enquiryType + ' from ' + fullName;
      const body = [
        'Enquiry type: ' + enquiryType,
        'First name: ' + firstName,
        'Last name: ' + lastName,
        'Email: ' + (data.get('email') || ''),
        'Phone: ' + (data.get('phone') || ''),
        'Organization: ' + (data.get('organization') || ''),
        'Region: ' + (data.get('region') || ''),
        '',
        'How can we help?',
        (data.get('message') || ''),
        '',
        'Consent confirmed: Yes'
      ].join('\n');
      const href = 'mailto:info@decimaintl.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (status) status.textContent = 'Your email application will open with the inquiry details filled in.';
      window.location.href = href;
    });
  }

  function initSidebarAccessibility() {
    const panel = document.querySelector('.xs-sidebar-widget');
    const openButton = document.querySelector('.navSidebar-button');
    const closeButton = document.querySelector('.close-side-widget');
    if (!panel || !openButton || !closeButton) return;
    openButton.setAttribute('role', 'button');
    openButton.setAttribute('tabindex', '0');
    openButton.setAttribute('aria-label', 'Open contact menu');
    openButton.setAttribute('aria-expanded', 'false');
    openButton.addEventListener('click', () => openButton.setAttribute('aria-expanded', 'true'));
    closeButton.addEventListener('click', () => {
      openButton.setAttribute('aria-expanded', 'false');
      openButton.focus();
    });
    openButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openButton.click();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.querySelector('.info-group.isActive')) {
        closeButton.click();
      }
    });
  }

  function initCurrentYear() {
    document.querySelectorAll('[data-current-year]').forEach((item) => {
      item.textContent = String(new Date().getFullYear());
    });
  }

  function initReducedMotion() {
    if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    $('.hero-slides, .brand_list').trigger('stop.owl.autoplay');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMaps();
    initProjectFilters();
    initContactForm();
    initSidebarAccessibility();
    initCurrentYear();
    initReducedMotion();
  });
})(jQuery);
