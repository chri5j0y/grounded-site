// Grow With Grounded app build: node build.mjs <app>   (grove, maple, aspen, oak, field-guide, or all)
// Copies only that app's files from the site into apps/<app>/www, adds its config, and writes the
// Capacitor project files. Nothing here touches the live site. Run from the app-kit folder.
import fs from 'node:fs'; import path from 'node:path'; import url from 'node:url';
const HERE = path.dirname(url.fileURLToPath(import.meta.url)), SITE = path.resolve(HERE, '..');
const CFG = JSON.parse(fs.readFileSync(path.join(HERE, 'apps.json'), 'utf8'));
const SKIP = /(^|\/)(README[^/]*|.*-PATCH-.*|.*-EDIT-.*|.*REFERENCE\.md|\.DS_Store)$/;
function copy(rel, www){
  const src = path.join(SITE, rel); if (!fs.existsSync(src)) { console.warn('  missing, skipped:', rel); return; }
  if (fs.statSync(src).isDirectory()) { for (const f of fs.readdirSync(src)) copy(path.posix.join(rel, f), www); return; }
  if (SKIP.test(rel)) return;
  const dst = path.join(www, rel); fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst);
}
function pages(dir, base = ''){ let out = []; for (const f of fs.readdirSync(dir)) { const p = path.join(dir, f), r = base + '/' + f;
  if (fs.statSync(p).isDirectory()) out = out.concat(pages(p, r)); else if (f.endsWith('.html')) out.push(r.replace(/\/index\.html$/, '/')); } return out; }
function build(id){
  const a = CFG.apps[id]; if (!a) throw new Error('No app named ' + id);
  const out = path.join(HERE, 'apps', id), www = path.join(out, 'www');
  fs.rmSync(www, { recursive: true, force: true }); fs.mkdirSync(www, { recursive: true });
  [...CFG.common, ...a.files].forEach(r => copy(r, www));
  const config = { app: id, tools: a.tools, pages: pages(www), scheme: a.scheme, built: new Date().toISOString().slice(0, 10) };
  fs.writeFileSync(path.join(www, 'gg-app-config.js'), 'window.GG_APP_CONFIG = ' + JSON.stringify(config) + ';\n');
  // Every page loads the config just before the shared app foundation.
  for (const pg of config.pages) {
    const f = path.join(www, pg.endsWith('/') ? pg + 'index.html' : pg); let h = fs.readFileSync(f, 'utf8');
    h = h.replace(/<script src="(\.\.\/|\/)shared\/gg-app\.js"><\/script>/, m => '<script src="/gg-app-config.js"></script>\n' + m);
    fs.writeFileSync(f, h);
  }
  fs.writeFileSync(path.join(www, 'index.html'), `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${a.start}"><title>${a.name}</title></head><body></body></html>\n`);
  if (a.icon) { fs.mkdirSync(path.join(out, 'resources'), { recursive: true }); fs.copyFileSync(path.join(HERE, a.icon), path.join(out, 'resources', 'icon.png')); }
  fs.writeFileSync(path.join(out, 'capacitor.config.json'), JSON.stringify({ appId: a.appId, appName: a.name, webDir: 'www',
    plugins: { LocalNotifications: { iconColor: '#8B5E1A' } }, ios: { contentInset: 'never' }, android: { allowMixedContent: false } }, null, 2) + '\n');
  if (!fs.existsSync(path.join(out, 'package.json'))) fs.writeFileSync(path.join(out, 'package.json'), JSON.stringify({ name: 'grounded-' + id, private: true, version: '1.0.0',
    dependencies: Object.fromEntries(['@capacitor/core', '@capacitor/ios', '@capacitor/android', ...CFG.plugins].map(p => [p, '^7.0.0'])), devDependencies: { '@capacitor/cli': '^7.0.0' } }, null, 2) + '\n');
  const others = Object.values(CFG.apps).map(x => x.scheme).filter(s => s !== a.scheme).join(', ');
  fs.writeFileSync(path.join(out, 'URL-SCHEME.txt'), `Add this URL scheme so other Grounded apps can open ${a.name}: ${a.scheme}\niOS: Xcode > App target > Info > URL Types > URL Schemes: ${a.scheme}\nAndroid: android/app/src/main/AndroidManifest.xml, inside the main activity:\n<intent-filter><action android:name="android.intent.action.VIEW"/><category android:name="android.intent.category.DEFAULT"/><category android:name="android.intent.category.BROWSABLE"/><data android:scheme="${a.scheme}"/></intent-filter>\n` +
    `\nThis app can open the other Grounded apps, so it must be allowed to ask for them:\niOS Info.plist: LSApplicationQueriesSchemes = [${others}]\nAndroid manifest: <queries><intent><action android:name="android.intent.action.VIEW"/><data android:scheme="grounded-grove"/></intent></queries> (one <intent> per scheme)\n` +
    (a.icon ? `\nApp icon: resources/icon.png (1024 by 1024, square; the stores round the corners). Make every size with: npx @capacitor/assets generate\n` : ''));
  console.log(`${a.name}: ${config.pages.length} pages, www ready at apps/${id}/www`);
}
const arg = process.argv[2] || 'all';
(arg === 'all' ? Object.keys(CFG.apps) : [arg]).forEach(build);
