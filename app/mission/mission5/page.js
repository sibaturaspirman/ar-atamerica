'use client';
// import Image from "next/image";
// import Link from 'next/link';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Script from "next/script";

export default function ARGame() {
  const router = useRouter();
  
  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const IFRAME_ID = "my-iframe";

  useEffect(() => {
      if (!isScriptLoaded) return; // Jangan lanjut jika script belum dimuat

      const registerIframe = () => {
          if (window.XRIFrame) {
              window.XRIFrame.registerXRIFrame(IFRAME_ID);
              console.log("✅ 8thWall iframe registered!");
          } else {
              console.error("❌ XRIFrame is not available yet.");
          }
      };

      registerIframe(); // Coba daftar iframe setelah script dimuat
  }, [isScriptLoaded]); // Jalankan ulang jika script sudah dimuat

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://g.minigim.fun') return;
      try {
        const decodedMessage = event.data;
        console.log('Pesan diterima dari iframe:', decodedMessage);
        
        if(decodedMessage.action == 'misiDone'){
          localStorage.setItem('mission5', decodedMessage.data)
          // alert(decodedMessage.data)
          setTimeout(() => {
            // router.push('/mission');
            router.push('/result');
          }, 200);
        }else if(decodedMessage.action == 'misiDoneQuiz'){
          localStorage.setItem('mission5', decodedMessage.data)
          // alert(decodedMessage.data)
          setTimeout(() => {
            router.push('/result');
          }, 200);
        }

      } catch (error) {
        console.error('Gagal mendekode atau mengurai pesan:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center">  
        <Script src="//cdn.8thwall.com/web/iframe/iframe.js" strategy="lazyOnload" onLoad={() => {
                    console.log("✅ 8thWall Script Loaded!");
                    setScriptLoaded(true); // Tandai bahwa script telah dimuat
                }} />
        <iframe   
          id="my-iframe"
          src="https://g.minigim.fun/ar-atamerica-mission-5/dist/cam.html" 
          allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;"
          className="w-full h-full border-none"
        ></iframe>
    </div>
  );
}
