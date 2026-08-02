# Decima Website Asset Folder Guide

The active website images are organized by page so replacements can be made without searching through unrelated template files.

## Main structure

- `assets/images/shared/branding/` — logos, favicon, and social-sharing cover.
- `assets/images/pages/home/` — every image used specifically on the home page.
  - `hero/` — the two home-page hero slides.
  - `about-section/` — the home-page About/Discover Decima images only.
  - `services-section/` — service images used only on the home page.
  - `team-section/` — leadership previews used on the home page.
  - `insights-section/` — insight previews used on the home page.
  - `clients-partners/logos/` — high-resolution client and partner logos.
  - `map/` — home-page world map.
  - `decorative/` — decorative shapes used on the home page.
- `assets/images/pages/about/` — About page header and content images. These are separate copies from the home-page About section.
- `assets/images/pages/careers/` — Careers hero/header and culture content image.
- `assets/images/pages/team/` — Team page header and leadership profile photos.
- `assets/images/pages/services/` — Services page header, cards, sector image, and separate detail-page hero folders.
- `assets/images/pages/projects/` — Projects page header, reusable project library, and separate hero folders for each project detail page.
- `assets/images/pages/latest-work/` — Latest Work page header.
- `assets/images/pages/insights/` — Insights listing header/cards plus separate header and main-image folders for each article.
- `assets/images/pages/contact/` — Contact page header.
- `assets/images/_archive/` — original template-support images and older low-resolution partner logos retained only as a backup.

## Important editing rule

Each main page header has its own physical image file. Replacing `pages/about/header/about-header.webp` changes only the About page. Replacing `pages/careers/header/careers-header.webp` changes only Careers, and the same rule applies to Services, Projects, Latest Work, Insights, Team, and Contact.

The home-page About images and About-page content images are also separate. This allows the home-page section and the full About page to use completely different photography.

## Recommended replacement format

Keep the existing filename and use optimized WebP images. Header images should ideally be at least 1920 × 740 pixels. Content photos should match the approximate aspect ratio of the file being replaced to avoid unexpected cropping.
