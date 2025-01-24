import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/ui/Header';
import NavBar from '../components/ui/Navbar';
import Script from 'next/script';
import RQProvider from '../components/RQProvider';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

import dynamic from 'next/dynamic';
import path from 'path';

const DynamicHeader = dynamic(() => import('../components/ui/Header'), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export async function generateMetadata () {
  const baseIconPath = "/icons";
  return {
    title:'아모르각코',
    icons: {
      apple: [
        { sizes: "57x57", url: path.join(baseIconPath, "apple-icon-57x57.png") },
        { sizes: "60x60", url: path.join(baseIconPath, "apple-icon-60x60.png") },
        { sizes: "72x72", url: path.join(baseIconPath, "apple-icon-72x72.png") },
        { sizes: "76x76", url: path.join(baseIconPath, "apple-icon-76x76.png") },
        { sizes: "114x114", url: path.join(baseIconPath, "apple-icon-114x114.png") },
        { sizes: "120x120", url: path.join(baseIconPath, "apple-icon-120x120.png") },
        { sizes: "144x144", url: path.join(baseIconPath, "apple-icon-144x144.png") },
        { sizes: "152x152", url: path.join(baseIconPath, "apple-icon-152x152.png") },
        { sizes: "180x180", url: path.join(baseIconPath, "apple-icon-180x180.png") },
      ],
      other: [
        { rel: "icon", type: "image/png", sizes: "192x192", url: path.join(baseIconPath, "android-icon-192x192.png") },
        { rel: "icon", type: "image/png", sizes: "32x32", url: path.join(baseIconPath, "favicon-32x32.png") },
        { rel: "icon", type: "image/png", sizes: "96x96", url: path.join(baseIconPath, "favicon-96x96.png") },
        { rel: "icon", type: "image/png", sizes: "16x16", url: path.join(baseIconPath, "favicon-16x16.png") },
      ],
    },
    manifest:  "/manifest.json",
  };
  }

export default function RootLayout({
  children
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <RQProvider>
          <DynamicHeader/>
          <div className="flex flex-col mt-12 min-h-default relative mb-navbarHeight">
            {children}
          </div> 
         
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
          />
        </RQProvider>
      </body>
    </html>
  );
}
