import NavBar from "@/components/ui/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode,
}>) {
  const token = cookies().get('accessToken');
  if(!token) {
    redirect('/login');
  }
  return (
    <>
    {children}
    <NavBar/>
    </>
  );
}
