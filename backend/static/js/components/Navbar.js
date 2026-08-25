/**
 * Jordanian Sign Language Translator - Navbar Component
 * ====================================================
 */

window.JSL_APP.components.Navbar = function({ activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', icon: 'fa-home' },
    { id: 'translate', label: 'الترجمة الفورية', icon: 'fa-hands-asl-interpreting' },
    { id: 'about', label: 'عن المشروع', icon: 'fa-circle-info' },
    { id: 'contact', label: 'تواصل معنا', icon: 'fa-envelope' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-navbar shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section */} 
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white shadow-md animate-pulse-glow">
              <i className="fa-solid fa-hands-asl-interpreting text-lg sm:text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-textDark font-extrabold text-base sm:text-lg font-cairo leading-tight">إشارة الأردن</span>
              <span className="text-gray-400 text-xxs sm:text-xs font-poppins tracking-wider">JSL Translator</span>
            </div>
          </div>

          {/* Desktop Navigation Link List */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 font-cairo ${
                    isActive
                      ? 'bg-accent text-white shadow-md shadow-blue-200'
                      : 'text-gray-600 hover:bg-slate-100 hover:text-accent'
                  }`}
                >
                  <i className={`fa-solid ${link.icon} text-xs`}></i>
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Action CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => setActivePage('translate')}
              className="bg-gradient-to-r from-accent to-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 btn-animate"
            >
              ابدأ الترجمة الآن
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-600 p-2 rounded-lg hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200/50 animate-slide-up">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent font-extrabold border-r-4 border-accent'
                      : 'text-gray-600 hover:bg-slate-50'
                  }`}
                >
                  <i className={`fa-solid ${link.icon} w-5 text-center`}></i>
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 px-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setActivePage('translate');
                  setMobileOpen(false);
                }}
                className="w-full bg-accent text-white font-bold py-3 rounded-xl text-center shadow-md block"
              >
                البدء بالترجمة الكاميرا
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
