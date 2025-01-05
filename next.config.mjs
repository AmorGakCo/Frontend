import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Strict Mode 비활성화
};

export default withPWA({
  dest: 'public', // PWA 리소스 저장 경로
  register: true, // 서비스 워커 자동 등록
  skipWaiting: true, // 새 서비스 워커 즉시 활성화
})(nextConfig);
