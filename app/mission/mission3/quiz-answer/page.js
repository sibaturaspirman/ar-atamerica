'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import FrameBottom from "./../../../components/FrameBottom";
import { useRouter } from 'next/navigation';

export default function QuizAnswer() {
  const router = useRouter();
  const question = 'Which American astronomer is known for developing the theory of the expanding universe?';
  const correctAnswer = 'Edwin Hubble';
  const correctAnswerPenjelasan = "Edwin Hubble - His observations showed that galaxies are moving away from us, leading to the understanding that the universe is expanding.";
  const answers = [
    { text: 'Carl Sagan', correct: false },
    { text: 'Clyde Tombaugh', correct: false },
    { text: correctAnswer, correct: true },
    { text: 'Neil deGrasse Tyson', correct: false },
  ];

  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setShuffledAnswers([...answers].sort(() => Math.random() - 0.5));
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer.text);
    setIsCorrect(answer.correct);
  };

  const scanQR = () => {
    router.push('/mission/mission3');
  }

  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center py-5 pt-5 px-5">
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/frame-quiz.png' width={343} height={461} alt='Zirolu' className='w-full' priority />
          <div className="absolute top-0 left-0 w-full p-6 py-8 pt-3">
            <h2 className="text-base text-center font-semibold mb-2 leading-[1.2]">{question}</h2>
            <ul>
              {shuffledAnswers.map((answer, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleAnswerClick(answer)}
                    className={`relative outline-none w-full p-3 px-2 pr-6 my-1 font-bold text-sm leading-[1.2] border-2 rounded-lg transition-all ${
                      selectedAnswer === answer.text
                        ? answer.correct
                          ? 'bg-[#CEE5D8] text-[#158045] border-[#158045]'
                          : 'bg-[#D7B9B9] text-[#AA0808] border-[#AA0808]'
                        : 'bg-white border-[#CFCFCF]'
                    }`}
                  >
                    {answer.text}


                    {selectedAnswer === answer.text && (
                      <p className="absolute top-0 bottom-0 my-auto right-2 font-semibold flex justify-center items-center">
                        {isCorrect ? '✅' : '❌'}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {selectedAnswer && (
              <div className='relative w-full'>
                <p className={`mt-1 text-base font-semibold ${isCorrect ? 'text-[#158045]' : 'text-[#AA0808]'}`}>
                  {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                </p>
                <p className="mt-0 text-sm leading-[1.2]">{!isCorrect ? 'The correct answer is ' : ''} {correctAnswerPenjelasan}</p>
              </div>
            )}
             <button className={`relative w-full mx-auto flex justify-center items-center mt-2 ${selectedAnswer ? '' : 'pointer-events-none opacity-20'}`} onClick={() => scanQR()}>
              <Image src='/btn-scan.png' width={303} height={48} alt='Zirolu' className='w-full' priority />
            </button>
          </div>
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </div>
  );
}
