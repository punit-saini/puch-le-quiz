import React from 'react'

const Welcome = ({ name, setName, setIsStarted }) => {
  return (
    <div className="font-[Noto_Sans] text-center px-4 sm:px-6 md:px-12 py-3">
      <p className="text-xl sm:text-2xl md:text-xl mt-3 sm:mt-5 text-indigo-100">
        Get ready to test your knowledge with fun questions.
      </p>

      <div className="mt-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-indigo-200 font-semibold flex flex-wrap justify-center items-center gap-3">
          My name is
          <input
            type="text"
            className="w-56 sm:w-64 md:w-72 lg:w-80 text-xl sm:text-2xl border-2 border-indigo-500 rounded-lg px-4 py-2 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white italic font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </h1>

        <div className="rules mt-10 mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-gradient-to-r from-indigo-900 via-purple-900 to-purple-800 rounded-xl shadow-lg p-6 border border-indigo-700">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-200 mb-4">Quiz Rules</h2>
          <ul className="text-left text-sm sm:text-base md:text-lg text-indigo-100 space-y-2 list-disc list-inside">
            <li>There are 10 questions in total.</li>
            <li>
              Each correct answer gives <span className="text-green-400 font-bold">4 points</span>.
            </li>
            <li>
              Each wrong answer deducts <span className="text-red-400 font-bold">1 point</span>.
            </li>
            <li>There is no negative marking for unattempted questions.</li>
          </ul>
        </div>

        <button
          className={`mt-10 px-6 py-3 rounded-lg shadow-lg font-semibold transition-colors duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
            ${name ? "cursor-pointer hover:from-purple-700 hover:to-indigo-700" : "opacity-70 cursor-not-allowed"}`}
          onClick={() => {
            if (name) setIsStarted(true)
          }}
          disabled={!name}
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}

export default Welcome
