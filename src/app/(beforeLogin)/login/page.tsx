'use client'
import KakaoLoginButton from "@/components/ui/KakaoLoginButton";

export default function Login() {

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <div className="flex flex-col items-start gap-10">
        <img src="/logo.svg" alt="logo" width={100} />
        <h2 className="font-bold">소셜로그인으로 빠르게</h2>
      </div>
      <KakaoLoginButton />
    </main>
  );
}