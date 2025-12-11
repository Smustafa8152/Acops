import { useState, useEffect } from 'react';
import { zoidsFriendsItems } from '../data/zoidsFriendsItems';
import { toArabicNumerals } from '../data/subtests';

const ZoidsFriends = ({ onComplete }) => {
  const [phase, setPhase] = useState('instructions'); // instructions, training, test
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showStimulus, setShowStimulus] = useState(false);
  const [responses, setResponses] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const isTraining = phase === 'training';
  const items = isTraining ? zoidsFriendsItems.training : zoidsFriendsItems.test;
  const currentItem = items[currentItemIndex];
  
  const colorMap = {
    red: { bg: 'bg-red-500', name: 'أحمر', image: '/zoids-friends/zoid-red.png' },
    blue: { bg: 'bg-blue-500', name: 'أزرق', image: '/zoids-friends/zoid-blue.png' },
    yellow: { bg: 'bg-yellow-400', name: 'أصفر', image: '/zoids-friends/zoid-yellow.png' },
    green: { bg: 'bg-green-500', name: 'أخضر', image: '/zoids-friends/zoid-green.png' },
    orange: { bg: 'bg-orange-500', name: 'برتقالي', image: '/zoids-friends/zoid-orange.png' },
    purple: { bg: 'bg-purple-500', name: 'بنفسجي', image: '/zoids-friends/zoid-purple.png' }
  };

  // Start stimulus presentation
  const startStimulus = () => {
    setShowStimulus(true);
    setSelectedAnswer(null);
    
    // Hide stimulus after 5 seconds
    setTimeout(() => {
      setShowStimulus(false);
    }, 5000);
  };

  // Handle answer selection
  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  // Handle next button
  const handleNext = () => {
    // Save response
    if (!isTraining && selectedAnswer !== null) {
      const isCorrect = JSON.stringify(currentItem.options[selectedAnswer]) === 
                       JSON.stringify(currentItem.correctAnswer);
      setResponses({
        ...responses,
        [currentItem.id]: {
          selected: selectedAnswer,
          correct: isCorrect,
          timestamp: Date.now()
        }
      });
    }

    // Move to next item or complete
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      startStimulus();
    } else {
      if (isTraining) {
        // Move to test phase
        setPhase('test');
        setCurrentItemIndex(0);
        setTimeout(() => startStimulus(), 1000);
      } else {
        // Complete subtest
        onComplete({
          subtestId: 'zoids-friends',
          responses,
          totalItems: zoidsFriendsItems.test.length,
          correctCount: Object.values(responses).filter(r => r.correct).length
        });
      }
    }
  };

  // Instructions screen
  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-purple-600 mb-2 font-cairo">
              أصدقاء الزويدز
            </h1>
            <p className="text-xl text-gray-600 font-cairo">اختبار الذاكرة البصرية للألوان</p>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-cairo">التعليمات:</h2>
            <ul className="space-y-3 text-right font-cairo text-lg">
              <li className="flex items-start gap-3">
                <span className="text-2xl">👀</span>
                <span>سوف ترى مجموعة من أصدقاء الزويدز الملونين</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⏱️</span>
                <span>انظر إليهم بعناية لمدة ٥ ثوانٍ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🤔</span>
                <span>تذكر ترتيب الألوان</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>اختر الترتيب الصحيح من الخيارات</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setPhase('training');
                setTimeout(() => startStimulus(), 500);
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg font-cairo"
            >
              ابدأ التدريب 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stimulus or response phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex justify-between items-center">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-purple-600 font-cairo">أصدقاء الزويدز</h2>
              <p className="text-gray-600 font-cairo">
                {isTraining ? 'تدريب' : 'اختبار'} - السؤال {toArabicNumerals(currentItemIndex + 1)} من {toArabicNumerals(items.length)}
              </p>
            </div>
            <div className="w-full max-w-xs">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentItemIndex + 1) / items.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {showStimulus ? (
            // Stimulus Phase
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 font-cairo">
                انظر بعناية وتذكر الترتيب! 👀
              </h3>
              <div className="flex justify-center items-center gap-4 mb-8">
                {currentItem.stimulus.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <img 
                      src={colorMap[color].image}
                      alt={colorMap[color].name}
                      className="w-32 h-32 object-contain animate-bounce"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    />
                    <div className={`mt-2 w-24 h-24 ${colorMap[color].bg} rounded-full shadow-lg`} />
                  </div>
                ))}
              </div>
              <div className="text-6xl font-bold text-purple-600 animate-pulse">
                ⏱️
              </div>
            </div>
          ) : (
            // Response Phase
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center font-cairo">
                اختر الترتيب الصحيح:
              </h3>
              <div className="space-y-4">
                {currentItem.options.map((option, optionIdx) => (
                  <button
                    key={optionIdx}
                    onClick={() => handleAnswerSelect(optionIdx)}
                    className={`w-full p-6 rounded-2xl border-4 transition-all transform hover:scale-102 ${
                      selectedAnswer === optionIdx
                        ? 'border-purple-500 bg-purple-50 shadow-xl'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-center items-center gap-3">
                      {option.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <img 
                            src={colorMap[color].image}
                            alt={colorMap[color].name}
                            className="w-20 h-20 object-contain"
                          />
                          <div className={`mt-1 w-16 h-16 ${colorMap[color].bg} rounded-full shadow-md`} />
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={`px-12 py-4 text-xl font-bold rounded-2xl transition-all transform font-cairo ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-105 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentItemIndex === items.length - 1 && !isTraining ? 'إنهاء' : 'التالي'} →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoidsFriends;
