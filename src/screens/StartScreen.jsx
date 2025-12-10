import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'

function StartScreen() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/exam')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          ACOPS Exam Module
        </h1>
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-900 mb-2">Exam Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>This exam consists of {questions.length} multiple-choice questions</li>
              <li>You have 60 minutes to complete the exam</li>
              <li>Each question has 4 options - select the best answer</li>
              <li>You can navigate between questions using Previous/Next buttons</li>
              <li>You can review and change your answers before submission</li>
              <li>Once submitted, you cannot change your answers</li>
              <li>Passing score: 70%</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartScreen

