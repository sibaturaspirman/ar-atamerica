'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import React,{ useEffect, useState, useRef } from 'react';
import FrameBottom from "./../components/FrameBottom";
import SwiperComponent from "./../components/SwiperComponent";

import { useRouter } from 'next/navigation';

export default function ARData() {
  const router = useRouter();
  const [nameFix, setNameFix] = useState(null);
  const [imageResultAI, setImageResultAI] = useState(null);
  const [imageResultAIURL, setImageResultAIURL] = useState(null);

  const [progressMisi, setProgressMisi] = useState(0);
  const [progressMisiPersen, setProgressMisiPersen] = useState(0);
  const [statusViewQR, setStatusViewQR] = useState(false);
  const [statusMisi1, setStatusMisi1] = useState(false);
  const [statusMisi2, setStatusMisi2] = useState(false);
  const [statusMisi3, setStatusMisi3] = useState(false);
  const [statusMisi4, setStatusMisi4] = useState(false);
  const [statusMisi5, setStatusMisi5] = useState(false);

  const toggleQRView = () => {
    setStatusViewQR((prevStatus) => !prevStatus);
  };


  useEffect(() => {
    // Perform localStorage action
        const item = localStorage.getItem('resulAIBase64')
        const item2 = localStorage.getItem('nameFix')
        const item3 = localStorage.getItem('faceURLResult')
        setImageResultAI(item)
        setNameFix(item2)
        setImageResultAIURL(item3)

        const itemMisi1 = localStorage.getItem('mission1')
        if(itemMisi1 != null && itemMisi1 == 'misi1'){
          setStatusMisi1(true)
          setProgressMisi(1)
          setProgressMisiPersen(20)
        }

        const itemMisi2 = localStorage.getItem('mission2')
        if(itemMisi2 != null && itemMisi2 == 'misi2'){
          setStatusMisi2(true)
          setProgressMisi(2)
          setProgressMisiPersen(40)
        }

        const itemMisi3 = localStorage.getItem('mission3')
        if(itemMisi3 != null && itemMisi3 == 'misi3'){
          setStatusMisi3(true)
          setProgressMisi(3)
          setProgressMisiPersen(60)
        }

        const itemMisi4 = localStorage.getItem('mission4')
        if(itemMisi4 != null && itemMisi4 == 'misi4'){
          setStatusMisi4(true)
          setProgressMisi(4)
          setProgressMisiPersen(80)
        }

        const itemMisi5 = localStorage.getItem('mission5')
        if(itemMisi5 != null && itemMisi5 == 'misi5'){
          setStatusMisi5(true)
          setProgressMisi(5)
          setProgressMisiPersen(100)
        }

  }, [imageResultAI, nameFix, statusMisi1, statusMisi2, statusMisi3, statusMisi4, statusMisi5, progressMisi, progressMisiPersen, imageResultAIURL])

  const openMission = (missionId) => {
    console.log(missionId)
    // router.push(`/mission/mission${missionId}`);
    toggleQRView()
  }

  const viewBadge = () => {
    window.open(imageResultAIURL, '_blank');
  }



  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx py-5 pt-18 pb-10 px-5">
      <div className={`${statusViewQR ? 'flex' : 'hidden'} fixed h-full w-full overflow-hidden flex-col items-center justify-center z-50 top-[-1rem] bg-[#222]/90`}>
        <Image src='/scanqr.png' width={343} height={295} alt='Zirolu' className='w-[80%]' priority onClick={toggleQRView} />
      </div>
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/frame-objective.png' width={335} height={200} alt='Zirolu' className='w-full' priority />

          <div className="absolute top-0 left-0 w-full p-5 py-8 pt-6">
            <div className='relative w-full flex justify-centerx items-center'>
              {/* <div className="relative overflow-hidden rounded-xl border-4 border-[#014283] w-[50px] mr-2"> */}
              <div className={`relative overflow-hidden rounded-xl border-4 border-[#014283] ${statusMisi1 && statusMisi2 && statusMisi3 && statusMisi4 && statusMisi5 ? 'w-[50px]' : 'w-[70px]'}  mr-2`}>
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
            {!statusMisi1 && !statusMisi2 && !statusMisi3 && !statusMisi4 && !statusMisi5 &&
            <div className="relative w-full">
              <div className='relative w-full mx-auto flex justify-center items-center mt-2'>
                <Image src='/mission-info.png' width={303} height={56} alt='Zirolu' className='w-full' priority />
              </div>
              <div className='relative w-full mx-auto flex justify-center items-center mt-2'>
                <div className="relative w-full h-[14px] bg-[#151515] rounded-xl mr-2">
                  <div className={`absolute w-[20%] h-[14px] bg-[#014283] rounded-xl  ${statusMisi1 ? '' : 'opacity-0'}`}></div>
                  <div className={`absolute w-[40%] h-[14px] bg-[#014283] rounded-xl  ${statusMisi2 ? '' : 'opacity-0'}`}></div>
                  <div className={`absolute w-[60%] h-[14px] bg-[#014283] rounded-xl  ${statusMisi3 ? '' : 'opacity-0'}`}></div>
                  <div className={`absolute w-[80%] h-[14px] bg-[#014283] rounded-xl  ${statusMisi4 ? '' : 'opacity-0'}`}></div>
                  <div className={`absolute w-[100%] h-[14px] bg-[#014283] rounded-xl  ${statusMisi5 ? '' : 'opacity-0'}`}></div>
                </div>
                <p>{progressMisi}/5</p>
              </div>
            </div>
            }

            {/* MISSION DONE */}
            {statusMisi1 && statusMisi2 && statusMisi3 && statusMisi4 && statusMisi5 &&
            <div className="relative w-full">
              <div className='relative w-full mx-auto flex justify-center items-center mt-2'>
                <Image src='/mission-info-done.png' width={303} height={56} alt='Zirolu' className='w-full' priority />
              </div>
              <button className={`relative w-[full] mx-auto flex justify-center items-center mt-2`} onClick={() => viewBadge()}>
                <Image src='/btn-missioncard.png' width={303} height={48} alt='Zirolu' className='w-full' priority />
              </button>
            </div>
            }
          </div>
        </div>

        <div className='relative w-full mx-auto flex justify-center items-center mt-3'>
          <Image src='/frame-mission.png' width={335} height={364} alt='Zirolu' className='w-full' priority />

          <div className="absolute top-0 left-0 w-full p-5 py-8 pt-8">
            <div className='relative w-full mx-auto flex justify-center items-center'>
              <Image src='/mission-title-space.png' width={298} height={44} alt='Zirolu' className='w-full' priority />
            </div>
            <div className='relative w-full mx-auto flex justify-center items-center mt-2'>
              <button className={`relative w-full mx-auto flex justify-center items-center mr-1`} onClick={() => openMission(1)}>
                <Image src='/mission-1.png' width={145} height={250} alt='Zirolu' className='w-full' priority />

                <div className={`absolute top-0 left-0 w-[100px] mx-auto flex justify-center items-center ${statusMisi1 ? '' : 'opacity-0'}`}>
                  <Image src='/completed.png' width={175} height={58} alt='Zirolu' className='w-full' priority />
                </div>
              </button>
              <button className={`relative w-full mx-auto flex justify-center items-center ml-1`} onClick={() => openMission(2)}>
                <Image src='/mission-2.png' width={145} height={250} alt='Zirolu' className='w-full' priority />

                  <div className={`absolute top-0 left-0 w-[100px] mx-auto flex justify-center items-center ${statusMisi2 ? '' : 'opacity-0'}`}>
                    <Image src='/completed.png' width={175} height={58} alt='Zirolu' className='w-full' priority />
                  </div>
              </button>
            </div>
          </div>
        </div>

        <div className='relative w-full mx-auto flex justify-center items-center mt-3'>
          <Image src='/frame-mission.png' width={335} height={364} alt='Zirolu' className='w-full' priority />

          <div className="absolute top-0 left-0 w-full p-5 py-8 pt-8">
            <div className='relative w-full mx-auto flex justify-center items-center'>
              <Image src='/mission-title-moon.png' width={298} height={44} alt='Zirolu' className='w-full' priority />
            </div>
            <div className='relative w-full mx-auto flex justify-center mt-2 overflow-x-auto'>
              <SwiperComponent />
              {/* <div className='relative w-[1024px] mx-auto flex'>
                <button className={`relative w-full mx-auto flex justify-center items-center mr-1`}>
                  <Image src='/mission-3.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                </button>
                <button className={`relative w-full mx-auto flex justify-center items-center mr-1 ml-1`}>
                  <Image src='/mission-4.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                </button>
                <button className={`relative w-full mx-auto flex justify-center items-center ml-1`}>
                  <Image src='/mission-5.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </div>
  );
}
