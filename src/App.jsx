import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import StartScreen from './screens/StartScreen'
import ExamScreen from './screens/ExamScreen'
import ResultsScreen from './screens/ResultsScreen'

// Component to handle GitHub Pages query string routing
function GitHubPagesRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if we have a query string from GitHub Pages 404 redirect
    if (location.search) {
      const searchParams = new URLSearchParams(location.search)
      const redirectPath = searchParams.get('/')
      
      if (redirectPath) {
        // Decode the path (replace ~and~ with &)
        const decodedPath = redirectPath.replace(/~and~/g, '&')
        // Remove leading slash if present
        const cleanPath = decodedPath.startsWith('/') ? decodedPath : '/' + decodedPath
        // Navigate to the correct path
        navigate(cleanPath, { replace: true })
      }
    }
  }, [location.search, navigate])

  return null
}

function App() {
  return (
    <>
      <GitHubPagesRedirect />
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/exam" element={<ExamScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
      </Routes>
    </>
  )
}

export default App
