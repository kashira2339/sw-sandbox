self.addEventListener('install', event => {
  event.waitUntil(() => {
      caches.open('v1').then(cache => cache.addAll([ '/' ]))
      self.clients.claim()
  })
})

self.addEventListener('push', event => {
  event.waitUntil(
    self.registration.showNotification('Subscription change', {
      body: 'Buzz! Buzz!',
      icon: '../images/icon.png',
      tag: 'push'
    })
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll()
      .then(all => {
        self.clients.openWindow('/')
      })
  )
})
