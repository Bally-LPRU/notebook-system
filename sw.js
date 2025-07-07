const CACHE_NAME = 'notebook-system-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/register.html',
    '/profile.html',
    '/apps-script.js', // Assuming this is part of frontend assets now
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Failed to cache during install:', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // For navigation requests, try to fetch from network first, then cache, then fallback to cache
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and can only be consumed once. We need to consume it once
                    // to send it to the browser and once to cache it.
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                })
                .catch(() => {
                    // If network fails, try to get it from the cache
                    return caches.match(event.request);
                })
        );
    } else {
        // For other requests (e.g., assets, API calls)
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    // No cache hit - fetch from network
                    return fetch(event.request).then((networkResponse) => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and can only be consumed once. We need to consume it once
                        // to send it to the browser and once to cache it.
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }).catch((error) => {
                        console.error('Fetch failed for:', event.request.url, error);
                        // You might want to return a fallback page for offline mode
                        // For now, just return an error or a generic offline message
                        return new Response('<h2>Offline</h2><p>Please check your internet connection.</p>', { headers: { 'Content-Type': 'text/html' } });
                    });
                })
        );
    }
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 