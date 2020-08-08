import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { QuestionSate, fetchQuizQuestions, Difficulty } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionSate[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOVer] = useState(true);

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameOVer(false);
    try {
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>React Quizz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score"> Score: </p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
