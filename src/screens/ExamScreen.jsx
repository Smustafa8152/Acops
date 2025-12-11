import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subtests, getSubtestOrder } from '../data/subtests';
import ZoidsFriends from '../components/ZoidsFriends';

function ExamScreen() {
  const navigate = useNavigate();
  const [currentSubtestIndex, setCurrentSubtestIndex] = useState(0);
  const [allResponses, setAllResponses] = useState({});
  const [sessionStartTime] = useState(Date.now());
  
  const subtestOrder = getSubtestOrder();
  const currentSubtestId = subtestOrder[currentSubtestIndex];
  const currentSubtest = subtests.find(st => st.id === currentSubtestId);

  // Load saved session if exists
  useEffect(() => {
    const saved = localStorage.getItem('acops-session');
    if (saved) {
      const session = JSON.parse(saved);
      setCurrentSubtestIndex(session.currentSubtestIndex || 0);
      setAllResponses(session.responses || {});
    }
  }, []);

  // Save session on every update
  useEffect(() => {
    const session = {
      currentSubtestIndex,
      responses: allResponses,
      startTime: sessionStartTime,
      lastUpdate: Date.now()
    };
    localStorage.setItem('acops-session', JSON.stringify(session));
  }, [currentSubtestIndex, allResponses, sessionStartTime]);

  // Handle subtest completion
  const handleSubtestComplete = (subtestData) => {
    const newResponses = {
      ...allResponses,
      [subtestData.subtestId]: subtestData
    };
    setAllResponses(newResponses);

    // Move to next subtest or finish
    if (currentSubtestIndex < subtestOrder.length - 1) {
      setCurrentSubtestIndex(currentSubtestIndex + 1);
    } else {
      // All subtests completed
      localStorage.setItem('acops-responses', JSON.stringify(newResponses));
      localStorage.removeItem('acops-session');
      navigate('/results');
    }
  };

  // Render current subtest
  const renderSubtest = () => {
    switch (currentSubtestId) {
      case 'zoids-friends':
        return <ZoidsFriends onComplete={handleSubtestComplete} />;
      
      // TODO: Add other subtests
      case 'toy-box':
      case 'rabbits':
      case 'zoids-letters':
      case 'zoids-letter-names':
      case 'races':
      case 'rhymes':
      case 'wock':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">
              <h2 className="text-4xl font-bold text-purple-600 mb-4 font-cairo">
                {currentSubtest.nameAr}
              </h2>
              <p className="text-xl text-gray-600 mb-8 font-cairo">
                {currentSubtest.description}
              </p>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-6">
                <p className="text-lg font-cairo">
                  🚧 هذا الاختبار قيد التطوير
                </p>
              </div>
              <button
                onClick={() => handleSubtestComplete({
                  subtestId: currentSubtestId,
                  responses: {},
                  totalItems: currentSubtest.totalItems,
                  correctCount: 0
                })}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all font-cairo"
              >
                تخطي إلى الاختبار التالي →
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Unknown subtest</div>;
    }
  };

  return (
    <div>
      {/* Progress indicator at top */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-cairo">
              الاختبار {currentSubtestIndex + 1} من {subtestOrder.length}
            </span>
            <span className="text-sm font-bold text-purple-600 font-cairo">
              {currentSubtest?.nameAr}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentSubtestIndex + 1) / subtestOrder.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-20">
        {renderSubtest()}
      </div>
    </div>
  );
}

export default ExamScreen;

