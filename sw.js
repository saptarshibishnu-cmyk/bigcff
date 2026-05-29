const CACHE = "bigcff-v1";
const ASSETS = [
  "https://saptarshibishnu-cmyk.github.io/bigcff/",
  "https://saptarshibishnu-cmyk.github.io/bigcff/index.html",
  "https://saptarshibishnu-cmyk.github.io/bigcff/icon-192.png",
  "https://saptarshibishnu-cmyk.github.io/bigcff/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});