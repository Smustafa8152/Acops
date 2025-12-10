import { useNavigate, useLocation } from 'react-router-dom'
import { questions } from '../data/questions'

function ResultsScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const answers = location.state?.answers || {}

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const score = calculateScore()
  const passed = score >= 70

  const handleRetake = () => {
    localStorage.removeItem('examAnswers')
    localStorage.removeItem('examTime')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Exam Results
        </h1>
        <div className={`rounded-lg p-6 mb-6 ${passed ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
          <div className="text-center">
            <div className={`text-5xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <div className={`text-xl font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed ? 'Passed' : 'Failed'}
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Total Questions:</span>
            <span className="text-gray-900 font-semibold">{questions.length}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Correct Answers:</span>
            <span className="text-green-600 font-semibold">
              {questions.filter((q) => answers[q.id] === q.correctAnswer).length}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Incorrect Answers:</span>
            <span className="text-red-600 font-semibold">
              {questions.filter((q) => answers[q.id] !== q.correctAnswer && answers[q.id] !== undefined).length}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Unanswered:</span>
            <span className="text-gray-600 font-semibold">
              {questions.filter((q) => answers[q.id] === undefined).length}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRetake}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retake Exam
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsScreen

