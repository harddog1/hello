const cachename = "hello";
const cachefiles = [
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
    event.respondWith((async() => {
        try {
            const networkresp = fetch(event.request);
            return networkresp;
        } catch (error) {
            const cache = caches.open(cachename);
            const cachedresp = cache.match(cachefiles);
            return cachedresp;
        }
    })());
});
