self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => cache.addAll([
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
      caches.open('v1').then(cache => {
        cache.put(event.request, response);
      })
      return response.clone()
    })
    .catch(caches.match('/assets/icon.png'))

  event.respondWith(cachedResponse)
})

self.addEventListener('push', event => {
  console.log(event)
  event.waitUntil(
    self.registration.showNotification('Push Test', {
      body: 'メッセージを受信しました',
      icon: '../images/icon.png',
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