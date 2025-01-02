export async function generateMetadata() {
  return {
    title: '알림 : 아모르각코'
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}