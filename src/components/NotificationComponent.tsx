'use client';
import { useRouter } from 'next/navigation';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import {onBackgroundMessage} from 'firebase/messaging/sw';
import { useEffect } from 'react';
import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { useQueryClient } from '@tanstack/react-query';

export const NotificationComponent = () => {
  const router = useRouter();
	const queryClient = useQueryClient();
	const onMessageFCM = async () => {
		if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
		// 브라우저에 알림 권한 요청
		const permission = await Notification.requestPermission();
		if (permission !== 'granted') return;

		const firebaseApp = initializeApp({
			apiKey: "AIzaSyCguupCkfjsQ_8Bc0Je0o1aao80L4EzuUA",
			authDomain: "amorgakco.firebaseapp.com",
			projectId: "amorgakco",
			storageBucket: "amorgakco.firebasestorage.app",
			messagingSenderId: "191848766277",
			appId: "1:191848766277:web:8ba8491d3e8197e8917c2c",
			measurementId: "G-R8S8QTXXRL"
		});

		const messaging = getMessaging(firebaseApp);

		// 인증서 키 값
		getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR })
			.then(async (currentToken) => {
				if (currentToken) {
					await fetchWithAuth('/fcm-tokens', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json', // JSON 형식의 데이터를 보낸다는 것을 서버에 알림
						},
						body: JSON.stringify({ fcmToken: currentToken }), // currentToken을 JSON으로 변환하여 body에 포함
					});
					localStorage.setItem('device', currentToken);
				} else {
					console.log('No registration token available. Request permission to generate one.');
				}
			})
			.catch((err) => {
				console.log('An error occurred while retrieving token. ', err);
				router.refresh();
			});

		onMessage(messaging, (payload) => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === 'notification',
			});
			const notification = new Notification(payload.notification?.title ?? "Default Title", {
				body: payload.notification?.body,
				icon: payload.notification?.icon,
			});
			notification.onclick = () => {
				router.push("/notification");
			}
		});
		
		
	};

	useEffect(() => {
		onMessageFCM();
	}, []);

	return <></>;
};
