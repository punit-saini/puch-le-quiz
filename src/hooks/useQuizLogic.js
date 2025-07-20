import { useState, useEffect } from 'react';
import questions from '../questions.json';
import { getRandomIndexes } from '../utils/getRandomIndexes';

export default function useQuizLogic(totalQuestions = 10) {
  const questionsList = questions;

  const [name, setName] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsIndex, setQuestionsIndex] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [resultData, setResultData] = useState(null);

  // Handle option click
  const handleOptionClick = (optionIndex) => {
    if (questionNumber >= totalQuestions) {
      setSelectedOption((prev) => {
        const updated = [...prev, optionIndex];
        resultChecker(updated);
        setShowResult(true);
        return updated;
      });
      return;
    }
    setSelectedOption((prev) => [...prev, optionIndex]);
    setQuestionNumber((prev) => prev + 1);
  };

  // Scoring logic
  const resultChecker = (options = selectedOption) => {
    let totalScore = 0;
    questionsIndex.forEach((index, i) => {
      const selected = options[i];
      const correct = questionsList[index].answer_index;
      if (selected === 0) return;
      totalScore += selected - 1 === correct ? 4 : -1;
    });
    setScore(totalScore);
    setResultData([...questionsIndex]);
  };

  // Reset everything
  const resetGame = () => {
    setIsStarted(false);
    setScore(0);
    setSelectedOption([]);
    setQuestionNumber(1);
    setShowResult(false);
    setQuestionsIndex([]);
    setResultData(null);
  };

  // Generate unique question indexes
  useEffect(() => {
    if (isStarted && questionsIndex.length === 0) {
      const indexes = getRandomIndexes(totalQuestions, questionsList.length);
      setQuestionsIndex(indexes);
    }
  }, [isStarted]);

  // Load current question
  useEffect(() => {
    if (questionsIndex.length > 0 && questionNumber <= totalQuestions) {
      const index = questionsIndex[questionNumber - 1];
      setCurrentQuestion(questionsList[index]);
    }
  }, [questionsIndex, questionNumber]);

  return {
    name,
    setName,
    isStarted,
    setIsStarted,
    score,
    currentQuestion,
    questionNumber,
    showResult,
    isTimeOver,
    setIsTimeOver,
    selectedOption,
    resultData,
    questionsIndex,
    handleOptionClick,
    resetGame,
    questionsList,
  };
}
