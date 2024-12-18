'use client';
import { useRouter } from 'next/navigation';

export const ErrorComponent = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push('/group/history');
  }, 1500);
  return (
    <div className="flex-col justify-center items-center w-full gap-4">
      <div className='flex justify-center'>존재하지 않는 그룹입니다.</div>
      <div className='flex justify-center mt-4 text-blue-500'>그룹 목록창으로 다시 이동합니다.</div>
    </div>
  );
};
