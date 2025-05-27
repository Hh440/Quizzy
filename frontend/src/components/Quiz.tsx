import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from './Clock';

/**
 Simple View with title and answers - $25
    title : string
    choices: strings[]
    image?: string
 */

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
  userId: string;
  problemId: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState(0);

  return (
    <div className="h-screen bg-gradient-to-r from-black to-[#16325B] flex items-center justify-center">
      <div className="grid grid-cols-2 gap-20 items-center">
        {/* Left: Quiz */}
        <div className="flex flex-col justify-center">
          <SingleQuiz
            choices={quizData.options.map((x) => x.title)}
            title={quizData.title}
            imageURL={''}
            setSelected={setSubmission}
          />

          <div className="mt-6">
            <motion.button
              className="py-3 px-10 bg-gray-700 text-white rounded-lg"
              disabled={submitted}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSubmitted(true);
                socket.emit('submit', {
                  userId,
                  problemId,
                  submission: Number(submission),
                  roomId,
                });
              }}
            >
              Submit
            </motion.button>
          </div>
        </div>

        {/* Right: Clock */}
        <div className="flex justify-center items-center">
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
  setSelected: any;
};

function SingleQuiz({
  title,
  choices,
  imageURL,
  setSelected,
}: SingleQuizProps) {
  return (
    <article className="text-white">
      <h4 className="text-3xl mb-4">Question</h4>
      <div className="text-2xl mb-6">{title}</div>
      {imageURL && <img src={imageURL} alt="" className="mb-4" />}
      {choices.map((choice, index) => (
        <div
          key={index}
          className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
        >
          <input
            type="radio"
            name="option"
            value={choice}
            className="w-6 h-6 bg-black"
            onClick={() => {
              setSelected(index);
            }}
          />
          <p className="ml-6">{choice}</p>
        </div>
      ))}
    </article>
  );
}
