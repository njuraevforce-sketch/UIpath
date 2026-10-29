const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert');
const root=path.resolve(__dirname,'..');const read=p=>fs.readFileSync(path.join(root,p),'utf8');const json=p=>JSON.parse(read(p));
const manifest=json('PWA/manifest.webmanifest');assert.equal(manifest.name,'NFTALT');assert.equal(manifest.short_name,'NFTALT');assert.equal(manifest.lang,'en');assert.equal(manifest.display,'standalone');assert(manifest.icons.some(i=>i.sizes==='512x512'&&i.purpose==='maskable'));
const arts=json('src/artworks.json');assert.equal(arts.length,22);for(const art of arts){const bytes=fs.readFileSync(path.join(root,'PWA/artworks',art.file));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),art.sha256)}
assert(read('PWA/sw.js').includes('original-diary-'));for(const file of ['privacy.html','support.html','terms.html']){assert(read('PWA/'+file).includes('lang="en"'));assert(!read('PWA/'+file).includes('TODO'));}
for(const file of ['index.html','manifest.webmanifest','sw.js'])for(const folder of ['HBuilderX-App','ios/Diary/Web'])assert.equal(read(folder+'/'+file),read('PWA/'+file));
const source=read('src/App.vue');const ui=source.replace(/const moodMigration=.*?;\n/,'');assert(!/[А-Яа-яЁё]/.test(ui),'Cyrillic text remains in app source outside legacy migration');assert(!/[А-Яа-яЁё]/.test(read('src/main.js')));
const c=json('src/release-config.json');assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.supportEmail));assert.equal(c.version,'1.1.0');
console.log('PASS: English PWA, 22 original-image checksums, offline worker, privacy/support/terms, synchronized native resources.');
console.log('OWNER STEPS: configure signing profile, verify public HTTPS policy/support URLs, run Archive/TestFlight and on-device tests before submission.');
