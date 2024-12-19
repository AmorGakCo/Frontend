import { getAccessTokenWithRefreshToken } from '@/lib/getAccessTokenWithRefreshToken';
import { isTokenExpired } from '@/lib/isTokenExpired';
import { NextRequest, NextResponse } from 'next/server';

function gotoLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.delete('accessToken');
  response.cookies.delete('refresh-token');
  return response;
}
export default async function middleware(request: NextRequest) {
  // 쿠키에서 accessToken 가져오기
  let token = request.cookies.get('accessToken');
  // 토큰이 만료되었으면 새로운 accessToken을 발급받고 쿠키에 저장
  // 토큰이 유효한지
  if (token && token.value.split('.').length !== 3) {
    request.cookies.delete('accessToken');
    return gotoLogin(request);
  }
  if (token && isTokenExpired(token.value)) {
    const result = await getAccessTokenWithRefreshToken(request);
    if (result.status === '/failure') {
      request.cookies.delete('accessToken');
      return gotoLogin(request);
    }
    const response = NextResponse.next();
    response.cookies.set('accessToken', result.data.accessToken);
    return response;
  }
}

// middleware가 적용될 페이지 경로를 정의
export const config = {
  matcher: [
    '/home',
    '/group/register',
    '/group/detail/:groupId',
    '/group/history',
    '/user/:username',
    '/message',
    '/message/:name',
    '/ranking',
    '/notification',
  ],
};
