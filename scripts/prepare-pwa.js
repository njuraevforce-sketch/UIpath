const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../dist');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.relative(root,path.join(dir,f.name)).replace(/\\/g,'/')])}
const files=walk(root).filter(f=>f!=='sw.js'&&!f.endsWith('.map'));
const hash=require('crypto').createHash('sha256');files.forEach(f=>hash.update(fs.readFileSync(path.join(root,f))));const version=hash.digest('hex').slice(0,12);
fs.writeFileSync(path.join(root,'sw.js'),`const CACHE='original-diary-${version}';
const FILES=${JSON.stringify(['./',...files.map(f=>'./'+f)])};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('original-diary-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match(new URL('./index.html',self.registration.scope)))));return}
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
`);
console.log('PWA offline cache:',files.length,'assets;',version);
