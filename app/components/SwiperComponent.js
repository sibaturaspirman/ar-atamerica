"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperComponent() {
  return (
    <div className='relative w-full'>
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={6}
        slidesPerView="auto"
        pagination={{ el: ".custom-pagination", clickable: true }}
        autoplay={false}
        className="w-full"
        >
            <SwiperSlide className="flex justify-center items-center !w-[42%]">
                <button className={`relative w-full mx-auto flex justify-center items-center`}>
                    <Image src='/mission-3.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                </button>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center !w-[42%]">
                <button className={`relative w-full mx-auto flex justify-center items-center`}>
                    <Image src='/mission-4.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                </button>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center !w-[42%]">
                <button className={`relative w-full mx-auto flex justify-center items-center`}>
                    <Image src='/mission-5.png' width={145} height={250} alt='Zirolu' className='w-full' priority />
                </button>
            </SwiperSlide>
        </Swiper>
        <div className='custom-pagination !top-0 !bottom-0 flex justify-center items-center mt-4'></div>
    </div>
  );
}
