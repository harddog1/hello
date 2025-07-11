const CACHE_NAME = 'my-cache-v1';
const FILES_TO_CACHE = [
  "index.html",
  "a.html",
  "b.html",
  "index.css",
  "index.js",
  "icons/icon-192.png",
];

// 설치 이벤트: 캐시 저장
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// fetch 이벤트: 캐시 → 네트워크 순으로 응답
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 캐시 있으면 캐시 응답, 없으면 네트워크 요청
      return cachedResponse || fetch(event.request);
    })
  );
});
