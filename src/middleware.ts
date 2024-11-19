import { getAccessTokenWithRefreshToken } from '@/lib/getAccessTokenWithRefreshToken';
import { isTokenExpired } from '@/lib/isTokenExpired';
import { NextRequest, NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export default async function middleware(request: NextRequest) {
  // 프론트 서버 요청을 완료하기 전 쿠키에서 accessToken을 가져와서 만료되었는지 확인
  let token = request.cookies.get('accessToken');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (token && isTokenExpired(token.value)) {
    const result = await getAccessTokenWithRefreshToken();
    console.log(result);
    if (result.data.status !== 400 && result.path === '/error') {
      const response = NextResponse.next();
      response.cookies.set('accessToken', result.accessToken);
      return response;
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

// middleware가 적용될 페이지 경로를 정의
export const config = {
  matcher: [
    '/home',
    '/group/register',
    '/group/detail/:groupId',
    '/group/history',
    '/:username',
    '/message',
    '/message/:name',
    '/ranking',
    '/notification',
  ],
};
