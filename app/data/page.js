'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useState } from 'react';
import FrameBottom from "./../components/FrameBottom";
import { useRouter } from 'next/navigation';

export default function ARData() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    name: '',
    gender: '',
  });

  const handleChange = (e) => {
      const { value, name } = e.target;
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const isValid = () => {
    if (payload.name && payload.gender) return true
    else return false;
  };


  const handleSubmit = () => {
    localStorage.setItem('nameFix', payload.name.toUpperCase())
    localStorage.setItem('genderFix', payload.gender)
    setCookie('ARATMRC_name', payload.name);
    setCookie('ARATMRC_gender', payload.gender);
    setTimeout(() => {
        router.push('/cam');
    }, 100);
}

  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx py-5 pt-18 pb-10 px-5">
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-[85%] mx-auto flex justify-center items-center'>
          <Image src='/frame.png' width={311} height={454} alt='Zirolu' className='w-full' priority />

          <div className='absolute top-[-.4rem] w-[55%] mx-auto flex justify-center items-center'>
            <Image src='/identify.png' width={176} height={24} alt='Zirolu' className='w-full' priority />
          </div>

          <div className="absolute top-0 left-0 w-full p-5 py-8">
            <h4 className="text-center text-lg font-semibold">Input your name</h4>
            <p className="text-center text-sm -mt-1">Input your name for identification</p>
            <div className='relative w-full mt-2 mb-5'>
                <div className='relative w-full'>
                    <input
                        type='text'
                        value={payload.name}
                        id='name'
                        name='name'
                        className={`w-full text-base outline-none py-3 px-3 border-2 border-[#CFCFCF] bg-white rounded-md text-[#014283]`}
                        placeholder='Input your name'
                        onChange={handleChange}
                    />
                </div>
            </div>

            <h4 className="text-center text-lg font-bold mb-1">Choose Your Gender</h4>
            <div className='relative w-full'>
              <div className='relative w-full'>
                <div className='overflow-hiddenx w-full mx-auto flex justify-center items-center'>
                  <ul className='choose mod12 !w-[80%] mx-auto !mt-0'>
                    <li className="pr-2">
                        <input
                        id='choose_rokok1'
                        type="radio"
                        name='gender'
                        value="MALE"
                        onChange={handleChange}
                        />
                        <label htmlFor="choose_rokok1">
                        <Image
                            className="relative h-auto w-full"
                            src="/male.png"
                            alt="icon"
                            width={102}
                            height={145}
                            priority
                        />
                        <Image
                            className="absolute top-0 left-0 h-auto w-full"
                            src="/male_c.png"
                            alt="icon"
                            width={102}
                            height={145}
                            priority
                        />
                        </label>
                    </li>
                    <li className="pl-2">
                        <input
                        id='choose_rokok2'
                        type="radio"
                        name='gender'
                        value="FEMALE"
                        onChange={handleChange}
                        />
                        <label htmlFor="choose_rokok2">
                        <Image
                            className="relative h-auto w-full"
                            src="/female.png"
                            alt="icon"
                            width={102}
                            height={145}
                            priority
                        />
                        <Image
                            className="absolute top-0 left-0 h-auto w-full"
                            src="/female_c.png"
                            alt="icon"
                            width={102}
                            height={145}
                            priority
                        />
                        </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <button className={`relative w-[90%] mx-auto flex justify-center items-center ${isValid() ? '' : 'pointer-events-none opacity-50'}`} onClick={handleSubmit}>
                <Image src='/btn-continue.png' width={303} height={48} alt='Zirolu' className='w-full' priority />
            </button>

          </div>
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </div>
  );
}
