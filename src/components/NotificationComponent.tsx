'use client';
import { useRouter } from 'next/navigation';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';
import Cookies from 'js-cookie';
export const NotificationComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState<boolean>(false);
  const PermitFCM = async () => {
    
    // 브라우저에 알림 권한 요청
    if (Notification.permission === 'default'&& !Cookies.get('deny_notification')) { 
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

    }
    if (Notification.permission=== 'denied') return;
    const firebaseApp = initializeApp({
      apiKey: 'AIzaSyCguupCkfjsQ_8Bc0Je0o1aao80L4EzuUA',
      authDomain: 'amorgakco.firebaseapp.com',
      projectId: 'amorgakco',
      storageBucket: 'amorgakco.firebasestorage.app',
      messagingSenderId: '191848766277',
      appId: '1:191848766277:web:8ba8491d3e8197e8917c2c',
      measurementId: 'G-R8S8QTXXRL',
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
          console.log(
            'No registration token available. Request permission to generate one.'
          );
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
      if(!Cookies.get('deny_notification')) {
      const notification = new Notification(
        payload.notification?.title ?? 'Default Title',
        {
          body: payload.notification?.body,
          icon: payload.notification?.icon,
        }
      );
      notification.onclick = () => {
        router.push('/notification');
      };
    }

    });
  };
  const RefuseFCM = () => {
    Cookies.set('deny_notification', 'deny_notification');
  };
  useEffect(() => {
    setIsClient(true);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
    console.log('permitFCM')
    if(Notification.permission !== 'default' || Cookies.get('deny_notification')) {
      
      PermitFCM();
    }
  }, []);

  return (
    <>
      {isClient && !Cookies.get('deny_notification') && Notification.permission === 'default' && (
        <Dialog defaultOpen={true}>
          <DialogContent className="px-4">
            <DialogHeader>
              <DialogTitle>저희 사이트의 알림을 받아보시겠어요?</DialogTitle>
              <DialogDescription>
                <div className="mt-4">
                  알림을 허용하시면 모각코의 승인여부, 지각알림, 채팅 등의
                  알림을 백그라운드에서도 실시간으로 받을 수 있어요!
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="w-full flex">
						<DialogClose>
              <Button className="py-2 px-4" onClick={PermitFCM}>
                허용
              </Button>
							</DialogClose>
							<DialogClose>
              <Button
                className="py-2 px-4 bg-red-500 hover:bg-red-400"
                onClick={RefuseFCM}
              >
                거절
              </Button>
							</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
