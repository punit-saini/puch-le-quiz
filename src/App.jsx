import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import logo from './assets/logo.png'
import './App.css'
import './index.css'
// Importing the Welcome component
import Welcome from './welcome.jsx'
import InGameNavigation from './inGameNavigation.jsx'
import ShowQuestion from './showQuestion.jsx'
import questions from './questions.json'
import ResultsDisplay from './ResultsDisplay.jsx'

// Main App component

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [isStarted, setIsStarted] = useState()
  const [score, setScore] = useState(0)
  const questionsList = questions
  const totalQuestionsAsked = 10;
  const questionsAsked = [];
  const [questionsIndex, setQuestionsIndex] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [questionNumber, SetQuestionNumber] = useState(1);
  const [showResult, SetShowResult] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [resultData, setResultData] = useState()

  // Funtion to Set a Random Number 

  function getRandomNumber() {
    return Math.floor(Math.random() * 99);
  }

  function handleOptionClick(optionIndex){
    if(questionNumber >= 10){
      // Only run resultChecker if all answers are present
      setSelectedOption((options) => {
        const updated = [...options, optionIndex];
        resultChecker(updated); // Pass updated options
        console.log('Updated selected options:', updated);
        return updated;
      });
      SetShowResult(true);
      return;
    }
    setSelectedOption((options) => [...options, optionIndex]);
    SetQuestionNumber(prev => prev + 1);
  }

  function resultChecker(options = selectedOption) {
    let totalScore = 0;
    questionsIndex.forEach((index, i) => {
      const selected = options[i];
      console.log('question', i, ' Selected ', selected-1, ' Correct Answer Index ',questionsList[index].answer_index );
      if (selected === 0) {
        // skipped, no penalty
      } else if (selected - 1 === questionsList[index].answer_index) {
        totalScore += 4;
      } else {
        totalScore -= 1;
      }
      console.log('Current total score after question', i, 'is', totalScore);
    });
    setScore(totalScore);
    SetShowResult(true);
    setResultData([...questionsIndex])
  }


  function resetter(){
              setIsStarted(false);
              setScore(0);
              setSelectedOption([]);
              SetQuestionNumber(1);
              SetShowResult(false);
              setQuestionsIndex([]);
  }

  useEffect(() => {
    if (isStarted && questionsIndex.length === 0) {
      console.log('it entered is started true')
      const newIndexes = [];
      for(let i=0; i<totalQuestionsAsked; i++) {
      let random = getRandomNumber();
      if(newIndexes.includes(random)){
        i--;
      }
      newIndexes.push(random);
    }
      setQuestionsIndex(newIndexes);
    }
  }, [isStarted]);

  useEffect(() => {
  if (questionsIndex.length > 0) {
    console.log('inside question index/quetion Number useEffect');
    console.log('questionsIndex is ', questionsIndex);
    setCurrentQuestion(questionsList[questionsIndex[questionNumber-1]]);
  }
}, [questionsIndex, questionNumber]);

  

  return (
    <>
     <main className="min-h-screen text-white bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-950">
      <div className='flex flex-row justify-center pt-10 cursor-pointer' onClick={() => window.location.reload()}>
        <img src={logo} className="logo h-18 hue-rotate-180" alt="Vite logo" />
        <h1 className="text-5xl font-[Bree_Serif] p-1 pb-0">Puch Le</h1>
      </div>
      <div class="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 my-4"></div>
      {!isStarted ? (
        <Welcome name={name} setName={setName} setIsStarted={setIsStarted} />
      ) : (
        <>
          {/* Hide navigation and question when result is shown */}
          {!showResult && (
            <>
              <InGameNavigation
                score={score}
                name={name}
                resetter={resetter}
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
            <h2 className="text-3xl font-bold mb-6">Here are your Results!, {name}</h2>
            <span className='inline-block text-4xl font-extrabold text-yellow-300 bg-indigo-900 px-6 py-2 rounded-lg shadow border-2 border-yellow-400 tracking-wide my-6'>
              Score: {score}
            </span>

            {/* 🔽 Inject results display here */}
            <ResultsDisplay
              questionsIndex={questionsIndex}
              questionsList={questionsList}
              selectedOption={selectedOption}
            />

            <div className="mt-8">
              <button 
                className="px-5 py-2 text-base rounded-xl bg-gradient-to-r mb-5 from-purple-700 via-indigo-800 to-purple-900 text-yellow-200 font-bold shadow-lg border-2 border-indigo-700 hover:from-purple-800 hover:to-indigo-900 hover:text-yellow-300 transition-all duration-200 cursor-pointer"
                onClick={resetter}
              >
                <span role="img" aria-label="play again" className="mr-2">🔄</span>
                Play Again
              </button>
            </div>
          </div>
        )}

     </main>
      
    </>
  )
}

export default App
