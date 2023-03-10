var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
    '/',
    '/completed'
];

console.log("update on worker.js s3")

caches.keys().then(cacheNames => {
    console.log('Opened activate cachepwa-task-manager');
    return Promise.all(
        cacheNames.map(cacheName => {
            if ('cacheWhitelist'.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
        })
    );
})


// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            console.log('Opened activate cachepwa-task-manager');
            return Promise.all(
                cacheNames.map(cacheName => {
                    if ('cacheWhitelist'.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});