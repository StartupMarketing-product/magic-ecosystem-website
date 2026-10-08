# Magic Ecosystem Website

Production site: https://magic-ecosystem-landing.netlify.app/

This repository is the source of truth for the public Magic website. Netlify publishes the `main` branch automatically.

## Site structure

- `ru/` Russian pages
- `en/` English pages
- `he/` Hebrew pages
- `assets/` shared CSS, JavaScript, and icons
- `images/` homepage imagery
- `img/` inner-page imagery
- `media/` video and poster files

## Publishing changes

1. Create a branch for the change.
2. Update the necessary HTML, CSS, JavaScript, image, or video files.
3. Open a pull request and review the Netlify Deploy Preview.
4. Check Russian, English, Hebrew, desktop, and mobile views.
5. Merge the pull request into `main`; Netlify publishes the change automatically.

Do not upload a separate copy directly to Netlify. All production changes should come from this repository so the history stays complete and reversible.

