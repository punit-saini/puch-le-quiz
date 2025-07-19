import React from 'react'

const ResultDisplay = ({ questionsIndex, questionsList, selectedOption }) => {
  return (
    <>
     <div className="mt-10 space-y-8 px-4 sm:px-8 max-w-4xl mx-auto">
      {questionsIndex.map((index, i) => {
        const question = questionsList[index];
        const correctIndex = question.answer_index;
        const userAnswer = selectedOption[i]; // 1-based or 0 if skipped

        return (
          <div
            key={i}
            className="p-6 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 rounded-2xl shadow-2xl border border-indigo-800"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-200 mb-4">
              {i + 1}. {question.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, optionIdx) => {
                const isCorrect = optionIdx === correctIndex;
                const isUserWrong =
                  userAnswer !== 0 && userAnswer - 1 === optionIdx && !isCorrect;

                const baseStyle =
                  "px-4 py-3 rounded-xl text-lg font-semibold shadow border transition-all duration-200";

                const bgColor = isCorrect
                  ? "bg-green-800 border-green-500 text-green-100"
                  : isUserWrong
                  ? "bg-red-800 border-red-500 text-red-100"
                  : "bg-indigo-900 border-indigo-700 text-white";

                return (
                  <div
                    key={optionIdx}
                    className={`${baseStyle} ${bgColor}`}
                  >
                    {optionIdx + 1}. {option}
                  </div>
                );
              })}
            </div>

            {userAnswer === 0 && (
              <p className="mt-4 text-red-300 italic text-sm">
                You skipped this question.
              </p>
            )}
          </div>
        );
      })}
    </div>
    </>
  )
}

export default ResultDisplay