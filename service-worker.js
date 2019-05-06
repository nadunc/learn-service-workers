var CACHE_NAME = 'learn-service-workers-cache-v1';
var urlsToCache = [
    '',
    'index.html',
    'assets/css/bootstrap.min.css',
    'assets/js/jquery-3.4.0.min.js',
    'assets/js/popper.min.js',
    'assets/js/bootstrap.min.js',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            }).catch(function (err) {
                console.error(err)
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            ).catch(function (err) {
                console.error(err)
            })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['learn-service-workers-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).catch(function (err) {
            console.error(err)
        })
    );
});
