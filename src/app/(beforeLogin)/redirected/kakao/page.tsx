"use client"

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from '@/hooks/useAuthStore';
import Cookies from "js-cookie";


export default function Login() {
  const router = useRouter();
  const [authCode, setAuthCode] = useState('')
  const { setAccessToken } = useAuthStore.getState().actions;

  const loginURL = `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL!}?authCode=${authCode}`

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(loginURL, {
        method: 'POST',
        credentials: 'include',
      },)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: data => {
      setAccessToken(data.data.accessToken);
      Cookies.set('accessToken',data.data.accessToken);
      router.push('/home')
    },
    onError: error => {
      console.error('Login Failed', error)
      router.push('/login')
    }
  })

  // authCode를 넣는 과정
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      setAuthCode(code)
    }
  }, [])

  useEffect(() => {
    if (authCode !== '') {
      mutation.mutate()
    }
  }, [authCode])

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <div>Redirecting...</div>
    </main>)
}