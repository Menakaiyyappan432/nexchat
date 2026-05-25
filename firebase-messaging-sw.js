importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAESFTk5Gkv5GgVRAccveE6sS9u_YJLpec",
  authDomain: "chatapp-web-c7775.firebaseapp.com",
  databaseURL: "https://chatapp-web-c7775-default-rtdb.firebaseio.com",
  projectId: "chatapp-web-c7775",
  storageBucket: "chatapp-web-c7775.firebasestorage.app",
  messagingSenderId: "937393424296",
  appId: "1:937393424296:web:d29c4d208cda4011903f9d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message received:', payload);
  
  const { title, body, senderId, senderName } = payload.data || {};
  
  const notificationTitle = title || `New message from ${senderName || 'Someone'}`;
  const notificationOptions = {
    body: body || 'You have a new message',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: `chat-${senderId}`,
    renotify: true,
    data: {
      senderId: senderId,
      url: self.location.origin + `/?chat=${senderId}`
    },
    actions: [
      { action: 'open', title: '💬 Open Chat' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'dismiss') return;
  
  const chatUrl = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ type: 'OPEN_CHAT', senderId: event.notification.data?.senderId });
          return client.focus();
        }
      }
      return clients.openWindow(chatUrl);
    })
  );
});
