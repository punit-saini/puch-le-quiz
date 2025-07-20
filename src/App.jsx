import logo from './assets/logo.png';
import './App.css';
import './index.css';

import Welcome from './components/welcome.jsx';
import InGameNavigation from './components/inGameNavigation.jsx';
import ShowQuestion from './components/showQuestion.jsx';
import ResultsDisplay from './components/ResultsDisplay.jsx';

import useQuizLogic from './hooks/useQuizLogic';

function App() {
  const {
    name,
    setName,
    isStarted,
    setIsStarted,
    score,
    currentQuestion,
    questionNumber,
    showResult,
    setIsTimeOver,
    selectedOption,
    resultData,
    questionsIndex,
    handleOptionClick,
    resetGame,
    questionsList
  } = useQuizLogic(10); // 10 questions

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-950">
      <div
        className="flex flex-row justify-center pt-10 cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <img src={logo} className="logo h-18 hue-rotate-180" alt="App logo" />
        <h1 className="text-5xl font-[Bree_Serif] p-1 pb-0">Puch Le</h1>
      </div>

      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 my-4"></div>

      {!isStarted ? (
        <Welcome name={name} setName={setName} setIsStarted={setIsStarted} />
      ) : (
        <>
          {!showResult && (
            <>
              <InGameNavigation
                score={score}
                name={name}
                resetter={resetGame}
                setIsTimeOver={setIsTimeOver}
                initialTime={25}
                handleOptionClick={handleOptionClick}
                questionNumber={questionNumber}
              />
              {currentQuestion && (
                <ShowQuestion
                  questionData={currentQuestion}
                  questionNumber={questionNumber}
                  handleOptionClick={handleOptionClick}
                />
              )}
            </>
          )}
        </>
      )}

      {showResult && (
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold mb-6">Here are your Results, {name}!</h2>

          <span className="inline-block text-4xl font-extrabold text-yellow-300 bg-indigo-900 px-6 py-2 rounded-lg shadow border-2 border-yellow-400 tracking-wide my-6">
            Score: {score}
          </span>

          <ResultsDisplay
            questionsIndex={questionsIndex}
            questionsList={questionsList}
            selectedOption={selectedOption}
          />

          <div className="mt-8">
            <button
              className="px-5 py-2 text-base rounded-xl bg-gradient-to-r mb-5 from-purple-700 via-indigo-800 to-purple-900 text-yellow-200 font-bold shadow-lg border-2 border-indigo-700 hover:from-purple-800 hover:to-indigo-900 hover:text-yellow-300 transition-all duration-200 cursor-pointer"
              onClick={resetGame}
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
