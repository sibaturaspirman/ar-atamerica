'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import React,{ useEffect, useState, useRef } from 'react';
import FrameBottom from "./../components/FrameBottom";
import { useRouter } from 'next/navigation';

export default function ARData() {
  const router = useRouter();
  const [nameFix, setNameFix] = useState(null);
  const [imageResultAI, setImageResultAI] = useState(null);


  useEffect(() => {
    // Perform localStorage action
    if (typeof localStorage !== 'undefined') {
        const item = localStorage.getItem('resulAIBase64')
        const item2 = localStorage.getItem('nameFix')
        setImageResultAI(item)
        setNameFix(item2)
    }
}, [imageResultAI, nameFix])

  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx py-5 pt-14 pb-10 px-5">
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-[100%] mx-auto flex justify-center items-center'>
          <Image src='/frame-objective.png' width={335} height={200} alt='Zirolu' className='w-full' priority />

          <div className="absolute top-0 left-0 w-full p-5 py-8">
            <div className='relative w-full flex justify-centerx items-center'>
              {/* <div className="relative overflow-hidden rounded-xl border-4 border-[#014283] w-[50px] mr-2"> */}
              <div className="relative overflow-hidden rounded-xl border-4 border-[#014283] w-[70px] mr-2">
                {imageResultAI && 
                  <Image src={imageResultAI}  width={400} height={400} alt='Zirolu' className='relative block w-full'></Image> 
                }
              </div>
              <div className="relative">
                <h4 className="text-base font-bold">Welcome, {nameFix}</h4>
                <p className="text-xs text-[#014283]">Space Commander</p>
              </div>
            </div>

            {/* MISSION ON PROGRESS */}
            <div className='relative w-full mx-auto flex justify-center items-center mt-3'>
              <Image src='/mission-info.png' width={303} height={56} alt='Zirolu' className='w-full' priority />
            </div>
            <div className='relative w-full mx-auto flex justify-center items-center mt-2'>
              <div className="relative w-full h-[14px] bg-[#151515] rounded-xl mr-2">
                <div className="absolute w-[25%] h-[14px] bg-[#014283] rounded-xl"></div>
              </div>
              <p>0/5</p>
            </div>

            {/* MISSION DONE */}
            {/* <div className='relative w-full mx-auto flex justify-center items-center mt-2'>
              <Image src='/mission-info-done.png' width={303} height={56} alt='Zirolu' className='w-full' priority />
            </div>
            <button className={`relative w-full mx-auto flex justify-center items-center mt-2`}>
              <Image src='/btn-missioncard.png' width={303} height={48} alt='Zirolu' className='w-full' priority />
            </button> */}
          </div>
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </div>
  );
}
