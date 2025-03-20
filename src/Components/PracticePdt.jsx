import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateQuestionsFromAI } from './generateQuestions';

const PracticePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const dispatch = useDispatch();
  const questionsData = useSelector((store) => store.data.questions);
  const extracted = useSelector((store) => store.data.extracted);

  useEffect(() => {
    const fetchQuestions = async () => {
      await generateQuestionsFromAI(extracted, dispatch);
    };
    fetchQuestions();
  }, [dispatch, extracted]);

  if (!questionsData || questionsData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700 text-2xl">
        Loading questions...
      </div>
    );
  }

  const currentQuestion = questionsData[currentIndex];

  const handleNext = () => {
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalScore = calculateScore();
      setScore(finalScore);
      setQuizCompleted(true);
    }
  };

  const handleAnswerChange = (value) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: value });
  };

  const calculateScore = () => {
    return questionsData.reduce((totalScore, question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = question.answer;

      if (Array.isArray(correctAnswer)) {
        return (
          totalScore +
          (userAnswer &&
            [...correctAnswer].sort().join(',') === [...userAnswer].sort().join(',')
            ? 1
            : 0)
        );
      }

      return totalScore + (userAnswer === correctAnswer ? 1 : 0);
    }, 0);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'MCQ':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-600">{question.question}</h2>
            <ul className="space-y-2">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className="bg-gray-50 border border-green-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-green-100 transition"
                >
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`mcq-${currentIndex}`}
                      value={option}
                      className="accent-green-500"
                      onChange={(e) => handleAnswerChange(e.target.value)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'Fill in the Blanks':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-600">{question.question}</h2>
            <input
              type="text"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your answer here"
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          </div>
        );

      case 'Multiple Answer':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-600">{question.question}</h2>
            <ul className="space-y-2">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className="bg-gray-50 border border-green-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-green-100 transition"
                >
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      value={option}
                      className="accent-green-500"
                      onChange={(e) => {
                        const selectedOptions = userAnswers[currentIndex] || [];
                        const updatedOptions = e.target.checked
                          ? [...selectedOptions, option]
                          : selectedOptions.filter((item) => item !== option);
                        handleAnswerChange(updatedOptions);
                      }}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
        case "Q&A":
          return (
            <div>
              <h2 className='text-xl font-bold mb-4 text-green-600'>
                {question.question} <span className="text-sm text-gray-500">({question.difficulty})</span>
              </h2>
              <textarea
                className='w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400'
                placeholder='Type your answer here...'
                rows='4'
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            </div>
          );
      default:
        return <p className="text-red-500">Unknown question type.</p>;
    }
  };  

  const renderDetailedFeedback = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-green-500">🎯 Quiz Completed!</h2>
      <p className="text-xl mt-4">
        Your Score: <strong>{score} / {questionsData.length}</strong>
      </p>


      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 relative">

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{
              width: `${((currentIndex + 1) / questionsData.length) * 100}%`,
            }}
          ></div>
        </div>

        {!quizCompleted ? (
          <>
            {renderQuestion(currentQuestion)}

            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-600 transition w-full"
            >
              {currentIndex === questionsData.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </>
        ) : (
          renderDetailedFeedback()
        )}
      </div>
    </div>
  );
};

export default PracticePage;