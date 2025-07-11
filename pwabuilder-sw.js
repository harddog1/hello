let cachename = "hello";
let cachefiles = [
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
    event.respondWith((async () => {
        try {
            let networkresp = await fetch(event.request);
            return networkresp;
        } catch (error) {
            let cache = await caches.open(cachename);
            let cachedresp = await cache.match(event.request);
            if (cachedresp) {
                return cachedresp;
            }
        }
    })());
});
