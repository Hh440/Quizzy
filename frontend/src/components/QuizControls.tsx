import type { Socket } from "socket.io-client";
import { motion } from "framer-motion";

export const QuizControls = ({
  socket,
  roomId,
}: {
  socket: Socket;
  roomId: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl p-6 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl mt-10"
    >
      <h2 className="text-white text-3xl font-semibold text-center mb-6">🎮 Quiz Controls</h2>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            socket.emit("next", { roomId });
          }}
          className="w-full max-w-xs py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl shadow-lg transition"
        >
          ⏭️ Next Problem
        </motion.button>
      </div>

      <p className="text-center text-white/60 text-sm mt-4">
        Use this control to show  the next question in the quiz.
      </p>
    </motion.div>
  );
};
