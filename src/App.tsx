/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Flower2, PartyPopper } from "lucide-react";

const NO_MESSAGES = [
  "No",
  "Are you sure?",
  "Really sure??",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely sure?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
];

const FloatingHeart: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
  }, []);

  return (
    <motion.div
      initial={{ y: "110vh", x: `${position.x}vw`, opacity: 0, scale: 0.5 }}
      animate={{
        y: "-10vh",
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.2, 1.2, 0.5],
        rotate: [0, 45, -45, 0],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="fixed pointer-events-none text-pink-400/30 z-0"
    >
      <Heart fill="currentColor" size={24 + Math.random() * 24} />
    </motion.div>
  );
};

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setHearts(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    
    // Calculate random position within viewport
    const padding = 100;
    const newX = Math.random() * (window.innerWidth - padding * 2) + padding;
    const newY = Math.random() * (window.innerHeight - padding * 2) + padding;
    
    setNoButtonPos({ x: newX, y: newY });
  };

  const yesButtonSize = Math.min(noCount * 20 + 16, 300);

  const getNoButtonText = () => {
    return NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  };

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {hearts.map((i) => (
          <FloatingHeart key={i} delay={i * 0.5} />
        ))}
        
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="z-10 text-center space-y-8 px-4"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZqZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/MDJ9IbxxvDUQM/giphy.gif"
                alt="Happy Cat"
                className="rounded-2xl shadow-2xl border-8 border-white w-48 h-48 md:w-64 md:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-yellow-400 p-3 rounded-full shadow-lg"
            >
              <PartyPopper className="text-white" size={32} />
            </motion.div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-bold text-pink-600 drop-shadow-sm font-sans tracking-tight">
              Yay!!! 💖
            </h1>
            <p className="text-lg md:text-2xl text-pink-500 font-medium max-w-md mx-auto">
              I knew you'd say yes! You've made me the happiest person ever!
            </p>
          </div>

          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              >
                <Flower2 className="text-pink-400" size={32} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      {hearts.map((i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center space-y-8 md:space-y-12 max-w-md w-full px-4"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZqZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/L8uYJpS7lH4U8/giphy.gif"
              alt="Cute Bear"
              className="rounded-2xl shadow-xl border-4 border-white w-40 h-40 md:w-48 md:h-48 object-cover mx-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={24} />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 leading-tight">
          Will you be my Valentine? 🌹
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontSize: `${yesButtonSize}px` }}
            onClick={() => setIsAccepted(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 z-20 w-auto min-w-[120px]"
          >
            Yes <Heart fill="currentColor" size={Math.max(20, yesButtonSize * 0.6)} />
          </motion.button>

          <motion.button
            key={noCount}
            initial={false}
            animate={noButtonPos ? { 
              position: "fixed",
              left: noButtonPos.x,
              top: noButtonPos.y,
              x: "-50%",
              y: "-50%"
            } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNoClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors z-20 text-base md:text-lg whitespace-nowrap"
          >
            {getNoButtonText()}
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative bottom element */}
      <div className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-end opacity-40 pointer-events-none">
        <Flower2 size={64} className="text-pink-300 -rotate-12" />
        <Flower2 size={48} className="text-pink-300 rotate-12" />
      </div>
    </div>
  );
}
