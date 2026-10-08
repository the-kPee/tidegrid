# Tidegrid

Original, ad-free octopus-themed 9×9 block puzzle made for mobile browsers. The block-placement and line-clearing premise is inspired by the user's description of Meowdoku; Tidegrid uses original name, graphics, interface, rules presentation and source code.

## Local play

Run `python3 -m http.server 8777 --directory /opt/data/cache/scratch/tide-grid`, then open `http://<computer-LAN-address>:8777/` on a phone on the same Wi-Fi. This localhost demo is not available outside the runtime, so a public installable version requires HTTPS hosting.

## iPhone install

Once hosted at a reachable HTTPS URL, open it in Safari, tap Share, then Add to Home Screen. The service worker caches the app shell for offline reopening after the first successful load; iOS Safari behavior depends on version.

## Gameplay

Tap a shape to select it, then tap a starting cell to place it. Shapes can also be dragged onto the board. Complete rows, columns, or 3×3 reef pools to clear them. Scores and best score persist in browser local storage. No ads, analytics, purchases, external scripts or third-party network requests.

## Files

- `index.html` — responsive UI and runtime
- `game-core.js` — puzzle rules and CommonJS/browser exports
- `manifest.json`, `sw.js`, `icon.svg` — PWA install/offline support
- `tests.js` — Node tests

## Verify

Run `node tests.js`. Serve over HTTP for service-worker behavior; opening `index.html` as a `file://` URL is not the install path.
