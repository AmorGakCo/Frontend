import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amorgakco PWA',
    short_name: 'Amorgakco',
    description: '모각코 모집 웹/앱 amorgakco ',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo.svg',
        sizes: '106x32',
        type: 'image/svg',
      },
      {
        "src": "/icons/ms-icon-310x310.png",
        "type": "image/png",
        "sizes": "310x310"
      },
      {
        "src": "/icons/apple-icon.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "/icons/android-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }
    ],
  }
}