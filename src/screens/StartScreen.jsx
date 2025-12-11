import { useNavigate } from 'react-router-dom';
import { subtests } from '../data/subtests';

function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Clear any previous session data
    localStorage.removeItem('acops-session');
    localStorage.removeItem('acops-responses');
    
    navigate('/exam');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-6 mb-4">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 font-cairo">
            ACOPS
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-cairo">
            نظام تقييم صعوبات التعلم
          </h2>
          <p className="text-xl text-gray-600 font-cairo">
            للأطفال من عمر ٤-٨ سنوات
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-cairo">📋 تعليمات الاختبار</h3>
          <ul className="space-y-3 text-right font-cairo text-lg">
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🎯</span>
              <span>يتكون الاختبار من <strong>{subtests.length} اختبارات فرعية</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">👀</span>
              <span>كل اختبار يقيس مهارة معرفية مختلفة (الذاكرة، التركيز، الإدراك)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⏱️</span>
              <span>سيتم عرض المحفزات لفترة قصيرة - انتبه جيداً!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🎓</span>
              <span>يبدأ كل اختبار بتدريب بسيط لفهم المطلوب</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💾</span>
              <span>يتم حفظ تقدمك تلقائياً - يمكنك المتابعة لاحقاً</span>
            </li>
          </ul>
        </div>

        {/* Subtests Preview */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 font-cairo">الاختبارات الفرعية:</h3>
          <div className="grid grid-cols-2 gap-3">
            {subtests.map((subtest, idx) => (
              <div key={subtest.id} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                <span className="text-2xl">{idx + 1}</span>
                <div className="text-right">
                  <p className="font-bold text-gray-800 font-cairo">{subtest.nameAr}</p>
                  <p className="text-sm text-gray-600 font-cairo">{subtest.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-xl font-cairo"
          >
            ابدأ الاختبار 🚀
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-6 font-cairo">
          تأكد من وجود بيئة هادئة ومريحة قبل البدء
        </p>
      </div>
    </div>
  );
}

export default StartScreen;
