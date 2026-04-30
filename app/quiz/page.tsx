import QuizComponent from '@/components/QuizComponent'

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Election Knowledge Quiz
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Test your knowledge about elections, voting processes, and democratic principles.
      </p>
      <QuizComponent />
    </div>
  )
}
