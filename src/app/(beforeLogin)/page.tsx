'use client'
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import Image from 'next/image';
export default function Home() {
  return (
    <main className="w-full -mb-navbarHeight min-h-[calc(100vh-48px)] overflow-auto flex flex-col items-center">
      <Image
        width={194}
        height={60}
        alt="landing logo"
        src={'/landing_logo.png'}
        className="mt-[27px]"
      />
      <Image
        width={270}
        height={160}
        alt="landing logo"
        src={'/landing_bg.png'}
        className="mt-9"
      />
      <div className="w-full h-full flex-1 relative mt-9">
        <Image
          layout="fill"
          alt="landing logo"
          src={'/landing_bg_2.png'}
          className="object-cover z-10"
        />
        <div className="relaitve mt-14 w-full h-full relative flex flex-col text-center items-center z-30 font-extrabold text-2xl leading-relaxed">
          <div className="w-[152px] flex flex-col items-start gap-2">
            <div>
            <span className="text-blue-900">개발자</span>를 위한
            </div>
            <div>
            <span className="text-blue-600">지도</span> 기반
            </div>
            <div>
            <span className="text-blue-300">모각코</span> 플랫폼
            </div>
          </div>
          <div className='mt-9 mb-6'>
          <KakaoLoginButton/>
          </div>
        </div>
      </div>
    </main>
  );
}
