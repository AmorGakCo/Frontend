export async function generateMetadata() {
  return {
    title: '그룹 목록 : 아모르각코'
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