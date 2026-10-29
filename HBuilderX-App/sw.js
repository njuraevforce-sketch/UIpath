const CACHE='original-diary-b5e8d86c766b';
const FILES=["./","./artworks/art-wonder.webp","./artworks/blue-note.webp","./artworks/canvas-ace.webp","./artworks/citrus.webp","./artworks/cobalt-groove.webp","./artworks/color-rebel.webp","./artworks/copper-muse.webp","./artworks/coral-spark.webp","./artworks/golden-hour.webp","./artworks/indigo-smile.webp","./artworks/jade-jester.webp","./artworks/lemon-legend.webp","./artworks/lilac-laugh.webp","./artworks/mint-maverick.webp","./artworks/ocean-original.webp","./artworks/peach-rhythm.webp","./artworks/prism-pal.webp","./artworks/ruby-cheers.webp","./artworks/studio-cat.webp","./artworks/sunny-scout.webp","./artworks/sunset-wink.webp","./artworks/tiger.webp","./css/app.1323b7ae.css","./icons/apple-touch-icon.png","./icons/appstore-1024.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./js/app.893e695a.js","./js/app.e187c3b6.js","./js/chunk-vendors.d3c6c9ef.js","./manifest.webmanifest","./privacy.html","./support.html","./terms.html","./release.json"];
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
