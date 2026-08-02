# Decima Website Implementation — QA Summary

## Scope completed

- Public navigation follows the approved architecture: Home, About, Services, Work, Insights, Careers, and Contact.
- Home page sequence: hero, company metrics, Decima story, services, latest work, leadership, interactive project map, insights, partners/clients, and footer.
- Leadership is limited to the CEO, COO, and Director of Operations.
- All visible social links point only to Decima International on LinkedIn.
- “Get a Quote” has been replaced with “Get in Touch” and points to the Contact page.
- The template’s animations and interaction style have been retained and adapted to Decima branding.
- Client feedback/testimonial content has been replaced with an interactive 45-location project map.
- Removed from the home page: top service strip, moving banner/marquee, story percentage bars, and testimonial section.
- Decima logo animation is used for the loading screen.

## Public page set

The package contains 28 HTML pages: the required core pages, three service-detail pages, thirteen project-detail pages, the Insights listing with three article templates, and the three-profile Team page.

## Technical checks completed

- All internal HTML links and asset references resolve locally.
- Every HTML page has one source-level H1, a unique title, a unique meta description, a canonical URL, and responsive viewport metadata.
- No duplicate HTML IDs were found.
- All images have alt attributes.
- CSS-linked fonts, images, and icons are included.
- Interactive map markers, map region filters, location directory, project filters, desktop contact sidebar, and responsive mobile navigation were tested in Chromium.
- Team photographs load at their native prepared width and all three profiles become visible correctly on scroll.
- `robots.txt`, `sitemap.xml`, structured data, Open Graph metadata, and a web app manifest are included.

## Launch notes

- The included contact form is static. It opens the visitor’s email application with the form information prefilled for `info@decimaintl.com`. Connect it to an approved form backend for direct server-side submissions.
- Careers links to Decima International’s official Greenhouse job board.
- Google Poppins is used when available, with local/system fallbacks.
- Review and approve all project disclosures, metrics, images, and confidentiality language before public launch.
