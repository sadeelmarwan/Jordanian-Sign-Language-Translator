/**
 * Jordanian Sign Language Translator - Footer Component
 * ====================================================
 */

window.JSL_APP.components.Footer = function({ setActivePage }) {
  return (
    <footer className="bg-slate-900 text-slate-300 font-cairo pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Logo & Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <i className="fa-solid fa-hands-asl-interpreting text-lg"></i>
              </div>
              <span className="text-white font-bold text-lg">إشارة الأردن</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              تطبيق ريادي يوظف أحدث تقنيات الذكاء الاصطناعي لترجمة لغة الإشارة الأردنية مباشرة إلى كلمات منطوقة ومكتوبة، لتمكين مجتمع الصم ومساندتهم في حياتهم اليومية.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-primary transition-colors">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => setActivePage('translate')} className="hover:text-primary transition-colors">مترجم الكاميرا</button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-primary transition-colors">عن المشروع</button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-primary transition-colors">تواصل معنا</button>
              </li>
            </ul>
          </div>

          {/* Technical Specs & Tools */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">التقنيات المستخدمة</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><i className="fa-brands fa-react text-blue-400 ml-2"></i>React & Tailwind</li>
              <li><i className="fa-brands fa-python text-yellow-500 ml-2"></i>Flask (Python)</li>
              <li><i className="fa-solid fa-brain text-purple-400 ml-2"></i>MediaPipe Hands</li>
              <li><i className="fa-solid fa-microchip text-emerald-400 ml-2"></i>Scikit-learn / ML</li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-800 my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} مشروع مترجم لغة الإشارة الأردنية. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-4 space-x-reverse">
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-github text-lg"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-linkedin text-lg"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-twitter text-lg"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
