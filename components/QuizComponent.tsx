'use client'

import { useState } from 'react'
import { quizQuestions } from '@/lib/constants'

export default function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-5xl font-bold text-primary-600 mb-4">
          {score} / {quizQuestions.length}
        </p>
        <p className="text-xl mb-8">
          You got {((score / quizQuestions.length) * 100).toFixed(0)}% correct!
        </p>
        <button
          onClick={resetQuiz}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-semibold">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6">{question.question}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition ${
              selectedAnswer === null
                ? 'border-gray-300 dark:border-gray-600 hover:border-primary-600'
                : selectedAnswer === index
                ? index === question.correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : index === question.correctAnswer
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
