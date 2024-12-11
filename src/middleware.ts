import { getAccessTokenWithRefreshToken } from '@/lib/getAccessTokenWithRefreshToken';
import { isTokenExpired } from '@/lib/isTokenExpired';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  // 쿠키에서 accessToken 가져오기
  let token = request.cookies.get('accessToken');  
  // 토큰이 만료되었으면 새로운 accessToken을 발급받고 쿠키에 저장
  
  if (token && isTokenExpired(token.value)) {
    const result = await getAccessTokenWithRefreshToken();
    console.log(result);
    if (result.status !== 'success') {
      return NextResponse.redirect(new URL('/login',request.url));
    }
    const response = NextResponse.next();
    response.cookies.set('accessToken',result.data.accessToken);
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