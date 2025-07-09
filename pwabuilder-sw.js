// This is the "Offline page" service worker

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "hello";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
// const offlineFallbackPage = "offline.html";
const offlineFallbackPage = [
  "https://harddog1.github.io/hello/index.html",
  "https://harddog1.github.io/hello/a.html",
  "https://harddog1.github.io/hello/b.html",
  "https://harddog1.github.io/hello/index.css",
  "https://harddog1.github.io/hello/index.js"
];

var contentToCache = offlineFallbackPage;

self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    }),
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open(CACHE).then(function (cache) {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url,
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    }),
  );
});
