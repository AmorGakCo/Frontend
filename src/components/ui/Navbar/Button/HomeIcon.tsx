import Link from 'next/link';
import Image from 'next/image';

export default function HomeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 20.5V12.5C13 12.2348 12.8946 11.9804 12.7071 11.7929C12.5196 11.6053 12.2652 11.5 12 11.5H8C7.73478 11.5 7.48043 11.6053 7.29289 11.7929C7.10536 11.9804 7 12.2348 7 12.5V20.5M1 9.49997C0.99993 9.20904 1.06333 8.92159 1.18579 8.65768C1.30824 8.39378 1.4868 8.15976 1.709 7.97197L8.709 1.97297C9.06999 1.66788 9.52736 1.50049 10 1.50049C10.4726 1.50049 10.93 1.66788 11.291 1.97297L18.291 7.97197C18.5132 8.15976 18.6918 8.39378 18.8142 8.65768C18.9367 8.92159 19.0001 9.20904 19 9.49997V18.5C19 19.0304 18.7893 19.5391 18.4142 19.9142C18.0391 20.2893 17.5304 20.5 17 20.5H3C2.46957 20.5 1.96086 20.2893 1.58579 19.9142C1.21071 19.5391 1 19.0304 1 18.5V9.49997Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-black-300 transition-all group-hover:stroke-white"
      />
    </svg>
  );
}
