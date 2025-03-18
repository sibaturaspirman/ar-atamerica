'use client';

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});
let URL_RESULT = '', FACE_URL_RESULT = ''
let FIXSEEDPILIH = 0, PROMPTFIX = '';

const useWebcam = ({
    videoRef
  }) => {
    useEffect(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
          if (videoRef.current !== null) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        });
      }
    }, [videoRef]);
};

export default function Cam() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const videoRef = useRef(null);
    const previewRef = useRef(null);

    useWebcam({ videoRef,previewRef});

    const captureVideo = ({ width = 512, height = 512 }) => {
        setCaptured(true);
        setTimeout(() => {
            setEnabled(true);
            setCaptured(null);
            
            const canvas = previewRef.current;
            const video = videoRef.current;
            
            if (!canvas || !video) return;
            
            // Resize canvas
            canvas.width = width;
            canvas.height = height;
            
            const context = canvas.getContext("2d");
            if (!context) return;
            
            // Hitung aspect ratio untuk crop
            const aspectRatio = video.videoWidth / video.videoHeight;
            let sourceX, sourceY, sourceWidth, sourceHeight;

            if (aspectRatio > 1) {
                sourceWidth = video.videoHeight;
                sourceHeight = video.videoHeight;
                sourceX = (video.videoWidth - video.videoHeight) / 2;
                sourceY = 0;
            } else {
                sourceWidth = video.videoWidth;
                sourceHeight = video.videoWidth;
                sourceX = 0;
                sourceY = (video.videoHeight - video.videoWidth) / 2;
            }

            // Gambar video ke canvas
            context.drawImage(
                video,
                sourceX, sourceY, sourceWidth, sourceHeight,
                0, 0, width, height
            );

            // Simpan hasil capture ke localStorage
            let faceImage = canvas.toDataURL();
            setImageFile(faceImage)
            localStorage.setItem("faceImage", faceImage);

            // Stop video setelah menangkap gambar
            video.pause();
            if (video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
        }, 3000);
    };

    const retake = () => {
        setCaptured(false);
        setEnabled(false)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                if (videoRef.current !== null) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            });
        }
    }


    // AI
    const [prompt1, setPrompt1] = useState();
    const [prompt, setPrompt] = useState(null);
    const [promptNegative, setPromptNegative] = useState('bikini, sexy, boobs, flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry');
    const [CGF, setCGF] = useState(1.2);
    const [IDScale, setIDScale] = useState(0.8);
    const [SEED, setSEED] = useState(13047);
    const [numSteps, setNumSteps] = useState(4);

    const [imageFile, setImageFile] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);
    const [imageFile3, setImageFile3] = useState(null);
    const [styleFix, setStyleFix] = useState(null);
    const [styleFix2, setStyleFix2] = useState(null);
    const [masalah, setMasalah] = useState(null);
    const [genderFix, setGenderFix] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [resultFaceSwap2, setResultFaceSwap2] = useState(null);
    const [resultFaceSwap3, setResultFaceSwap3] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    // @snippet:end
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item1 = localStorage.getItem('genderFix')
            setGenderFix(item1)
        }
    }, [genderFix])



    const generateAI = () => {
        setNumProses1(true)
        // console.log(masalah)

        if(genderFix == 'MALE'){
            PROMPTFIX = "A portrait photo of an male astronaut inside a spaceship, with the blue and white Earth as the background. The astronaut has a happy and proud expression. Soft light from the spaceship's window illuminates the astronaut's face. The photo is high-resolution with sharp details. Shot with a wide-angle lens for a dramatic, immersive effect. HDR, 8K resolution, hyper-detailed."
            // FIXSEEDPILIH = '13047'
            FIXSEEDPILIH = '196402'
        }else{
            PROMPTFIX = "A portrait photo of an female astronaut inside a spaceship, with the blue and white Earth as the background. The astronaut has a happy and proud expression. Soft light from the spaceship's window illuminates the astronaut's face. The photo is high-resolution with sharp details. Shot with a wide-angle lens for a dramatic, immersive effect. HDR, 8K resolution, hyper-detailed."
            // FIXSEEDPILIH = '13047'
            FIXSEEDPILIH = '196402'
        }

        setTimeout(() => {
            generateImage()
        }, 500);
    }


    const reset = () => {
        setLoading(false);
        setError(null);
        setResult(null);
        setResultFaceSwap(null);
        setLogs([]);
        setElapsedTime(0);
    };
    const reset2 = () => {
      setLoading(false);
      setError(null);
      setElapsedTime(0);
    };

  
    const generateImage = async () => {
        console.log(PROMPTFIX)
        console.log(FIXSEEDPILIH)
        setNumProses(1)
      reset();
      // @snippet:start("client.queue.subscribe")
      setLoading(true);
      const start = Date.now();
      try {
        const result = await fal.subscribe(
            'fal-ai/pulid',{
            input: {
                reference_images: [{
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    }
                ],
                prompt: PROMPTFIX,
                negative_prompt: promptNegative,
                seed: FIXSEEDPILIH,
                num_images: 1,
                guidance_scale: CGF,
                num_inference_steps: numSteps,
                image_size: {
                    height: 768,
                    width: 768
                },
                id_scale: IDScale,
                mode: "fidelity"
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
              setElapsedTime(Date.now() - start);
              if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
              ) {
                setLogs((update.logs || []).map((log) => log.message));
                // console.log(update)
              }
            },
          }
        );
        setResult(result);
        URL_RESULT = result.images[0].url;
        console.log(URL_RESULT)
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("generateURLResult", URL_RESULT)
        }
      } catch (error) {
        // setError(error);
      } finally {
        setLoading(false);
        setElapsedTime(Date.now() - start);
        generateImageSwap()
      }
      // @snippet:end
    };

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))




    const generateImageSwap = async () => {
        setNumProses(2)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();
        try {
        const result = await fal.subscribe(
            'fal-ai/face-swap',
            {
            input: {
                base_image_url: URL_RESULT,
                swap_image_url: imageFile
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
                ) {
                setLogs((update.logs || []).map((log) => log.message));
                }
            },
            }
        );
        setResultFaceSwap(result);
        FACE_URL_RESULT = result.image.url;

        // emitStrsing("sendImage", result.image.url);

        toDataURL(FACE_URL_RESULT)
        .then(dataUrl => {
            // console.log('RESULT:', dataUrl)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
            }
            
            setTimeout(() => {
                router.push('/mission');
            }, 200);
        })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };


    return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx py-5 pt-14 pb-10 px-5">
        <div className="relative w-full flex justify-center items-center flex-col">
            <div className='relative w-[85%] mx-auto flex justify-center items-center'>
                <Image src='/frame.png' width={311} height={454} alt='Zirolu' className='w-full' priority />
                <div className="absolute top-0 left-0 w-full p-5 py-8">
                    <h4 className="text-center text-lg font-bold">Take your photo</h4>
                    <p className="text-center text-sm leading-[1.2]">Your photo will be used later on your mission&nbsp;card.</p>
                    <div className="relative w-full flex flex-col justify-center items-center mt-4">
                        <div className='relative w-[77%] mb-8'>
                            {captured && 
                            <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                                <div className='w-full animate-countdown translate-y-[35%]'>
                                    <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                            }
                            <div className='absolute top-0 left-0 w-full mx-auto flex justify-center items-center z-10 scale-[1.1]'>
                                <Image src='/capture-frame.png' width={252} height={252} alt='Zirolu' className='w-full' priority />
                            </div>

                            <div className={`animate-scanning w-[100%] mx-auto absolute left-0 right-0 bottom-0 z-10 pointer-events-nones  ${numProses1 ? '' : 'opacity-0'}`}>
                                <Image src='/scan-line2.png' width={656} height={240} alt='Zirolu' className='w-full' priority />
                            </div>

                            <video ref={videoRef} className={`w-full videoRatio1 mx-auto border-2 border-[#D21241] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>

                            <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-full top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#D21241] rounded-sm`}></canvas>
                        </div>
                        {!enabled && 
                            <button className="relative mx-auto flex  w-[90%] justify-center items-center" onClick={captureVideo}>
                                <Image src='/btn-capture.png' width={279} height={48} alt='Zirolu' className='w-full' priority />
                            </button>
                        }

                    
                        {numProses1 && 
                        <div className={`relative w-[90%]`}>
                            <div className='animate-upDownCepet relative flex justify-center items-center flex-col py-2 lg:py-6 px-2 mt-2 text-xs border-2 text-left bg-[#EF000F] rounded-xl text-[#fff] font-bold bg-black/80 p-7 rounded-sm'>
                                <div className='flex justify-center items-center w-full'>
                                    <Image src='/icon-info.png' width={40} height={40} alt='Zirolu' className='w-[20px] mr-2' priority />
                                    <p>{`Your mission and spaceship are being prepared. GET READY TO LAUNCH!`}</p>
                                </div>
                                    {/* <p className='mt-2'>{`GET READY! : ${(elapsedTime / 1000).toFixed(2)} detik`}</p>
                                {error} */}
                            </div>
                        </div>
                        }

                        <div className={`relative w-full ${numProses1 ? 'hidden opacity-0 pointer-events-none' : ''}`}>
                            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                                <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                                        <Image src='/btn-continue.png' width={279} height={48} alt='Zirolu' className='w-full' priority />
                                    </button>
                                    <button className="relative w-full mx-auto flex justify-center items-center" onClick={retake}>
                                        <Image src='/btn-retake.png' width={279} height={48} alt='Zirolu' className='w-full' priority />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
