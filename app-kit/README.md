# Grounded app kit (session 19)

Hold this folder on your computer for now. It is not part of the website, and nothing in it is needed until the LLC, the D-U-N-S number, and the store accounts are done.

## What it does

One shared code base becomes five apps: The Grove, Sprout, Sapling, Soul Tree, and Field Guide. `node build.mjs grove` (or sprout, sapling, soul-tree, field-guide, or all) copies only that app's files from the site into `apps/<app>/www`, adds its settings, and writes the Capacitor files. Every app works fully offline. Nothing is sent to a server.

## When the time comes

1. Install Node (nodejs.org). For iPhone apps you need a Mac with Xcode. For Android, Android Studio.
2. In this folder: `node build.mjs all`
3. For each app, in `apps/<app>`: `npm install`, then `npx cap add ios` and `npx cap add android`, then `npx cap sync`.
4. Add the URL scheme from that app's URL-SCHEME.txt (this is what lets one tap in Sprout, Sapling, or Soul Tree open The Grove).
5. App icons, screenshots, privacy labels, and store listings come in the store session.

## Settled in session 19

- Separate apps, one shared code base.
- Sprout, Sapling, and Soul Tree send to The Grove with one tap on the same phone (the Grove app opens with the answers) and by QR across phones.
- Daily Grove reminders are scheduled on the phone, with general wording only.
- Apps keep a copy of every save in the phone's permanent storage and restore it if the phone clears web storage.

## Later, for scanning a QR straight into the Grove app

Universal links (iPhone) and app links (Android) need two small files on the website, made with the Apple Team ID and Android signing key once the store accounts exist. Until then, a QR opens The Grove on the website, which works the same way.
