import Image from "next/image";
import Link from "next/link";
export default function GroupRegisterButton() {
  return (<Link href = '/group/register' className="w-[54px] h-[54px] flex justify-center items-center cursor-pointer bg-blue-500 rounded-full mb-4">
    <Image width = {24} height = {24} src = '/plus.png' alt = 'plus'/>
  </Link>);
}