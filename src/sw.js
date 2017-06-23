const CACHE_VERSION = 'v1'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll([
      '/',
      '/assets/app.js',
      '/assets/style.css',
      '/assets/images/icon.jpeg'
    ]))
  )
})

self.addEventListener('fetch', event => {
  const cachedResponse = caches.match(event.request)
    .catch(() => fetch(event.request))
    .then(response => {
      caches.open(CACHE_VERSION).then(cache => {
        cache.put(event.request, response);
      })
      return response.clone()
    })
    .catch(caches.match('/assets/images/icon.png'))

  event.respondWith(cachedResponse)
})

self.addEventListener('push', event => {
  event.waitUntil(
    self.registration.showNotification('Push Test', {
      body: 'メッセージを受信しました',
      icon: '/assets/images/icon.png',
      tag: 'push'
    })
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll()
      .then(all => {
        self.clients.openWindow('/')
      })
  )
})