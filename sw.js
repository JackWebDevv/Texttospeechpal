const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/image.png'  // Example
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-cache-v1')
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        console.log('All resources cached successfully');
                    })
                    .catch(error => {
                        console.error('Failed to cache:', error);
                        // Iterate through urlsToCache to find the culprit
                        urlsToCache.forEach((url, index) => {
                            fetch(url).then(response => {
                                if (!response.ok) {
                                    console.error(`URL ${index}: ${url} failed with status ${response.status}`);
                                }
                            }).catch(err => {
                                console.error(`URL ${index}: ${url} failed to fetch: ${err}`)
                            })
                        })
                    });
            })
    );
});