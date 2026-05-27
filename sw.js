// Service Worker を完全に無効化
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // 全キャッシュを削除
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // キャッシュ使わず毎回ネットワークから取得
  e.respondWith(fetch(e.request));
});
