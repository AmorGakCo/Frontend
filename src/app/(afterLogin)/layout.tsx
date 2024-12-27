import { NotificationComponent } from '@/components/NotificationComponent';
import NavBar from '@/components/ui/Navbar';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchNotificationServer } from './notification/_lib/fetchNotificationServer';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get('accessToken');
  if (!token) {
    redirect('/login');
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notification', { page: 0 }],
    queryFn: fetchNotificationServer,
  });
  const data = queryClient.getQueryData(['notification', { page: 0 }]);
  const dehydratedState = data ? dehydrate(queryClient) : null;
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        {children}
        <NavBar />
        <NotificationComponent />
      </HydrationBoundary>
    </>
  );
}
