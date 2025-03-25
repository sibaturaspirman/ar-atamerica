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
  const [beginMission, setBeginMission] = useState(false);
  const [statusViewQR, setStatusViewQR] = useState(false);
  const [statusMisi1, setStatusMisi1] = useState(false);
  const [statusMisi2, setStatusMisi2] = useState(false);
  const [statusMisi3, setStatusMisi3] = useState(false);
  const [statusMisi4, setStatusMisi4] = useState(false);
  const [statusMisi5, setStatusMisi5] = useState(false);

  const toggleQRView = () => {
    setStatusViewQR((prevStatus) => !prevStatus);
  };


  const toggleBeginMission = () => {
    setBeginMission((prevStatus) => !prevStatus);
    localStorage.setItem('beginMission',true)
  };


  useEffect(() => {
    // Perform localStorage action
        const item = localStorage.getItem('resulAIBase64')
        const item2 = localStorage.getItem('nameFix')
        const item3 = localStorage.getItem('faceURLResult')
        setImageResultAI(item)
        setNameFix(item2)
        setImageResultAIURL(item3)

        localStorage.removeItem("beginMission");
        localStorage.removeItem("mission1");
        localStorage.removeItem("mission2");
        localStorage.removeItem("mission3");
        localStorage.removeItem("mission4");
        localStorage.removeItem("mission5");

  }, [imageResultAI, nameFix, imageResultAIURL])

  

  const downloadImageAI = () => {
    window.open(imageResultAIURL, '_blank');
    import('html2canvas').then(html2canvas => {
        html2canvas.default(document.querySelector("#capture"), {scale:1}).then(canvas => 
          uploadImage(canvas)
        )
    }).catch(e => {console("load failed")})
  }

  const uploadImage = async (canvas) => {
    // setLoadingDownload('≈')

    canvas.toBlob(async function(blob) {
        let bodyFormData = new FormData();
        bodyFormData.append("name", 'ATAMERICA');
        bodyFormData.append("phone", '000');
        bodyFormData.append("file", blob, 'card-atamerica.png');
      
        const options = {
            method: 'POST',
            body: bodyFormData,
            headers: {
                'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                'Accept': 'application/json',
            }
        };
        
        await fetch('https://photo-ai-iims.zirolu.id/v1/magnumhammersonic', options)
            .then(response => response.json())
            .then(response => {
                console.log(response.file)
            })
            .catch(err => {
                if (typeof localStorage !== 'undefined') {
                    const item = localStorage.getItem('faceURLResult')
                }
            });
    });
  }



  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx py-5 pt-18 pb-10 px-5">
      <div className={`${statusViewQR ? 'hidden' : 'flex'} fixed h-full w-full overflow-hidden flex-col items-center justify-center z-50 top-[-1rem] bg-[#222]/90`}>
        <Image src='/reedem.png' width={311} height={307} alt='Zirolu' className='w-[80%]' priority onClick={toggleQRView} />
      </div>

      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-[60%] mx-auto flex justify-center items-center mb-2'>
          <Image src='/received.png' width={251} height={72} alt='Zirolu' className='w-full' priority />
        </div>

        {imageResultAI && 
          <div className='relative w-[60%] mx-auto flex justify-center items-center overflow-hidden' id="capture">
            
            {/* <div className={`absolute top-0 left-0 w-full mx-auto flex justify-center items-center`}> */}
              <Image src={imageResultAI}  width={540} height={960} alt='Zirolu' className='relative top-0 w-full mx-auto flex justify-center items-center'></Image> 
            {/* </div> */}
            
          </div>
        }

        <button className={`relative w-full mx-auto flex justify-center items-center mt-2`} onClick={() => downloadImageAI()}>
          <Image src='/btn-download.png' width={303} height={48} alt='Zirolu' className='w-full' priority />
        </button>
        <div className='relative w-full mx-auto flex justify-center items-center animate-upDownCepet mt-2'>
          <Image src='/show.png' width={420} height={24} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </div>
  );
}
