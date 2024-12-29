importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');
 
// 이곳에 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
const firebaseConfig = {
  apiKey: "AIzaSyCguupCkfjsQ_8Bc0Je0o1aao80L4EzuUA",
  authDomain: "amorgakco.firebaseapp.com",
  projectId: "amorgakco",
  storageBucket: "amorgakco.firebasestorage.app",
  messagingSenderId: "191848766277",
  appId: "1:191848766277:web:8ba8491d3e8197e8917c2c",
  measurementId: "G-R8S8QTXXRL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase-messaging-sw.js
self.addEventListener('notificationclick', function (event) {
  const origin = self.location.origin;
  const url = `${origin}/notification`; // 로컬 URL

  event.notification.close();

  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
          // 이미 열린 창이 있으면 해당 창으로 이동
          for (let client of windowClients) {
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // 없으면 새 창 열기
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});


const messaging = firebase.messaging();
messaging.onBackgroundMessage(messaging,async (payload) => {
  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);

});