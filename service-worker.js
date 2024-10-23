const CACHE_NAME = 'beemote-store-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    'https://beemote.online/assets/images/logo-beemote-png-96x96.webp',
    // Adicione outros arquivos estáticos que você deseja armazenar em cache
];

// Instala o Service Worker e faz cache dos arquivos
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Recupera arquivos do cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Retorna a resposta do cache ou faz a solicitação de rede
                return response || fetch(event.request);
            })
    );
});

// Atualiza o cache quando o Service Worker é ativado
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
