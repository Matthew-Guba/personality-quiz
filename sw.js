const CACHE_NAME = 'pq-cache-v1';
const URLS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/questions.js',
    './js/data.js',
    './js/analyzer.js',
    './js/quiz.js',
    './js/results.js',
    './js/storage.js',
    './manifest.json'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(URLS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
            if (resp && resp.status === 200) {
                const clone = resp.clone();
                caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
            }
            return resp;
        })).catch(() => caches.match('./index.html'))
    );
});