import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Practice = () => {
  const questions = useSelector((state) => state.data.questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCheckAnswer = () => {
    if (userAnswer.trim() === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer('');
  };

  return (
    <div className='flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]'>
      <h1 className='text-white text-5xl font-extrabold mb-10 shadow-lg'>🧠 Practice Zone</h1>

      {questions[currentQuestion] ? (
        <div className={`p-8 rounded-2xl w-[600px] shadow-2xl ${getCategoryStyle(questions[currentQuestion].category)} transition-all`}> 
          <h2 className='text-3xl font-semibold mb-4 text-center text-white'>{questions[currentQuestion].question}</h2>

          <div className='flex justify-center mb-4'>
            <span className='text-white text-sm font-bold bg-black px-4 py-2 rounded-full'>
              {questions[currentQuestion].category}
            </span>
          </div>

          <input
            type='text'
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className='bg-gray-200 px-4 py-3 rounded-lg w-full border-2 border-gray-400 focus:border-[#F59E0B] shadow-md'
            placeholder='Your answer...'
          />

          <button
            className='px-4 py-3 mt-4 bg-[#F59E0B] text-white rounded-lg text-lg w-full font-bold hover:bg-[#D97706] transition-all shadow-lg'
            onClick={handleCheckAnswer}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <p className='text-white text-3xl mt-8 font-bold'>🎯 All questions completed! Your score: <span className='text-yellow-300'>{score}</span></p>
      )}
    </div>
  );
};

export default Practice;
