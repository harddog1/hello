const CACHE_NAME = 'my-cache-v1';
const FILES_TO_CACHE = [
  "index.html",
  "a.html",
  "b.html",
  "index.css",
  "index.js",
  "icons/icon-192.png",
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cachename).then((cache) => {
        return cache.addAll(cachefiles);
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(function() {
        try {
            let networkresp = fetch(event.request);
            return networkresp;
        } catch (error) {
            let cache = caches.open(cachename);
            let cachedresp = cache.match(event.request);
            return cachedresp;
        }
    });
});
