'use client';

import Image from "next/image";
import Link from 'next/link';
import FrameBottom from "./components/FrameBottom";

export default function ARHome() {

  return (
    <Link href='/data' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center py-5 pt-5 px-5">
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='animate-upDown2 relative w-[85%] mx-auto flex justify-center items-center pointer-events-none mt-[-3rem]'>
          <Image src='/popup-front.png' width={326} height={335} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </Link>
  );
}
