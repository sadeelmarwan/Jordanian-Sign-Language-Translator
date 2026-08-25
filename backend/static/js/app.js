/**
 * Jordanian Sign Language Translator - Main React App Container
 * =============================================================
 * Resolves pages and layouts. Mounts components dynamically using ReactDOM 18.
 */

function App() {
  // Navigation State
  const [activePage, setActivePage] = React.useState('home');

  // Load components from the global JSL_APP namespace
  const Navbar = window.JSL_APP.components.Navbar;
  const Footer = window.JSL_APP.components.Footer;

  // Load pages from the global JSL_APP namespace
  const Home = window.JSL_APP.pages.Home;
  const LiveTranslation = window.JSL_APP.pages.LiveTranslation;
  const About = window.JSL_APP.pages.About;
  const Contact = window.JSL_APP.pages.Contact;

  // Render the current active page
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'translate':
        return <LiveTranslation />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-cairo">
      
      {/* Top Navigation Header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page View Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

     {/* Bottom Layout Footer */}
      <Footer setActivePage={setActivePage} />
      
    </div>
  );
}

// Bootstrap and mount React 18 Application
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
