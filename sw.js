// LexiPro Service Worker — v1.0
const CACHE_NAME = 'lexipro-v1';

// Tout ce qu'on met en cache pour le mode offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap'
];

// Installation : mise en cache de tous les assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Mise en cache des assets...');
      // On essaie de cacher les fonts Google mais sans bloquer si offline
      const criticalAssets = ASSETS.filter(a => !a.includes('fonts.googleapis'));
      const optionalAssets = ASSETS.filter(a => a.includes('fonts.googleapis'));
      return cache.addAll(criticalAssets).then(() => {
        return Promise.allSettled(optionalAssets.map(url => cache.add(url)));
      });
    }).then(() => self.skipWaiting())
  );
});

// Activation : nettoyage des vieux caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Suppression ancien cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch : stratégie Cache First → Network Fallback
self.addEventListener('fetch', event => {
  // Ne pas intercepter les requêtes non-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Retourner le cache immédiatement, mais mettre à jour en arrière-plan
        const fetchUpdate = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {});
        return cached;
      }

      // Pas en cache → fetch réseau
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline et pas en cache → page de fallback minimaliste
        if (event.request.headers.get('accept').includes('text/html')) {
          return new Response(
            '<html><body style="background:#0d0f14;color:#4fffb0;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;">' +
            '<div><div style="font-size:48px;margin-bottom:16px">📶</div>' +
            '<div style="font-size:18px">LexiPro est hors ligne</div>' +
            '<div style="color:#7a8499;margin-top:8px;font-size:14px">Reconnectez-vous pour charger l\'app</div></div></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
      });
    })
  );
});
