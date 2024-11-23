import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
export const metadata = {
  cache: 'no-store', // 페이지를 캐싱하지 않도록 설정
};
export default async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode,
}>) {
  const token = cookies().get('accessToken');
  if(token) {
    redirect('/home');
  }
  return (
    <>
    {children}
    </>
  );
}
