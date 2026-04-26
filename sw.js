// Service Worker — เต๋าแห่งวัน
// Cache ทุกอย่างไว้ใน device ใช้ได้ offline 100%

const CACHE_NAME = 'tao-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@300;400;600;700&family=Noto+Serif+SC:wght@300;400&display=swap'
];

// ── Install: cache ทุกไฟล์ทันที ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// ── Activate: ลบ cache เก่า ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: Cache First strategy ──
// ถ้ามีใน cache → ส่งจาก cache (เร็ว + offline)
// ถ้าไม่มี → ดึงจาก network แล้ว cache ไว้
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Cache response ใหม่ที่ดึงมาได้
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback → ส่ง index.html แทน
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// ── Push Notification (สำหรับ v2 backend) ──
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body: data.poem || 'บทแห่งวันนี้รอคุณอยู่',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'อ่านเลย' },
      { action: 'dismiss', title: 'ภายหลัง' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || '道 · เต๋าแห่งวัน', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action !== 'dismiss') {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
