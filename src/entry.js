function subscribeNotification(serviceWorkerRegistration) {
  Notification.requestPermission(() => {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}).then(
      subscription => {
      },
      error => {
      }
    )
  })
}

function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('assets/sw.js').then(reg => {
      if (reg.active) subscribeNotification(reg)
      else {
        const serviceWorker = reg.installing || reg.waiting || reg.active
        serviceWorker.addEventListener('statechange', e => {
          if (e.target.state === 'activated') {
            subscribeNotification(reg)
          }
        })
      }
    })
  } else {
    console.log('Service workers aren\'t supported in this browser.')
  }
}

init()