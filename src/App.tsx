/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Flower2, PartyPopper, Moon, Sun, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

const NO_MESSAGES = [
  "No",
  "Are you sure?",
  "Really sure??",
  "please use your brain",
  "yo last chance",
  "ru really sure",
  "You might regret this!",
  "give me a TRY please",
  "pleasee",
  "pleasee bayy",
  "pleaseeeeeeeeeeee",
  "fucker accept la",
  "WHY",
  "please baby",
  "Fuck you punde",
  "fuck you la chibai punde useless nigga",
];

const FloatingHeart: React.FC<{ delay?: number; isDark?: boolean }> = ({ delay = 0, isDark }) => {
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
      className={`fixed pointer-events-none z-0 ${isDark ? 'text-pink-900/40' : 'text-pink-400/30'}`}
    >
      <Heart fill="currentColor" size={24 + Math.random() * 24} />
    </motion.div>
  );
};

const BackgroundSparkle = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setPos({ x: Math.random() * 100, y: Math.random() * 100 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1.5, 0],
        rotate: [0, 180] 
      }}
      transition={{ 
        duration: 2 + Math.random() * 3, 
        repeat: Infinity, 
        delay: Math.random() * 5 
      }}
      className="fixed pointer-events-none text-yellow-300/40 z-0"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <Sparkles size={16} />
    </motion.div>
  );
};

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isJumpscareActive, setIsJumpscareActive] = useState(false);
  const [hasBeenJumpscared, setHasBeenJumpscared] = useState(false);

  useEffect(() => {
    setHearts(Array.from({ length: 25 }, (_, i) => i));
  }, []);

  const triggerConfetti = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  const handleNoClick = () => {
    if (noCount >= NO_MESSAGES.length - 1) {
      setIsJumpscareActive(true);
      // Automatically go fullscreen if possible (browsers usually block this without user gesture, but we are in a click handler)
      try {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      } catch (e) {
        console.log("Fullscreen blocked");
      }

      setTimeout(() => {
        setIsJumpscareActive(false);
        setHasBeenJumpscared(true);
      }, 3000);
      return;
    }

    setNoCount((prev) => prev + 1);
    const padding = 100;
    const newX = Math.random() * (window.innerWidth - padding * 2) + padding;
    const newY = Math.random() * (window.innerHeight - padding * 2) + padding;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    triggerConfetti();
  };

  const yesButtonSize = Math.min(noCount * 20 + 16, 300);

  const getNoButtonText = () => {
    return NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  };

  const containerClass = `min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative transition-colors duration-700 ${
    isDark ? "bg-slate-950 text-pink-200" : "bg-pink-50 text-pink-600"
  }`;

  return (
    <div className={containerClass}>
      {/* Epilepsy Warning */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-bold animate-pulse shadow-lg">
        <AlertTriangle size={14} />
        WARNING: EPILEPSY / FLASHING LIGHTS
      </div>

      {/* Dark Mode Toggle - Top Right */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-colors ${
          isDark ? 'bg-yellow-400 text-slate-900' : 'bg-slate-900 text-yellow-400'
        }`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      {/* Jumpscare Overlay */}
      <AnimatePresence>
        {isJumpscareActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Flashing Lights */}
            <motion.div 
              animate={{ backgroundColor: ["#ff0000", "#ffffff", "#000000"] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute inset-0 opacity-30"
            />
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.5, 1.2, 2] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              src="/src/assests/jumpscare.jpg"
              alt="JUMPSCARE"
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                // Fallback if image doesn't exist yet
                (e.target as HTMLImageElement).src = "/src/assests/jumpscare.jpg";
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {hearts.map((i) => (
        <FloatingHeart key={i} delay={i * 0.4} isDark={isDark} />
      ))}
      {[...Array(15)].map((_, i) => (
        <BackgroundSparkle key={i} />
      ))}

      <AnimatePresence mode="wait">
        {isAccepted ? (
          <motion.div
            key="accepted"
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
                  className={`rounded-2xl shadow-2xl border-8 w-48 h-48 md:w-64 md:h-64 object-cover ${isDark ? 'border-pink-900' : 'border-white'}`}
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
              <h1 className={`text-4xl md:text-7xl font-bold drop-shadow-sm tracking-tight ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                Yay!!! 💖
              </h1>
              <p className={`text-lg md:text-2xl font-medium max-w-md mx-auto ${isDark ? 'text-pink-300' : 'text-pink-500'}`}>
                awww whos a good girl, lemme eat you buddy
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
                  <Flower2 className={isDark ? "text-pink-700" : "text-pink-400"} size={32} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="proposal"
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
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2F6emYzYjJ2end4YWJmazhiMzRxcHY5NXc4OTQ0ZGlrYmdtY3c2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TxqdI1WbB554I/giphy.gif"
                  alt="Cute Bear"
                  className={`rounded-2xl shadow-xl border-4 w-40 h-40 md:w-48 md:h-48 object-cover mx-auto ${isDark ? 'border-pink-900' : 'border-white'}`}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={24} />
            </div>

            <h1 className={`text-3xl md:text-5xl font-bold leading-tight ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
              Will you be my Valentine? 🌹
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: `${yesButtonSize}px` }}
                onClick={handleYesClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 z-20 w-auto min-w-[120px]"
              >
                Yes <Heart fill="currentColor" size={Math.max(20, yesButtonSize * 0.6)} />
              </motion.button>

              {!hasBeenJumpscared && (
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GitHub Link */}
      <a 
        href="https://github.com/nimalanrao" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed bottom-4 right-4 z-30 transition-all flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${
          isDark ? 'bg-slate-900/50 text-pink-400 hover:text-pink-300' : 'bg-white/50 text-pink-400 hover:text-pink-600'
        }`}
      >
        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        @nimalanrao
      </a>
    </div>
  );
}
