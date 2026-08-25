/**
 * Jordanian Sign Language Translator - Camera Tracking Card
 * ==========================================================
 * Manages webcam streams, client-side MediaPipe landmark extraction,
 * skeleton overlays, device selection, and FPS calculations.
 */

window.JSL_APP.components.CameraCard = function({ onLandmarksDetected, onHandVisibilityChange }) {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  
  // States
  const [isActive, setIsActive] = React.useState(false);
  const [devices, setDevices] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState('');
  const [fps, setFps] = React.useState(0);
  const [handDetected, setHandDetected] = React.useState(false);
  const [inferenceTime, setInferenceTime] = React.useState(0);
  const [statusText, setStatusText] = React.useState('الكاميرا مغلقة');
  const [cameraLoading, setCameraLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  // Refs for tracking loops
  const cameraRef = React.useRef(null);
  const handsRef = React.useRef(null);
  const lastFrameTimeRef = React.useRef(performance.now());
  const lastPredictionTimeRef = React.useRef(0);
  const isPredictingRef = React.useRef(false);
  
  // Get list of video devices
  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(deviceList => {
        const videoDevices = deviceList.filter(d => d.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      })
      .catch(err => {
        console.error('Error listing camera devices:', err);
        setErrorMsg('فشل الوصول إلى أجهزة الكاميرا. يرجى التأكد من توصيل الكاميرا.');
      });
  }, []);

  // Initialize MediaPipe Hands
  const initMediaPipe = React.useCallback(() => {
    if (handsRef.current) return handsRef.current;

    try {
      if (!window.Hands) {
        throw new Error('مكتبة MediaPipe Hands لم يتم تحميلها بشكل صحيح من الشبكة.');
      }

      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
      });

      hands.onResults(onResults);
      handsRef.current = hands;
      return hands;
    } catch (err) {
      console.error('[MediaPipe Init Error]:', err);
      setErrorMsg('حدث خطأ أثناء تشغيل محرك تتبع اليدين: ' + err.message);
      return null;
    }
  }, []);

  // Frame processing callback from MediaPipe Hands
  const sequenceRef = React.useRef([]);
  const onResults = async (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate FPS
    const now = performance.now();
    const currentFps = Math.round(1000 / (now - lastFrameTimeRef.current));
    lastFrameTimeRef.current = now;
    setFps(currentFps);

    // Check if hand was detected
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      
      if (!handDetected) {
        setHandDetected(true);
        onHandVisibilityChange(true);
      }

      // Draw hand skeleton mesh on overlay canvas for all detected hands
      if (results.multiHandLandmarks) {
        for (const handLandmarks of results.multiHandLandmarks) {
          if (window.drawConnectors && window.HAND_CONNECTIONS) {
            window.drawConnectors(ctx, handLandmarks, window.HAND_CONNECTIONS, {
              color: '#60A5FA', // Sky Blue joints lines
              lineWidth: 4
            });
          }
          // Extract coordinates (126 elements) for the current frame
      const frameLandmarks = new Array(126).fill(0.0);
      if (results.multiHandLandmarks) {
        for (let h = 0; h < Math.min(results.multiHandLandmarks.length, 2); h++) {
          const hand = results.multiHandLandmarks[h];
          const offset = h * 21 * 3;
          for (let i = 0; i < hand.length; i++) {
            frameLandmarks[offset + i * 3] = hand[i].x;
            frameLandmarks[offset + i * 3 + 1] = hand[i].y;
            frameLandmarks[offset + i * 3 + 2] = hand[i].z;
          }
        }
          }
        
        }
      }

      // Extract coordinates (126 elements) for the current frame
      const frameLandmarks = new Array(126).fill(0.0);
      if (results.multiHandLandmarks) {
        for (let h = 0; h < Math.min(results.multiHandLandmarks.length, 2); h++) {
          const hand = results.multiHandLandmarks[h];
          const offset = h * 21 * 3;
          for (let i = 0; i < hand.length; i++) {
            frameLandmarks[offset + i * 3] = hand[i].x;
            frameLandmarks[offset + i * 3 + 1] = hand[i].y;
            frameLandmarks[offset + i * 3 + 2] = hand[i].z;
          }
        }
      }

      // Push to sequence buffer on every frame to match 30 FPS training data speed
      sequenceRef.current.push(frameLandmarks);
      if (sequenceRef.current.length > 30) {
        sequenceRef.current.shift();
      }

      // Throttle the backend prediction request to once every 300ms
      if (sequenceRef.current.length === 30 && (now - lastPredictionTimeRef.current > 300) && !isPredictingRef.current) {
        isPredictingRef.current = true;
        lastPredictionTimeRef.current = now;
        const startPredict = performance.now();
        
        onLandmarksDetected(sequenceRef.current)
          .then(() => {
            const endPredict = performance.now();
            setInferenceTime(Math.round(endPredict - startPredict));
          })
          .catch((err) => {
            console.warn('Prediction call error:', err);
          })
          .finally(() => {
            isPredictingRef.current = false;
          });
      }
    } else {
      if (handDetected) {
        setHandDetected(false);
        onHandVisibilityChange(false);
      }
      sequenceRef.current = []; // Reset sequence buffer if hands are lost
    }
   };
  

  // Start Webcam Stream and MediaPipe Camera Utils Loop
  const startCamera = async () => {
    setErrorMsg('');
    setCameraLoading(true);
    setStatusText('يتم تشغيل الكاميرا...');
    sequenceRef.current = []; // Clear any residual sequence

    const hands = initMediaPipe();
    if (!hands) {
      setCameraLoading(false);
      return;
    }

    try {
      const video = videoRef.current;
      
      // Stop any existing stream
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: selectedDevice ? { deviceId: { exact: selectedDevice } } : true
      };
      console.log("Request Camera");
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      video.play();

     
     // Configure MediaPipe dynamic camera utility loop
      console.log("Start Camera");
      if (window.Camera) {
        const camera = new window.Camera(video, {
           onFrame: async () => {
             if (video.readyState >= 2) {
               await hands.send({ image: video });
               console.log("Creating MediaPipe Camera");
                }
             },
          width: 640,
          height: 480
        });

        camera.start();
        cameraRef.current = camera;
        setIsActive(true);
        console.log("Camera Started");
        setStatusText('نشط');
      } else {
        throw new Error('لم يتم العثور على كاميرا MediaPipe.');
      }
    } catch (err) {
      console.error('Camera stream access error:', err);
      setErrorMsg('تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات واختيار الكاميرا الصحيحة.');
      setStatusText('خطأ في الاتصال');
    } finally {
      setCameraLoading(false);
    }
  };

  // Stop Webcam Stream
  const stopCamera = React.useCallback(() => {
    setStatusText('الكاميرا مغلقة');
    setIsActive(false);
    setHandDetected(false);
    onHandVisibilityChange(false);
    setFps(0);
    setInferenceTime(0);

    // Stop camera utility loop
    if (cameraRef.current) {
      try {
        cameraRef.current.stop();
      } catch (e) {
        console.warn('Error stopping camera helper:', e);
      }
      cameraRef.current = null;
    }

    // Stop raw media tracks
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [onHandVisibilityChange]);

  // Keep a ref to the latest stopCamera so the unmount effect below
  // doesn't need stopCamera in its dependency array (see note below).
  const stopCameraRef = React.useRef(stopCamera);
  React.useEffect(() => {
    stopCameraRef.current = stopCamera;
  }, [stopCamera]);

  // Clean up ONLY on true unmount.
  // IMPORTANT: dependency array is intentionally [] here. If we depend on
  // `stopCamera` (or anything derived from the onHandVisibilityChange /
  // onLandmarksDetected props), then any parent re-render that creates a
  // new function reference for those props will change `stopCamera`'s
  // identity too, causing THIS effect's cleanup to fire (i.e. stopCamera()
  // gets called) even though the component never actually unmounted. That
  // was the root cause of the camera turning off as soon as a hand was
  // detected: detecting a hand triggered a parent re-render -> new prop
  // reference -> new stopCamera -> cleanup ran -> camera stopped.
  React.useEffect(() => {
    return () => {
      stopCameraRef.current();
      if (handsRef.current) {
        try {
          handsRef.current.close();
        } catch (e) {
          console.warn('Error closing hands engine:', e);
        }
        handsRef.current = null;
      }
    };
  }, []);

  return (
    <div className="glass-card rounded-3xl p-6 shadow-lg border border-white flex flex-col h-full">
      
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <i className="fa-solid fa-camera text-sm animate-pulse"></i>
          </div>
          <h3 className="text-lg font-bold text-textDark">مستشعر الكاميرا واليدين</h3>
        </div>
        
        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
          isActive 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-slate-100 text-slate-500'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`}></span>
          {statusText}
        </span>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation text-base"></i>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Camera Source Selection */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-400 mb-1.5">اختر الكاميرا النشطة:</label>
        <div className="relative">
          <select
            disabled={isActive}
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {devices.map(d => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || `كاميرا ${devices.indexOf(d) + 1}`}
              </option>
            ))}
            {devices.length === 0 && <option>البحث عن كاميرات...</option>}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-slate-500">
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>

      {/* Camera Feed Display Box */}
      <div className="flex-grow webcam-container aspect-video relative flex items-center justify-center rounded-2xl overflow-hidden border border-slate-200">
        
        {/* Live Video Element */}
        <video
          ref={videoRef}
          className="webcam-feed"
          playsInline
          muted
        ></video>
        
        {/* Canvas Skeleton Overlay */}
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="landmarks-canvas"
        ></canvas>

        {/* Placeholder when Camera is inactive */}
        {!isActive && !cameraLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/90 text-white z-20">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-primary mb-4 shadow-lg border border-slate-700/50">
              <i className="fa-solid fa-hands-asl-interpreting text-2xl"></i>
            </div>
            <p className="font-bold text-base mb-1">اضغط على زر تشغيل الكاميرا</p>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              يرجى إعطاء إذن تشغيل الكاميرا للمتصفح والوقوف أمامها لتتبع حركات يديك فورياً.
            </p>
          </div>
        )}

        {/* Loader when booting camera */}
        {cameraLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/90 text-white z-20">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-sm">جاري تهيئة محرك التتبع...</p>
          </div>
        )}
      </div>

      {/* Metrics Panel Overlay */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
          <span className="block text-xxs font-bold text-gray-400 uppercase tracking-wider mb-0.5">معدل الإطارات</span>
          <span className="text-sm font-extrabold text-slate-700 font-poppins">{fps} FPS</span>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
          <span className="block text-xxs font-bold text-gray-400 uppercase tracking-wider mb-0.5">تتبع اليد</span>
          <span className={`text-sm font-extrabold flex items-center justify-center gap-1.5 ${
            handDetected ? 'text-emerald-600' : 'text-red-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${handDetected ? 'bg-emerald-500 animate-ping' : 'bg-red-400'}`}></span>
            {handDetected ? 'مكتشفة' : 'لا توجد'}
          </span>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
          <span className="block text-xxs font-bold text-gray-400 uppercase tracking-wider mb-0.5">زمن المعالجة</span>
          <span className="text-sm font-extrabold text-slate-700 font-poppins">{inferenceTime} ms</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="mt-6 flex gap-4">
        {isActive ? (
          <button
            onClick={stopCamera}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] btn-animate flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-video-slash"></i>
            إيقاف الكاميرا
          </button>
        ) : (
          <button
            onClick={startCamera}
            disabled={cameraLoading}
            className="flex-1 bg-accent hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] btn-animate flex items-center justify-center gap-2 disabled:opacity-55"
          >
            <i className="fa-solid fa-video"></i>
            تشغيل الكاميرا
          </button>
        )}
      </div>

    </div>
  );
};
 