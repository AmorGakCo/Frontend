import dynamic from "next/dynamic";
import NavBar from "@/components/ui/Navbar";
export default async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <>
    {children}
    <NavBar/>
    </>
  );
}
