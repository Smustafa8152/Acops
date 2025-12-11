import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subtests } from '../data/subtests';
import { toArabicNumerals } from '../data/subtests';

function ResultsScreen() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('acops-responses');
    if (saved) {
      setResponses(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl font-cairo text-gray-700">جاري تحميل النتائج...</p>
        </div>
      </div>
    );
  }

  if (!responses) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-cairo">
            لا توجد نتائج
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-cairo">
            لم يتم العثور على بيانات الاختبار
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all font-cairo"
          >
            العودة للبداية
          </button>
        </div>
      </div>
    );
  }

  // Calculate scores
  const results = subtests.map(subtest => {
    const subtestData = responses[subtest.id];
    if (!subtestData) {
      return {
        ...subtest,
        completed: false,
        score: 0,
        total: subtest.totalItems,
        percentage: 0
      };
    }

    const score = subtestData.correctCount || 0;
    const total = subtestData.totalItems || subtest.totalItems;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    return {
      ...subtest,
      completed: true,
      score,
      total,
      percentage
    };
  });

  const completedTests = results.filter(r => r.completed).length;
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalPossible = results.reduce((sum, r) => sum + r.total, 0);
  const overallPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-purple-600 mb-2 font-cairo">
              تم إكمال الاختبار!
            </h1>
            <p className="text-xl text-gray-600 font-cairo">
              نتائج تقييم ACOPS
            </p>
          </div>

          {/* Overall Score */}
          <div className={`rounded-2xl border-4 p-6 ${getScoreBg(overallPercentage)}`}>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-2 font-cairo">النتيجة الإجمالية</p>
              <p className={`text-6xl font-bold ${getScoreColor(overallPercentage)} font-cairo`}>
                {toArabicNumerals(overallPercentage)}%
              </p>
              <p className="text-xl text-gray-600 mt-2 font-cairo">
                {toArabicNumerals(totalScore)} من {toArabicNumerals(totalPossible)} نقطة
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 font-cairo">
            النتائج التفصيلية
          </h2>
          
          <div className="space-y-4">
            {results.map((result, idx) => (
              <div 
                key={result.id}
                className={`rounded-2xl border-2 p-6 transition-all ${
                  result.completed 
                    ? getScoreBg(result.percentage)
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-3 justify-end mb-2">
                      <h3 className="text-xl font-bold text-gray-800 font-cairo">
                        {result.nameAr}
                      </h3>
                      <span className="text-2xl">{idx + 1}</span>
                    </div>
                    <p className="text-gray-600 font-cairo">{result.description}</p>
                  </div>
                  
                  {result.completed ? (
                    <div className="text-center mr-6">
                      <p className={`text-4xl font-bold ${getScoreColor(result.percentage)} font-cairo`}>
                        {toArabicNumerals(result.percentage)}%
                      </p>
                      <p className="text-sm text-gray-600 font-cairo">
                        {toArabicNumerals(result.score)}/{toArabicNumerals(result.total)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center mr-6">
                      <p className="text-2xl text-gray-400">—</p>
                      <p className="text-sm text-gray-500 font-cairo">لم يكتمل</p>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {result.completed && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          result.percentage >= 80 ? 'bg-green-500' :
                          result.percentage >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (window.confirm('هل تريد حقاً بدء اختبار جديد؟ سيتم حذف النتائج الحالية.')) {
                  localStorage.removeItem('acops-responses');
                  localStorage.removeItem('acops-session');
                  navigate('/');
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all font-cairo"
            >
              اختبار جديد 🔄
            </button>
            
            <button
              onClick={() => {
                window.print();
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl font-bold rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all font-cairo"
            >
              طباعة النتائج 🖨️
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-gray-600 font-cairo">
            للحصول على تقرير مفصل، يرجى استشارة أخصائي نفسي مؤهل
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultsScreen;
