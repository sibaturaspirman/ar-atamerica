"use client";
import React,{ useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from 'next/navigation';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperComponent() {
    const router = useRouter();

    const [statusMisi3, setStatusMisi3] = useState(false);
    const [statusMisi4, setStatusMisi4] = useState(false);
    const [statusMisi5, setStatusMisi5] = useState(false);

    const [statusViewQR, setStatusViewQR] = useState(false);


    useEffect(() => {
      // Perform localStorage action
          const itemMisi3 = localStorage.getItem('mission3')
          if(itemMisi3 != null && itemMisi3 == 'misi3'){
            setStatusMisi3(true)
          }
  
          const itemMisi4 = localStorage.getItem('mission4')
          if(itemMisi4 != null && itemMisi4 == 'misi4'){
            setStatusMisi4(true)
          }
  
          const itemMisi5 = localStorage.getItem('mission5')
          if(itemMisi5 != null && itemMisi5 == 'misi5'){
            setStatusMisi5(true)
          }
  
    }, [statusMisi3, statusMisi4, statusMisi5])

    const toggleQRView = () => {
        setStatusViewQR((prevStatus) => !prevStatus);
    };
    const openMission = (missionId) => {
      console.log(missionId)
    //   router.push(`/mission/mission${missionId}`);
        toggleQRView()
    }

  return (
    <div className='relative w-full'>
        <div className={`${statusViewQR ? 'flex' : 'hidden'}  fixed h-full w-full overflow-hidden flex-col items-center justify-center z-50 top-[-1rem] left-0 bg-[#222]/90`}>
            <Image src='/scanqr.png' width={343} height={295} alt='Zirolu' className='w-[80%]' priority onClick={toggleQRView} />
        </div>

        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={6}
        slidesPerView="auto"
        pagination={{ el: ".custom-pagination", clickable: true }}
        autoplay={false}
        className="w-full"
        >
            <SwiperSlide className="flex justify-center items-center !w-[42%]">
                <button className={`relative w-full mx-auto flex justify-center items-center`} onClick={() => openMission(3)}>
                    <Image src='/mission-3.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                    
                    <div className={`absolute top-0 left-0 w-[100px] mx-auto flex justify-center items-center ${statusMisi3 ? '' : 'opacity-0'}`}>
                        <Image src='/completed.png' width={175} height={58} alt='Zirolu' className='w-full' priority />
                    </div>
                </button>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center !w-[42%]">
                <button className={`relative w-full mx-auto flex justify-center items-center`} onClick={() => openMission(4)}>
                    <Image src='/mission-4.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                    
                    <div className={`absolute top-0 left-0 w-[100px] mx-auto flex justify-center items-center ${statusMisi4 ? '' : 'opacity-0'}`}>
                        <Image src='/completed.png' width={175} height={58} alt='Zirolu' className='w-full' priority />
                    </div>
                </button>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center !w-[42%]">
                <button className={`relative w-full mx-auto flex justify-center items-center`} onClick={() => openMission(5)}>
                    <Image src='/mission-5.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                    
                    <div className={`absolute top-0 left-0 w-[100px] mx-auto flex justify-center items-center ${statusMisi5 ? '' : 'opacity-0'}`}>
                        <Image src='/completed.png' width={175} height={58} alt='Zirolu' className='w-full' priority />
                    </div>
                </button>
            </SwiperSlide>
        </Swiper>
        <div className='custom-pagination !top-0 !bottom-0 flex justify-center items-center mt-4'></div>
    </div>
  );
}
