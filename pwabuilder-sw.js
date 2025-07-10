// 서비스워커 sw.js

const CACHE = "pwabuilder-page-v1";
const offlineFiles = [
  "index.html",
  // "a.html",
  // "b.html",
  "index.css",
  "index.js"
];

// 설치 시 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(offlineFiles);
    })
  );
});

// fetch 이벤트 모든 요청 처리
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      // 네트워크 우선 시도
      const networkResp = await fetch(event.request);
      return networkResp;
    } catch (error) {
      // 실패 시 캐시된 파일 제공
      const cache = await caches.open(CACHE);
      const cachedResp = await cache.match(event.request);
      if (cachedResp) {
        return cachedResp;
      }

      // 그래도 없으면 index.html fallback 제공 (안전장치)
      return cache.match("/hello/index.html");
    }
  })());
});
