'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import FrameBottom from "./../../../components/FrameBottom";
import { useRouter } from 'next/navigation';

export default function QuizAnswer() {
  const router = useRouter();

  const questions = [
    {
      question: 'What does NASA stand for?',
      correctAnswerPenjelasan: 'National Aeronautics and Space Administration',
      answers: [
        { text: 'North American Space Administration', correct: false },
        { text: 'National Aeronautics and Space Agency', correct: false },
        { text: 'National Aeronautics and Space Administration', correct: true },
        { text: 'National Agency for Space Affiliation', correct: false },
      ],
    },
    {
      question: 'Which Apollo mission successfully landed the first humans on the Moon?',
      correctAnswerPenjelasan: 'Apollo 11 - Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon on July 20, 1969.',
      answers: [
        { text: 'Apollo 8', correct: false },
        { text: 'Apollo 13', correct: false },
        { text: 'Apollo 17', correct: false },
        { text: 'Apollo 11', correct: true },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setShuffledAnswers([...questions[currentQuestionIndex].answers].sort(() => Math.random() - 0.5));
  }, [currentQuestionIndex]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer.text);
    setIsCorrect(answer.correct);


    if (answer.correct) {
    } else {
      setTimeout(() => {
        setSelectedAnswer(null)
        setCurrentQuestionIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      }, 1500);
    }
  };

  const scanQR = () => {
    router.push('/mission/mission1');
  }

  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center py-5 pt-5 px-5">
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/frame-quiz.png' width={343} height={461} alt='Zirolu' className='w-full' priority />
          <div className="absolute top-0 left-0 w-full p-8 py-8 pt-3">
            <h2 className="text-base text-center font-semibold mb-1">{questions[currentQuestionIndex].question}</h2>
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
                <p className={`mt-1 text-sm font-semibold ${isCorrect ? 'text-[#158045]' : 'text-[#AA0808]'}`}>
                  {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                </p>
                {isCorrect &&
                <p className="mt-0 text-sm leading-[1.2]">{questions[currentQuestionIndex].correctAnswerPenjelasan}</p>
                }
              </div>
            )}
            <button className={`relative w-full mx-auto flex justify-center items-center mt-2 ${selectedAnswer && isCorrect  ? '' : 'pointer-events-none opacity-20'}`} onClick={() => scanQR()}>
              <Image src='/btn-scan.png' width={303} height={48} alt='Zirolu' className='w-full' priority />
            </button>
          </div>
        </div>
      </div>
      <FrameBottom></FrameBottom>
    </div>
  );
}
