/**
 * Jordanian Sign Language Translator - About Page View
 * =====================================================
 */

window.JSL_APP.pages.About = function() {
  const pipelineSteps = [
    {
      num: '1',
      title: 'التقاط الكاميرا',
      desc: 'قراءة الإطارات من كاميرا المستخدم المحلية مباشرة في المتصفح بمعدل 30 إطاراً بالثانية.',
      icon: 'fa-camera'
    },
    {
      num: '2',
      title: 'رصد المفاصل (MediaPipe)',
      desc: 'استخلاص 21 نقطة ثلاثية الأبعاد تمثل هيكل مفاصل اليد (x, y, z) لتمثيل دقيق لشكل الكف.',
      icon: 'fa-hand'
    },
    {
      num: '3',
      title: 'التطبيع والتجهيز',
      desc: 'إزاحة النقاط لتتوسط المعصم وقسمتها على حجم الكف للتخلص من مشاكل بعد اليد وميلان الكاميرا.',
      icon: 'fa-arrows-spin'
    },
    {
      num: '4',
      title: 'التنبؤ الذكي (Deep Learning)',
      desc: 'إرسال مصفوفة الإطارات (126 قيمة لكل إطار × 30 إطاراً) إلى نموذج TensorFlow/Keras LSTM للتنبؤ بالكلمة المقابلة.',
      icon: 'fa-brain'
    },
    {
      num: '5',
      title: 'النطق والتحويل لصوت',
      desc: 'تحويل النص العربي المترجم إلى كلام مسموع باستخدام محرك النطق في المتصفح لسهولة المحادثة.',
      icon: 'fa-volume-high'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Heading Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">حول مشروع مترجم لغة الإشارة الأردنية</h2>
        <p className="mt-4 text-gray-500 font-semibold text-sm sm:text-base leading-relaxed">
          مشروع تقني ريادي يهدف إلى سد الفجوة في مهارات الاتصال والتواصل بين الصم والبكم وعامة المجتمع باستخدام تقنيات تعلم الآلة المتقدمة في الويب.
        </p>
      </div>

      {/* Main Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 border-r-4 border-accent pr-3">رسالة وأهداف المشروع</h3>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-semibold">
            يعاني مجتمع الصم من عوائق مستمرة في التعبير وإجراء معاملاتهم اليومية في الدوائر والمستشفيات لعدم إلمام الأغلبية الساحقة بلغة الإشارة. 
            يهدف هذا المشروع لتقديم حل فوري مجاني يعمل على أي متصفح ويب مزود بكاميرا، بدون الحاجة لتحميل تطبيقات ضخمة أو تعريض خصوصية المستخدم للخطر.
          </p>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-semibold">
            النظام مبني على مبدأ الخصوصية أولاً (Privacy by Design) ومعالجة الإحداثيات محلياً، مما يضمن أماناً فائقاً للمستخدمين وسرعة معالجة استثنائية تناسب الأجهزة المتنقلة والمكتبية.
          </p>
        </div>

        <div className="bg-gradient-to-tr from-accent/5 to-primary/10 rounded-3xl p-8 border border-white flex flex-col justify-center h-full relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-accent/5 blur-2xl"></div>
          <h4 className="text-accent font-bold text-lg mb-4">الفوائد الرئيسية</h4>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-accent text-white flex items-center justify-center text-xs mt-0.5"><i className="fa-solid fa-check"></i></span>
              <div className="space-y-0.5">
                <h5 className="text-sm font-bold text-slate-800">سهولة متناهية في الاستخدام</h5>
                <p className="text-xs text-gray-400 font-semibold">لا يتطلب سوى كاميرا ويب متصلة، وبكبسة زر واحدة يبدأ في تقديم الترجمة المباشرة.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-accent text-white flex items-center justify-center text-xs mt-0.5"><i className="fa-solid fa-check"></i></span>
              <div className="space-y-0.5">
                <h5 className="text-sm font-bold text-slate-800">استقلالية أصحاب الهمم</h5>
                <p className="text-xs text-gray-400 font-semibold">يمكّن فئة الصم من إجراء المحادثات المكتوبة والمسموعة بشكل مباشر دون وسيط بشري.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-accent text-white flex items-center justify-center text-xs mt-0.5"><i className="fa-solid fa-check"></i></span>
              <div className="space-y-0.5">
                <h5 className="text-sm font-bold text-slate-800">هندسة متطورة مرنة</h5>
                <p className="text-xs text-gray-400 font-semibold">تصميم يفصل بين واجهات العرض ومحرك معالجة البيانات بما يتيح استبدال النماذج والملفات بنقرة واحدة.</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Technical Pipeline Visualization */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-16">
        
        <h3 className="text-xl font-bold text-slate-800 text-center mb-10">تسلسل آلية عمل الذكاء الاصطناعي</h3>
        
        {/* Workflow timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {pipelineSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative z-10 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-accent text-white font-extrabold flex items-center justify-center text-sm shadow-md mb-4 border-4 border-slate-100">
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-2">{step.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">{step.desc}</p>
            </div>
          ))}

          {/* Horizontal connector bar (hidden on mobile) */}
          <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-slate-100 z-0"></div>

        </div>

      </div>

      {/* Technologies Info Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 text-center mb-8">العمود الفقري البرمجي</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-slate-100 p-6 rounded-2xl text-center bg-slate-50">
            <div className="text-emerald-500 text-2xl mb-4"><i className="fa-solid fa-brain"></i></div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">TensorFlow & Keras</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">بناء وتدريب نموذج الشبكات العصبية المتكررة LSTM للتنبؤ بلغة الإشارة بدقة عالية.</p>
          </div>
          <div className="border border-slate-100 p-6 rounded-2xl text-center bg-slate-50">
            <div className="text-blue-400 text-2xl mb-4"><i className="fa-brands fa-react"></i></div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">MediaPipe Hands</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">الحصول السريع على إحداثيات مفاصل اليد بدقة ممتازة على المتصفح مباشرة.</p>
          </div>
          <div className="border border-slate-100 p-6 rounded-2xl text-center bg-slate-50">
            <div className="text-yellow-600 text-2xl mb-4"><i className="fa-brands fa-python"></i></div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">Python Flask</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">بناء الـ API وتوزيع المسارات واستقبال إحداثيات اليدين وإرجاع الترجمات.</p>
          </div>
          <div className="border border-slate-100 p-6 rounded-2xl text-center bg-slate-50">
            <div className="text-cyan-500 text-2xl mb-4"><i className="fa-solid fa-volume-high"></i></div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">Web Speech API</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">قراءة الجمل العربية آلياً فور طلب المستخدم وربطها بلكنة أردنية مناسبة.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
