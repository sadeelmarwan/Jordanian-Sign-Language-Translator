/**
 * Jordanian Sign Language Translator - Home Page View
 * ====================================================
 */

window.JSL_APP.pages.Home = function({ setActivePage }) {
  const Hero = window.JSL_APP.components.Hero;

  // Features list
  const coreFeatures = [
    {
      icon: 'fa-gauge-high',
      title: 'استجابة فورية فائقة السرعة',
      desc: 'بفضل معالجة الإحداثيات محلياً وإرسال مصفوفات خفيفة الحجم، تتم الترجمة في زمن حقيقي دون تأخير.'
    },
    {
      icon: 'fa-shield-halved',
      title: 'حماية كاملة للخصوصية',
      desc: 'يتم تشغيل الكاميرا محلياً بالكامل. لا نقوم برفع صورك أو فيديوهاتك الشخصية إلى الخوادم؛ فقط أرقام الإحداثيات.'
    },
    {
      icon: 'fa-language',
      title: 'دعم مخارج الحروف والنطق',
      desc: 'ربط مباشر بمحركات النطق الذكية باللغة العربية لتحويل النصوص المترجمة إلى صوت منطوق بلكنة واضحة.'
    }
  ];

  // Future features placeholders
  const futureFeatures = [
    {
      icon: 'fa-microphone',
      title: 'تحويل الصوت إلى لغة إشارة',
      desc: 'قريباً: تحدث بصوتك وسيقوم النظام بعرض مجسمات ثلاثية الأبعاد تنفذ الإشارات المقابلة باليد.'
    },
    {
      icon: 'fa-book',
      title: 'قاموس لغة الإشارة التفاعلي',
      desc: 'مرجع كامل للبحث عن الكلمات وعرض مقاطع تعليمية لكيفية أدائها بالطريقة الأردنية المعتمدة.'
    },
    {
      icon: 'fa-floppy-disk',
      title: 'حفظ وسجل المحادثات',
      desc: 'إمكانية تخزين الجمل المترجمة ومشاركتها مباشرة أو تحميلها كمستندات نصية لاحقاً.'
    },
    {
      icon: 'fa-moon',
      title: 'الوضع الداكن المتناسق',
      desc: 'تصميم مريح للعين يدعم الوضع الليلي التلقائي لتقليل إجهاد النظر أثناء الاستخدام الطويل.'
    },
    {
      icon: 'fa-user-gear',
      title: 'حسابات شخصية وحفظ مفضلات',
      desc: 'تسجيل دخول مخصص لحفظ روتين التدريب اليومي أو الجمل الأكثر تكراراً لتسهيل الاتصال السريع.'
    },
    {
      icon: 'fa-globe',
      title: 'تعدد لغات الإشارة العالمية',
      desc: 'التوسع لدعم لغات الإشارة العربية الموحدة والأمريكية (ASL) والبريطانية (BSL) في تحديثات لاحقة.'
    }
  ];

  return (
    <div className="gradient-bg min-h-screen">
      
      {/* Hero Header Component */}
      <Hero setActivePage={setActivePage} />

      {/* Core Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">لماذا مترجم إشارة الأردن؟</h2>
          <p className="mt-4 text-gray-500 font-semibold text-sm sm:text-base">
            تم بناء التطبيق وفق معايير عالمية تجمع بين الفعالية والخصوصية لتجربة دمج متكاملة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreFeatures.map((feat, idx) => (
            <div key={idx} className="glass-card hover-scale p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 shadow-inner">
                <i className={`fa-solid ${feat.icon} text-xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">{feat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-semibold">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Features Placeholder Roadmap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-100/60">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-extrabold text-xs tracking-wider uppercase bg-secondary px-3 py-1 rounded-full">خارطة الطريق المستقلبية</span>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-4 leading-tight">مزايا مبتكرة قيد التطوير</h2>
          <p className="mt-3 text-gray-500 font-semibold text-sm">
            رؤيتنا لا تقتصر على الترجمة الفورية فحسب، بل نسعى لبناء منصة اتصالات متكاملة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white/60 hover:bg-white border border-slate-100 p-6 rounded-2xl shadow-sm transition-all duration-300 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <i className={`fa-solid ${feature.icon} text-sm`}></i>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  {feature.title}
                  <span className="text-[9px] bg-slate-200 text-slate-500 font-extrabold px-1.5 py-0.5 rounded uppercase font-poppins">Soon</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-semibold">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
