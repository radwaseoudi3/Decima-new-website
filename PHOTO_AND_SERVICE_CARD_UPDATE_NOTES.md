# Photo and Service Card Update Notes

## Implemented

- Leadership images now use one consistent 4:5 frame on the Home and Team pages, with stable sizing and top-to-bottom alignment so they no longer stretch or sink in the layout.
- The three current leader portraits were normalized onto the same light neutral gray background, and the visible jacket tones were harmonized toward the same dark executive palette while preserving the original faces.
- Home-page leader cards now reference the same centralized profile files used by the Team page, so future replacements in `assets/images/pages/team/profiles/` propagate everywhere those leaders currently appear.
- The original portrait assets were preserved under `assets/images/_archive/leadership-originals/`.
- Services overview cards on `services.html` are now square.
- Black-and-white/grayscale filtering was removed from the Services overview card imagery, including hover and focus states.

## Waist-shot source limitation

The supplied leader files are tightly cropped head-and-shoulders portraits and do not contain waist-level body detail. Their framing is now consistent and less visually oversized, but a true waist-up composition would require source photos that actually include the missing lower-body area or a dedicated generative portrait edit. Replacing the three centralized profile files later will automatically update both the Team page and Home-page leadership section.
