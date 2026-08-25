 /**
 * Jordanian Sign Language Translator - Live Translation Dashboard
 * ================================================================
 * Combines Camera feeds, Prediction cards, and History accumulation Panels.
 * Implements communication with /api/predict via services.api.
 */

window.JSL_APP.pages.LiveTranslation = function() {
  // Services & Hooks
  const api = window.JSL_APP.services.api;
  const useSpeech = window.JSL_APP.hooks.useSpeech;
  
  // Components
  const CameraCard = window.JSL_APP.components.CameraCard;
  const PredictionCard = window.JSL_APP.components.PredictionCard;
  const HistoryPanel = window.JSL_APP.components.HistoryPanel;

  // React State Hook variables
  const [prediction, setPrediction] = React.useState(null);
  const [handVisible, setHandVisible] = React.useState(false);
  const [isPredicting, setIsPredicting] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [sentence, setSentence] = React.useState('');

  // Instantiate speech synthesis hook
  const { speak, cancel, isSpeaking } = useSpeech();

  // Keep track of the last predicted word to prevent duplications while making the sign
  const lastPredictedWordRef = React.useRef(null);
  const stableWordFramesCountRef = React.useRef(0);

  // Triggered when client-side MediaPipe Hands outputs landmark arrays (every 200ms)
  // Wrapped in useCallback so the function reference stays stable across re-renders.
  // (Without this, CameraCard's internal useEffect/useCallback chain sees a "new"
  // prop on every render and re-fires its cleanup, which calls stopCamera()).
  const handleLandmarksDetected = React.useCallback(async (landmarks) => {
    setIsPredicting(true);
    try {
      // POST coordinates to Flask API
      const result = await api.predictGesture(landmarks);
      setPrediction(result);

      if (result && result.label && result.confidence >= 0.7) {
        const detectedWord = result.label;
        
        // Simple smoothing logic to avoid flicker:
        // A gesture must be detected consistently for at least 2 consecutive prediction frames (~400ms)
        // to be appended to the sentence history.
        if (detectedWord === lastPredictedWordRef.current) {
          stableWordFramesCountRef.current += 1;
          
          // Trigger add word after being stable for 3 frames (~600ms)
          if (stableWordFramesCountRef.current === 3) {
            setHistory(prev => {
              // Avoid duplicate additions at the tail of history
              if (prev[0] === detectedWord) return prev;
              
              const updatedHistory = [detectedWord, ...prev];
              
              // Construct the sentence
              // Reverse history to form natural left-to-right (RTL natural right-to-left) sentence string
              const sentenceArray = [...updatedHistory].reverse();
              setSentence(sentenceArray.join(' '));
              
              return updatedHistory;
            });
          }
        } else {
          // Reset tracker if the word changes
          lastPredictedWordRef.current = detectedWord;
          stableWordFramesCountRef.current = 1;
        }
      }
    } catch (err) {
      console.warn('Prediction request failed:', err);
    } finally {
      setIsPredicting(false);
    }
  }, [api]);

  // Manage hand detection visibility states
  // Also wrapped in useCallback for the same reason as above.
  const handleHandVisibilityChange = React.useCallback((visible) => {
    setHandVisible(visible);
    if (!visible) {
      setPrediction(null);
      lastPredictedWordRef.current = null;
      stableWordFramesCountRef.current = 0;
    }
  }, []);

  // Operations
  const handleClear = () => {
    setHistory([]);
    setSentence('');
    lastPredictedWordRef.current = null;
    stableWordFramesCountRef.current = 0;
    cancel();
  };

  const handleSpeak = () => {
    if (sentence) {
      if (isSpeaking) {
        cancel();
      } else {
        speak(sentence);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Overview Header */}
      <div className="mb-8 text-right">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">مترجم لغة الإشارة الفوري</h2>
        <p className="text-sm text-gray-500 font-semibold mt-1.5">
          قم بتفعيل الكاميرا للبدء في تتبع إشارات يديك وترجمتها مباشرة إلى جمل منطوقة باللغة العربية.
        </p>
      </div>

      {/* Main Live Grid System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Large Camera Feeder: 7 Columns */}
        <div className="lg:col-span-7 h-full min-h-[450px]">
          <CameraCard
            onLandmarksDetected={handleLandmarksDetected}
            onHandVisibilityChange={handleHandVisibilityChange}
          />
        </div>

        {/* Predict outputs and History aggregation: 5 Columns */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
          
          {/* Prediction Card */}
          <div className="flex-1">
            <PredictionCard
              prediction={prediction}
              handVisible={handVisible}
              isPredicting={isPredicting}
            />
          </div>

          {/* History panel */}
          <div className="flex-1">
            <HistoryPanel
              history={history}
              sentence={sentence}
              onClear={handleClear}
              onSpeak={handleSpeak}
              isSpeaking={isSpeaking}
            />
          </div>

        </div>

      </div>

      {/* Help Guidelines Card */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-6 text-slate-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-12 h-12 rounded-xl bg-blue-200/50 flex items-center justify-center text-accent flex-shrink-0">
          <i className="fa-solid fa-lightbulb text-lg"></i>
        </div>
        <div className="space-y-1.5">
          <h4 className="font-bold text-sm text-slate-800">نصائح للحصول على أدق قراءة:</h4>
          <ul className="text-xs text-slate-500 leading-relaxed list-disc list-inside space-y-0.5 font-semibold">
            <li>حافظ على إضاءة جيدة ومباشرة لليد في مجال رؤية الكاميرا.</li>
            <li>ثبت حركة اليد لمدة نصف ثانية عند إكمال الإشارة ليتم التقاطها.</li>
            <li>الكلمات المتاحة حالياً للترجمة: (مرحبا، شكرا، نعم، لا، أريد، مساعدة، كيف حالك، ماء، آسف).</li>
          </ul>
        </div>
      </div>

    </div>
  );
};