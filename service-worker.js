/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-e6515da';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./robinson_crusoe_001.html","./robinson_crusoe_002.html","./robinson_crusoe_003.html","./robinson_crusoe_004.html","./robinson_crusoe_005.html","./robinson_crusoe_006.html","./robinson_crusoe_007.html","./robinson_crusoe_008.html","./robinson_crusoe_009.html","./robinson_crusoe_010.html","./robinson_crusoe_011.html","./robinson_crusoe_012.html","./robinson_crusoe_013.html","./robinson_crusoe_014.html","./robinson_crusoe_015.html","./robinson_crusoe_016.html","./robinson_crusoe_017.html","./robinson_crusoe_018.html","./robinson_crusoe_019.html","./robinson_crusoe_020.html","./robinson_crusoe_021.html","./robinson_crusoe_022.html","./robinson_crusoe_023.html","./robinson_crusoe_024.html","./robinson_crusoe_025.html","./robinson_crusoe_026.html","./robinson_crusoe_027.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image003.jpg","./resources/image004.jpg","./resources/obalka_robinson_crusoe.jpg","./resources/robinson_crusoe_007.jpg","./resources/robinson_crusoe_021.jpg","./resources/robinson_crusoe_022.jpg","./resources/robinson_crusoe_023.jpg","./resources/robinson_crusoe_024.jpg","./resources/robinson_crusoe_033.jpg","./resources/robinson_crusoe_035.jpg","./resources/robinson_crusoe_040.jpg","./resources/robinson_crusoe_044.jpg","./resources/robinson_crusoe_045.jpg","./resources/robinson_crusoe_054.jpg","./resources/robinson_crusoe_088.jpg","./resources/robinson_crusoe_099.jpg","./resources/robinson_crusoe_101.jpg","./resources/robinson_crusoe_104.jpg","./resources/robinson_crusoe_106.jpg","./resources/robinson_crusoe_107.jpg","./resources/robinson_crusoe_109.jpg","./resources/robinson_crusoe_113.jpg","./resources/robinson_crusoe_119.jpg","./resources/robinson_crusoe_120.jpg","./resources/robinson_crusoe_121.jpg","./resources/robinson_crusoe_123.jpg","./resources/robinson_crusoe_124.jpg","./resources/robinson_crusoe_128.jpg","./resources/robinson_crusoe_132.jpg","./resources/robinson_crusoe_135.jpg","./resources/robinson_crusoe_137.jpg","./resources/robinson_crusoe_139.jpg","./resources/upoutavka_eknihy.jpg","./style/style.min.css","./template-images/circles.png","./scripts/bundle.js"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
