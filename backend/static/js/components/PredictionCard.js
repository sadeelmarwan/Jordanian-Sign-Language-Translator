/**
 * Jordanian Sign Language Translator - Prediction Status Card
 * ============================================================
 */

window.JSL_APP.components.PredictionCard = function({ prediction, handVisible, isPredicting }) {
  // Dictionary mapping Arabic JSL signs to English equivalents for accessibility
  const englishTranslations = {
    "مرحبا": "Hello",
    "شكرا": "Thank you",
    "نعم": "Yes",
    "لا": "No",
    "أريد": "I want",
    "مساعدة": "Help",
    "كيف حالك": "How are you?",
    "ماء": "Water",
    "آسف": "Sorry"
  };

  const getEnglish = (arabicLabel) => {
    return englishTranslations[arabicLabel] || "Detecting...";
  };

  // Helper to color code the confidence bar
  const getConfidenceColorClass = (score) => {
    if (score >= 0.8) return 'bg-emerald-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const hasPrediction = prediction && prediction.label;
  const label = hasPrediction ? prediction.label : 'بانتظار حركة اليد...';
  const confidence = hasPrediction ? prediction.confidence : 0;
  const percentage = Math.round(confidence * 100);

  return (
    <div className="glass-card rounded-3xl p-6 shadow-lg border border-white flex flex-col h-full justify-between">
      
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          <i className="fa-solid fa-brain text-sm"></i>
        </div>
        <h3 className="text-lg font-bold text-textDark">مؤشر الترجمة الفورية</h3>
      </div>

      {/* Main Prediction Output Box */}
      <div className="flex-grow flex flex-col items-center justify-center py-6">
        
        {/* Arabic Sign Label Display */}
        <div className="text-center">
          <div className={`min-h-[70px] flex items-center justify-center px-4 transition-all duration-300 ${
            handVisible ? 'scale-110' : 'opacity-50'
          }`}>
            <span className={`text-4xl sm:text-5xl font-black text-slate-800 ${
              handVisible && hasPrediction ? 'text-accent' : 'text-slate-500'
            }`}>
              {handVisible && hasPrediction ? label : 'جاري الرصد...'}
            </span>
          </div>

          {/* English Translation Translation */}
          {handVisible && hasPrediction && (
            <p className="text-slate-400 font-poppins font-medium text-sm mt-2 tracking-wide uppercase">
              {getEnglish(label)}
            </p>
          )}
        </div>

        {/* Hand Landmark Detection Graphic Pulse */}
        <div className="mt-8 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {handVisible ? (
              <>
                <div className="absolute w-12 h-12 bg-emerald-400/20 rounded-full animate-ping"></div>
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                  <i className="fa-solid fa-hand text-base"></i>
                </div>
              </>
            ) : (
              <>
                <div className="absolute w-12 h-12 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="w-12 h-12 bg-slate-300 text-slate-500 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-hand-pointer text-base"></i>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Prediction Confidence Progress Bar Section */}
      <div className="mt-6 border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
          <span>دقة الرصد والذكاء:</span>
          <span className="font-poppins">{handVisible ? `${percentage}%` : '0%'}</span>
        </div>
        
        {/* Bar track */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              handVisible ? getConfidenceColorClass(confidence) : 'bg-slate-200'
            }`}
            style={{ width: `${handVisible ? percentage : 0}%` }}
          ></div>
        </div>

        {/* AI status legend */}
        <div className="flex justify-between items-center mt-3 text-xxs sm:text-xs text-gray-400 font-semibold">
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-circle text-emerald-500 text-[6px]"></i>
            مستقر (&gt;80%)
          </span>
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-circle text-yellow-500 text-[6px]"></i>
            متوسط (60-80%)
          </span>
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-circle text-red-500 text-[6px]"></i>
            منخفض (&lt;60%)
          </span>
        </div>
      </div>

    </div>
  );
};
