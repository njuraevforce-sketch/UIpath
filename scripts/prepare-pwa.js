const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../dist');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.relative(root,path.join(dir,f.name)).replace(/\\/g,'/')])}
const files=walk(root).filter(f=>f!=='sw.js'&&f!=='release.json'&&!f.endsWith('.map'));
const hash=require('crypto').createHash('sha256');files.forEach(f=>{hash.update(f);hash.update(fs.readFileSync(path.join(root,f)))});const version=hash.digest('hex').slice(0,12);
fs.writeFileSync(path.join(root,'release.json'),JSON.stringify({app:'NFTALT',version:require('../package.json').version,revision:version}));
files.push('release.json');
fs.writeFileSync(path.join(root,'sw.js'),`const CACHE='original-diary-${version}';
const FILES=${JSON.stringify(['./',...files.map(f=>'./'+f)])};
const ALLOWED=new Set(FILES.map(file=>new URL(file,self.registration.scope).pathname));
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 // Limit concurrent precache requests so ordinary hosting limits do not block installation.
 for(let i=0;i<FILES.length;i+=4)await cache.addAll(FILES.slice(i,i+4).map(url=>new Request(url,{cache:'reload'})));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('original-diary-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!ALLOWED.has(url.pathname)||url.search)return;
 // Online requests use current server files. Cached files are an offline fallback only.
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{
   const response=await fetch(new Request(event.request,{cache:'no-cache'}));
   if(!response.ok)throw new Error('Server file unavailable');
   await cache.put(event.request,response.clone());
   return response;
  }catch(error){
   const cached=await cache.match(event.request);
   if(cached)return cached;
   throw error;
  }
 })());
});
`);
console.log('PWA offline cache:',files.length,'assets;',version);
