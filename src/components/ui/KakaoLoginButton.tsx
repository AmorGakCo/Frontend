import Image from 'next/image';

export default function KakaoLoginButton() {

  const setCookieHandler = () => {
    window.location.href = process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL!;
  }


  return (
    <button onClick={setCookieHandler}>
      <Image src="/kakao_login_medium_wide.png" alt="kakao button image" width={312} height={40} />
    </button>
  );

}