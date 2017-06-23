const registrationIdTextBox = document.getElementById('registration-id')

function subscribeNotification(serviceWorkerRegistration) {
  Notification.requestPermission(() => {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}).then(
      subscription => {
        const registrationId = subscription.endpoint.replace(/^https:\/\/android.googleapis.com\/gcm\/send\//, '');
        registrationIdTextBox.value = registrationId;
      },
      error => {
        console.log(error)
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
