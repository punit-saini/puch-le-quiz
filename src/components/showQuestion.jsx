import React from 'react'

const ShowQuestion = ({ questionData, questionNumber, handleOptionClick }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 rounded-2xl shadow-2xl border border-indigo-800">
      <h1 className="text-2xl font-bold text-yellow-200 mb-8">
        {questionNumber}. {questionData?.question}
      </h1>
      <div className="mb-8 space-y-4">
        {/* First row: option 1 & 2 */}
        <div className="flex gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex-1 text-left px-6 py-4 bg-indigo-900 text-white rounded-xl border-2 border-indigo-700 font-semibold text-lg cursor-pointer transition-all duration-200 hover:bg-purple-800 hover:border-yellow-300 hover:scale-105 shadow"
              onClick={() => handleOptionClick(i + 1)}
            >
              {i + 1}. {questionData.options[i]}
            </div>
          ))}
        </div>
        {/* Second row: option 3 & 4 */}
        <div className="flex gap-4">
          {[2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 text-left px-6 py-4 bg-indigo-900 text-white rounded-xl border-2 border-indigo-700 font-semibold text-lg cursor-pointer transition-all duration-200 hover:bg-purple-800 hover:border-yellow-300 hover:scale-105 shadow"
              onClick={() => handleOptionClick(i + 1)}
            >
              {i + 1}. {questionData.options[i]}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-700 text-yellow-200 font-bold shadow border-2 border-pink-400 hover:from-pink-700 hover:to-indigo-800 hover:text-yellow-300 transition-all duration-200 cursor-pointer"
          onClick={() => handleOptionClick(0)}
        >
          Skip
        </button>
      </div>
    </div>
  )
}

export default ShowQuestion