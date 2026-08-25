/**
 * Jordanian Sign Language Translator - Contact Page View
 * =======================================================
 * Manages the client-side user contact form, submits feedback to Flask.
 */

window.JSL_APP.pages.Contact = function() {
  const api = window.JSL_APP.services.api;

  // React form state variables
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null); // 'success' or 'error'
  const [errorText, setErrorText] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorText('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorText('يرجى ملء جميع الحقول المطلوبة.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // POST feedback via API client
      const response = await api.submitFeedback(formData);
      if (response && response.status === 'success') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Reset fields
      } else {
        throw new Error(response.message || 'فشلت عملية الإرسال.');
      }
    } catch (err) {
      console.error('[Contact Page Error]:', err);
      setErrorText(err.message || 'تعذر الاتصال بالخادم لإرسال الرسالة. يرجى المحاولة لاحقاً.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex justify-center">
      <div className="w-full max-w-2xl animate-slide-up">
        
        {/* Header Text */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-800">تواصل معنا</h2>
          <p className="text-gray-500 font-semibold mt-2 text-sm sm:text-base">
            يسعدنا استقبال مقترحاتكم واستفساراتكم الفنية حول المشروع والتعاون الأكاديمي أو الطبي.
          </p>
        </div>

        {/* Contact Box Card */}
        <div className="glass-card rounded-3xl p-8 shadow-xl border border-white">
          
          {/* Status Alerts */}
          {submitStatus === 'success' && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 animate-slide-up">
              <i className="fa-solid fa-circle-check text-lg"></i>
              <span>تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا وسنقوم بالرد قريباً.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 animate-slide-up">
              <i className="fa-solid fa-circle-xmark text-lg"></i>
              <span>{errorText}</span>
            </div>
          )}

          {/* Form inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label for="name" className="block text-xs sm:text-sm font-bold text-slate-600 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <i className="fa-solid fa-user text-sm"></i>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكريم"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all font-cairo"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label for="email" className="block text-xs sm:text-sm font-bold text-slate-600 mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
              <div className="relative font-poppins">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <i className="fa-solid fa-envelope text-sm"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all text-right font-semibold"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label for="message" className="block text-xs sm:text-sm font-bold text-slate-600 mb-2">نص الرسالة <span className="text-red-500">*</span></label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك أو مقترحك هنا بالتفصيل..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all font-cairo"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all hover:scale-[1.01] btn-animate flex items-center justify-center gap-2 text-sm sm:text-base font-cairo disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                  إرسال الرسالة
                </>
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};
