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
 
const messaging = firebase.messaging();