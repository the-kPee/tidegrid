const CACHE='tidegrid-v1';
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./index.html','./game-core.js','./manifest.json','./icon.svg']))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(resp => {
    if (resp.ok) { const copy=resp.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); }
    return resp;
  }).catch(()=>caches.match('./index.html'))));
});
