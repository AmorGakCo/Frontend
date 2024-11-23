import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

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
