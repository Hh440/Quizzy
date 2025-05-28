import { useState } from "react";
import type { Socket } from "socket.io-client";
import { motion } from "framer-motion";

export const CreateProblem = ({
  socket,
  roomId,
}: {
  socket: Socket;
  roomId: string;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState([
    { id: 0, title: "" },
    { id: 1, title: "" },
    { id: 2, title: "" },
    { id: 3, title: "" },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl p-8 rounded-2xl shadow-xl backdrop-blur-md bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-white/10"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-6">
        🧠 Create a New Quiz Problem
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-200 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/10 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-200 mb-1">Description</label>
          <input
            type="text"
            placeholder="Optional: Add context for the question"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/10 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {options.map((option, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="radio"
                checked={answer === idx}
                onChange={() => setAnswer(idx)}
                className="w-5 h-5"
              />
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={option.title}
                onChange={(e) =>
                  setOptions((prev) =>
                    prev.map((opt) =>
                      opt.id === idx ? { ...opt, title: e.target.value } : opt
                    )
                  )
                }
                className="flex-1 px-4 py-2 border rounded-lg bg-white/10 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            socket.emit("createProblem", {
              roomId,
              problem: {
                title,
                description,
                options,
                answer,
              },
            });

            setTitle("");
            setDescription("");
            setAnswer(0);
            setOptions([
              { id: 0, title: "" },
              { id: 1, title: "" },
              { id: 2, title: "" },
              { id: 3, title: "" },
            ]);
          }}
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition shadow-md mt-4"
        >
          ➕ Add Problem
        </motion.button>

        <p className="text-sm text-gray-300 text-center mt-3">
          Select the correct answer before submitting.
        </p>
      </div>
    </motion.div>
  );
};
