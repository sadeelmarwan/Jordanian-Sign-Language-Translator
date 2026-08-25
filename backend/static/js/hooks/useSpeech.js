/**
 * Jordanian Sign Language Translator - custom speech synthesis hook
 * =================================================================
 * Uses the Web Speech API (window.speechSynthesis) to speak Arabic sentences.
 */

window.JSL_APP.hooks.useSpeech = function() {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const synthRef = React.useRef(window.speechSynthesis);

  // Stop speaking on unmount
  React.useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  /**
   * Speaks the provided text in Arabic.
   * 
   * @param {string} text - Arabic text to speak
   * @param {number} rate - Speed rate (default 0.9 for clarity)
   */
  const speak = React.useCallback((text, rate = 0.9) => {
    if (!text || !synthRef.current) return;

    // Cancel any active speech first
    synthRef.current.cancel();

    // Create Speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure Arabic language (ar-SA is standard and widely supported across Windows/Chrome/Edge)
    utterance.lang = 'ar-SA';
    
    // Find an Arabic voice if available
    const voices = synthRef.current.getVoices();
    const arabicVoice = voices.find(voice => voice.lang.startsWith('ar') || voice.lang.includes('arabic'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Track speech status
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('[Speech Hook] SpeechSynthesis error:', e);
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  }, []);

  /**
   * Cancels any active speech.
   */
  const cancel = React.useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    speak,
    cancel,
    isSpeaking
  };
};
