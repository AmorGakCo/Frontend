import { fetchNotification } from '@/app/(afterLogin)/notification/_lib/fetchNotification';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function NotificationIcon() {
  const { data } = useInfiniteQuery({
    queryKey: ['notification', { page: 0 }],
    queryFn: fetchNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
  const notifyNumber = data?.pages[0].elementSize;
  return (
    <div className='relative'>
     <svg
      width="24"
      height="24"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 17V15H2V8C2 6.61667 2.41667 5.39167 3.25 4.325C4.08333 3.24167 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64167 0.733333 6.925 0.449999C7.225 0.15 7.58333 0 8 0C8.41667 0 8.76667 0.15 9.05 0.449999C9.35 0.733333 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.24167 12.75 4.325C13.5833 5.39167 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.975 19.8083 6.575 19.425C6.19167 19.025 6 18.55 6 18H10C10 18.55 9.8 19.025 9.4 19.425C9.01667 19.8083 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z"
        fill="currentColor"
        className="fill-black-300 transition-all group-hover:fill-white"
      />
    </svg>

    {/* <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative"
    >
      <path
        d="M4 19V17H6V10C6 8.61667 6.41667 7.39167 7.25 6.325C8.08333 5.24167 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6417 2.73333 10.925 2.45C11.225 2.15 11.5833 2 12 2C12.4167 2 12.7667 2.15 13.05 2.45C13.35 2.73333 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.24167 16.75 6.325C17.5833 7.39167 18 8.61667 18 10V17H20V19H4ZM12 22C11.45 22 10.975 21.8083 10.575 21.425C10.1917 21.025 10 20.55 10 20H14C14 20.55 13.8 21.025 13.4 21.425C13.0167 21.8083 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z"
        fill="currentColor"
        className="fill-black-300 transition-all group-hover:fill-white"
      />
     
    </svg> */}
     {
      notifyNumber && (notifyNumber > 0)? (
        <div className="w-4 h-4 text-xs absolute -right-1.5 -bottom-1  flex justify-center items-center rounded-full bg-red-500 text-white z-50 ml-2">
          {notifyNumber}
        </div>
      ):''}
      </div>
  );
}
