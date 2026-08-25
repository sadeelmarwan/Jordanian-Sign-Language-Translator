/**
 * Jordanian Sign Language Translator - History & Sentence Panel
 * =============================================================
 * Aggregates individual predictions into full sentences, manages history states,
 * and handles TTS, clipboard copying, and clearing features.
 */

window.JSL_APP.components.HistoryPanel = function({ 
  history, 
  sentence, 
  onClear, 
  onSpeak, 
  isSpeaking 
}) {
  const [copied, setCopied] = React.useState(false);

  // Copy sentence to clipboard
  const handleCopy = () => {
    if (!sentence) return;
    navigator.clipboard.writeText(sentence)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text:', err));
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-lg border border-white flex flex-col h-full justify-between">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <i className="fa-solid fa-list-check text-sm"></i>
          </div>
          <h3 className="text-lg font-bold text-textDark">مخرجات الجملة وتاريخ القراءة</h3>
        </div>
        
        {/* Clear History Action Link */}
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 font-cairo"
          >
            <i className="fa-solid fa-trash-can"></i>
            مسح السجل
          </button>
        )}
      </div>

      {/* Main Sentence Composer Box */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Textbox representing composed sentence */}
        <div className="relative flex-grow min-h-[140px] bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-slate-700">
          {sentence ? (
            <p className="text-lg sm:text-xl font-bold leading-relaxed font-cairo text-right pr-1">
              {sentence}
            </p>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center px-6">
              <p className="text-xs sm:text-sm font-semibold font-cairo">
                بانتظار تكوين جملة... قم بتشغيل الكاميرا وإجراء الإشارات للتراكم النصي هنا.
              </p>
            </div>
          )}
        </div>

        {/* Horizontal scroll of individually captured words */}
        <div>
          <span className="block text-xs font-bold text-gray-400 mb-2">تاريخ الكلمات الملتقطة:</span>
          
          <div className="flex flex-row-reverse gap-2 overflow-x-auto pb-2 min-h-[46px] scrollbar-thin">
            {history.map((word, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-secondary/80 text-accent font-bold px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow-sm border border-blue-200/50 hover:bg-secondary transition-colors cursor-default whitespace-nowrap animate-slide-up"
              >
                {word}
              </span>
            ))}
            
            {history.length === 0 && (
              <span className="text-xs text-gray-400 font-semibold italic py-1">لا توجد سجلات كلمات حالياً</span>
            )}
          </div>
        </div>

      </div>

      {/* Action Panel Buttons */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        
        {/* Speak Button */}
        <button
          disabled={!sentence}
          onClick={onSpeak}
          className={`flex-1 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all hover:scale-[1.02] btn-animate flex items-center justify-center gap-2 text-sm ${
            isSpeaking 
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
              : 'bg-accent hover:bg-blue-700 text-white shadow-blue-200 disabled:bg-slate-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed'
          }`}
        >
          {isSpeaking ? (
            <>
              <i className="fa-solid fa-volume-xmark animate-pulse"></i>
              إيقاف القراءة الصوتية
            </>
          ) : (
            <>
              <i className="fa-solid fa-volume-high"></i>
              نطق الجملة (TTS)
            </>
          )}
        </button>

        <div className="flex gap-3">
          {/* Copy Button */}
          <button
            disabled={!sentence}
            onClick={handleCopy}
            className="flex-1 sm:flex-initial bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-5 rounded-2xl shadow-sm hover:scale-[1.02] btn-animate flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            title="نسخ النص"
          >
            {copied ? (
              <>
                <i className="fa-solid fa-check text-emerald-500"></i>
                تم النسخ
              </>
            ) : (
              <>
                <i className="fa-solid fa-copy"></i>
                نسخ النص
              </>
            )}
          </button>

          {/* Reset Button */}
          <button
            disabled={!sentence}
            onClick={onClear}
            className="flex-1 sm:flex-initial bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold py-3.5 px-5 rounded-2xl shadow-sm hover:scale-[1.02] btn-animate flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            title="مسح النص"
          >
            <i className="fa-solid fa-eraser"></i>
            تفريغ
          </button>
        </div>

      </div>

    </div>
  );
};
