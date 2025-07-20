import React, { useState, useEffect } from 'react'

const InGameNavigation = ({
  score,
  name,
  resetter,
  setIsTimeOver,
  initialTime = 25,
  handleOptionClick,
  questionNumber
}) => {
  const [localTime, setLocalTime] = useState(initialTime);

  useEffect(() => {
    setLocalTime(initialTime);
    let skipped = false;
    const timer = setInterval(() => {
      setLocalTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!skipped) {
            skipped = true;
            handleOptionClick(0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [initialTime, questionNumber]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-6">
      <div
        className={`
          flex flex-wrap items-center justify-between gap-3 sm:gap-6 px-4 py-4 
          shadow-lg border border-indigo-700
          ${window.innerWidth >= 1024 ? 'rounded-none bg-transparent' : 'rounded-xl bg-gradient-to-br from-indigo-950 to-purple-900'}
        `}
      >
        {/* Welcome Text */}
        <span className="text-sm sm:text-base md:text-lg font-bold text-indigo-200 bg-indigo-900 px-3 py-2 rounded-lg shadow border border-indigo-700">
          👋 Welcome, <span className="text-pink-300 font-extrabold italic">{name}!</span>
        </span>

        {/* Timer */}
        <span className="text-sm sm:text-base md:text-lg font-semibold text-white bg-indigo-900 px-3 py-2 rounded-lg shadow border border-indigo-700">
          Time left: <span className="font-bold text-pink-200">{localTime}s</span>
        </span>

        {/* Reset Button */}
        <button
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-amber-400 text-white font-bold shadow border-2 border-pink-400 hover:from-pink-700 hover:to-amber-500 transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
          onClick={resetter}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default InGameNavigation;
