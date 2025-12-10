import { Routes, Route } from 'react-router-dom'
import StartScreen from './screens/StartScreen'
import ExamScreen from './screens/ExamScreen'
import ResultsScreen from './screens/ResultsScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/exam" element={<ExamScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
    </Routes>
  )
}

export default App
