import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from './Clock';

export function Quiz({
  quizData,
  socket,
  userId,
  problemId,
  roomId,
}: {
  quizData: {
    title: string;
    options: { title: string }[];
  };
  socket: any;
  roomId: string;
  time: number;
  userId: string;
  problemId: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#16325B] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white">
        
        {/* Left: Quiz */}
        <div>
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Quiz Time!</h1>
            <p className="text-white/80">
              Choose the correct answer and click submit before the timer runs out.
            </p>
          </div>

          <SingleQuiz
            choices={quizData.options.map((x) => x.title)}
            title={quizData.title}
            imageURL={''}
            setSelected={setSubmission}
            selectedIndex={submission}
          />

          {submission !== null && (
            <div className="mt-4 text-green-300 font-medium">
              Selected Answer: {quizData.options[submission]?.title}
            </div>
          )}

          <motion.button
            className="mt-8 py-3 px-10 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg disabled:opacity-50"
            disabled={submitted || submission === null}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSubmitted(true);
              socket.emit('submit', {
                userId,
                problemId,
                submission: submission,
                roomId,
              });
            }}
          >
            {submitted ? 'Submitted' : 'Submit'}
          </motion.button>
        </div>

        {/* Right: Clock & Status */}
        <div className="text-center flex flex-col items-center">
          <Clock />
        </div>
      </div>
    </div>
  );
}

type SingleQuizProps = {
  title: string;
  choices: string[];
  imageURL?: string;
  setSelected: (i: number) => void;
  selectedIndex: number | null;
};

function SingleQuiz({
  title,
  choices,
  imageURL,
  setSelected,
  selectedIndex,
}: SingleQuizProps) {
  return (
    <article className="mt-6">
      <h4 className="text-2xl mb-2 font-semibold">Question</h4>
      <p className="text-xl mb-4">{title}</p>
      {imageURL && (
        <img src={imageURL} alt="quiz visual" className="mb-4 rounded-lg shadow-lg" />
      )}
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <label
            key={index}
            className={`flex items-center w-full py-3 px-5 border rounded-xl cursor-pointer transition-all ${
              selectedIndex === index
                ? 'bg-blue-600 border-blue-400'
                : 'bg-white/10 border-white/10 hover:bg-white/20'
            }`}
          >
            <input
              type="radio"
              name="option"
              value={choice}
              className="w-5 h-5 text-blue-500 bg-gray-900 border-gray-300 focus:ring-0"
              onChange={() => setSelected(index)}
              checked={selectedIndex === index}
            />
            <span className="ml-4">{choice}</span>
          </label>
        ))}
      </div>
    </article>
  );
}
