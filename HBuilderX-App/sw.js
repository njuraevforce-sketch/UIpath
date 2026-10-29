const CACHE='original-diary-c5b941dee60b';
const FILES=["./","./artworks/art-wonder.webp","./artworks/blue-note.webp","./artworks/canvas-ace.webp","./artworks/citrus.webp","./artworks/cobalt-groove.webp","./artworks/color-rebel.webp","./artworks/copper-muse.webp","./artworks/coral-spark.webp","./artworks/golden-hour.webp","./artworks/indigo-smile.webp","./artworks/jade-jester.webp","./artworks/lemon-legend.webp","./artworks/lilac-laugh.webp","./artworks/mint-maverick.webp","./artworks/ocean-original.webp","./artworks/peach-rhythm.webp","./artworks/prism-pal.webp","./artworks/ruby-cheers.webp","./artworks/studio-cat.webp","./artworks/sunny-scout.webp","./artworks/sunset-wink.webp","./artworks/tiger.webp","./css/app.1323b7ae.css","./icons/apple-touch-icon.png","./icons/appstore-1024.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./js/app.893e695a.js","./js/chunk-vendors.d3c6c9ef.js","./manifest.webmanifest","./privacy.html","./support.html","./terms.html"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('original-diary-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match(new URL('./index.html',self.registration.scope)))));return}
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
