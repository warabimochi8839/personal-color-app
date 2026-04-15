const CACHE_VERSION = '2026-04-15';
const CACHE_NAME = `personal-color-app-v${CACHE_VERSION}`;
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './color-data.js',
    './storage.js',
    './face-api.min.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(res => {
                    if (!res || res.status !== 200 || res.type !== 'basic') {
                        return res;
                    }

                    const responseToCache = res.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        if (event.request.url.startsWith(self.location.origin)) {
                            cache.put(event.request, responseToCache);
                        }
                    });

                    return res;
                });
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});
