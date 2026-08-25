/**
 * Jordanian Sign Language Translator - Hero Component
 * ====================================================
 */

window.JSL_APP.components.Hero = function({ setActivePage }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 sm:pb-24 lg:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Text Content (Left-aligned in RTL, Right-aligned in LTR - RTL makes it show on right) */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-right">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/60 text-accent text-xs sm:text-sm font-bold mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>تقنيات رؤية حاسوبية مدعومة بالذكاء الاصطناعي</span>
            </div>

            {/* Titles */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-textDark font-cairo leading-tight sm:leading-none">
              مترجم لغة الإشارة <br />
              <span className="gradient-text">الأردنية الذكي</span>
            </h1>
            
            <h2 className="mt-4 text-lg sm:text-xl text-gray-500 font-semibold font-cairo">
              نساعد الصم والبكم على التواصل بسهولة ويسر مع العالم الخارجي.
            </h2>
            
            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed font-cairo max-w-xl sm:mx-auto lg:mr-0">
              يقوم هذا النظام بالتقاط حركات اليد عبر الكاميرا فورياً، وترجمتها باستخدام خوارزميات ذكاء اصطناعي مخصصة لتمثيل الكلمات العربية، مع إمكانية نطق النصوص آلياً لدمج أصحاب الهمم في المجتمع اليومي.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => setActivePage('translate')}
                className="px-8 py-4 rounded-2xl bg-accent text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:bg-blue-700 transition-all hover:scale-105 btn-animate flex items-center justify-center gap-3 font-cairo"
              >
                <i className="fa-solid fa-camera text-base"></i>
                ابدأ الترجمة الفورية
              </button>
              
              <button
                onClick={() => setActivePage('about')}
                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all hover:scale-105 btn-animate flex items-center justify-center gap-3 font-cairo"
              >
                تعرّف على المشروع
                <i className="fa-solid fa-arrow-left text-xs"></i>
              </button>
            </div>

            {/* Stats info */}
            <div className="mt-10 border-t border-slate-100 pt-8 grid grid-cols-3 gap-4 max-w-lg sm:mx-auto lg:mr-0">
              <div>
                <span className="block text-2xl font-bold text-accent font-poppins">30 FPS</span>
                <span className="text-xs text-gray-400 font-cairo">معالجة فورية</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-accent font-poppins">63 pt</span>
                <span className="text-xs text-gray-400 font-cairo">إحداثيات اليد</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-accent font-poppins">100%</span>
                <span className="text-xs text-gray-400 font-cairo">خصوصية المستخدم</span>
              </div>
            </div>

          </div>

          {/* Beautiful Vector Hands Illustration (Left side in RTL) */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center animate-float">
              
              {/* Decorative background glowing blur rings */}
              <div className="absolute -inset-4 rounded-full bg-blue-400/10 blur-3xl opacity-60"></div>
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-secondary/40 to-blue-200/20 blur-2xl"></div>

              {/* Main SVG Illustration */}
              <svg viewBox="0 0 500 500" className="w-10/12 h-10/12 relative z-10 drop-shadow-2xl">
                {/* Outer Ring */}
                <circle cx="250" cy="250" r="220" fill="none" stroke="#DBEAFE" stroke-width="4" stroke-dasharray="10 15" />
                <circle cx="250" cy="250" r="200" fill="rgba(255, 255, 255, 0.4)" />
                <circle cx="250" cy="250" r="180" fill="url(#circleGrad)" />

                {/* Gradients def */}
                <defs>
                  <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#EFF6FF" />
                    <stop offset="100%" stop-color="#DBEAFE" stop-opacity="0.8" />
                  </linearGradient>
                  <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#60A5FA" />
                    <stop offset="100%" stop-color="#2563EB" />
                  </linearGradient>
                  <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#93C5FD" />
                    <stop offset="100%" stop-color="#60A5FA" />
                  </linearGradient>
                </defs>

                {/* Hand 1 (Right side gesture symbol) */}
                <g transform="translate(150, 160) scale(0.7)">
                  {/* Wrist / Arm */}
                  <path d="M70,260 L130,260 L130,170 C130,170 120,130 90,130 C60,130 70,170 70,170 Z" fill="url(#handGrad)" opacity="0.9" />
                  {/* Thumb */}
                  <path d="M120,150 C120,150 160,140 165,120 C170,100 145,90 135,110 L115,135 Z" fill="url(#handGrad)" />
                  {/* Index finger */}
                  <rect x="70" y="30" width="22" height="110" rx="11" fill="url(#handGrad)" />
                  {/* Middle finger */}
                  <rect x="96" y="10" width="22" height="130" rx="11" fill="url(#handGrad)" />
                  {/* Ring finger */}
                  <rect x="122" y="30" width="22" height="110" rx="11" fill="url(#handGrad)" />
                  {/* Pinky finger */}
                  <rect x="148" y="60" width="22" height="80" rx="11" fill="url(#handGrad)" />
                </g>

                {/* Hand 2 (Left side gesture, overlay) */}
                <g transform="translate(210, 200) scale(0.65)">
                  {/* Wrist */}
                  <path d="M70,260 L130,260 L130,170 C130,170 120,130 90,130 C60,130 70,170 70,170 Z" fill="url(#accentGrad)" opacity="0.8" />
                  {/* Thumb */}
                  <path d="M80,150 C80,150 40,140 35,120 C30,100 55,90 65,110 L85,135 Z" fill="url(#accentGrad)" />
                  {/* Index */}
                  <rect x="70" y="40" width="22" height="100" rx="11" fill="url(#accentGrad)" />
                  {/* Middle */}
                  <rect x="96" y="20" width="22" height="120" rx="11" fill="url(#accentGrad)" />
                  {/* Ring */}
                  <rect x="122" y="40" width="22" height="100" rx="11" fill="url(#accentGrad)" />
                  {/* Pinky */}
                  <rect x="148" y="70" width="22" height="70" rx="11" fill="url(#accentGrad)" />
                </g>

                {/* Pulse Waves & Symbols */}
                <circle cx="250" cy="110" r="15" fill="#3B82F6" opacity="0.8" />
                <path d="M245,103 L255,110 L245,117" stroke="white" stroke-width="2" fill="none" />
                <circle cx="120" cy="320" r="22" fill="#60A5FA" opacity="0.6" />
                <circle cx="370" cy="300" r="18" fill="#93C5FD" opacity="0.5" />
                
                {/* Floating digital network dots */}
                <circle cx="230" cy="180" r="4" fill="#2563EB" />
                <circle cx="280" cy="200" r="3" fill="#2563EB" />
                <circle cx="180" cy="230" r="4.5" fill="#60A5FA" />
                <circle cx="310" cy="240" r="3.5" fill="#60A5FA" />
                
                {/* Digital hand connection lines */}
                <line x1="230" y1="180" x2="280" y2="200" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="2 2" />
                <line x1="180" y1="230" x2="230" y2="180" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="2 2" />
                <line x1="280" y1="200" x2="310" y2="240" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="2 2" />
              </svg>

              {/* Floating metrics bubble */}
              <div className="absolute bottom-6 right-6 glass-card px-4 py-2.5 rounded-2xl shadow-lg border border-white flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                <div className="flex flex-col">
                  <span className="text-xxs text-gray-400 font-poppins">MODEL STATUS</span>
                  <span className="text-xs font-bold text-textDark font-cairo">متصل ومستعد للترجمة</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
