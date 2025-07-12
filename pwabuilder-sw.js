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
            const networkresp = await fetch(event.request);
            return networkresp;
        } catch (error) {
            const cache = await caches.open(cachename);
            const cachedresp = await cache.match(event.request);
            if (cachedresp ) return cachedresp;
            return cache.match("index.html");
        }
    })());
});
