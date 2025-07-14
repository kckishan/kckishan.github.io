
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { FaGithub, FaLinkedin, FaGlobe, FaSun, FaMoon, FaArrowUp, FaBars, FaTimes, FaEnvelope, FaTwitter } from 'react-icons/fa';
import experienceData from './experienceData';
import publicationData from './publicationData';
import ExperienceCard from './components/ExperienceCard';
import PublicationCard from './components/PublicationCard';
import LazyImage from './components/LazyImage';
import ErrorBoundary from './components/ErrorBoundary';
import { calculateTotalReadingTime } from './utils/readingTime';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showOtherPublications, setShowOtherPublications] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Remove publicationSearch and publicationFilter state
  // Remove filterPublications function

  // Just use all featured and regular publications
  const featuredPublications = publicationData.filter(pub => pub.featured);
  const regularPublications = publicationData.filter(pub => !pub.featured);
  
  // Calculate total reading time for all abstracts
  const allAbstracts = publicationData.filter(pub => pub.abstract).map(pub => pub.abstract);
  const totalReadingTime = calculateTotalReadingTime(allAbstracts);
  


  // Theme persistence effect
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 300);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
      
      // Track active section
      const sections = ['about', 'experience', 'publications'];
      const sectionElements = sections.map(id => ({
        id,
        element: document.getElementById(id === 'publications' ? 'featured-publications' : id),
      })).filter(item => item.element);

      let currentSection = 'about';
      for (const { id, element } of sectionElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
      
      // Track scroll depth for analytics
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(progress);
        
        if (window.gtag && (scrollPercentage === 25 || scrollPercentage === 50 || scrollPercentage === 75 || scrollPercentage === 100)) {
          window.gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `${scrollPercentage}%`,
            value: scrollPercentage
          });
        }
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    // Simulate loading states
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        {/* Sticky Navigation */}
        <nav 
          className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Scroll Progress Bar */}
          <div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
            aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
            title={`Reading progress: ${Math.round(scrollProgress)}%`}
          />
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <h1 
                  className="text-xl font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2 py-1"
                  onClick={scrollToTop}
                  onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
                  tabIndex="0"
                  role="button"
                  aria-label="Go to top of page"
                >
                  Kishan KC
                </h1>
                <div className="hidden md:flex space-x-6" role="menubar">
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2 relative ${
                      activeSection === 'about' 
                        ? 'text-primary font-semibold' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                    role="menuitem"
                    aria-label="Navigate to About section"
                    aria-current={activeSection === 'about' ? 'page' : undefined}
                  >
                    About
                    {activeSection === 'about' && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </button>
                  <button 
                    onClick={() => scrollToSection('experience')} 
                    className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2 relative ${
                      activeSection === 'experience' 
                        ? 'text-primary font-semibold' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                    role="menuitem"
                    aria-label="Navigate to Experience section"
                    aria-current={activeSection === 'experience' ? 'page' : undefined}
                  >
                    Experience
                    {activeSection === 'experience' && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </button>
                  <button 
                    onClick={() => scrollToSection('featured-publications')} 
                    className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2 relative ${
                      activeSection === 'publications' 
                        ? 'text-primary font-semibold' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                    role="menuitem"
                    aria-label="Navigate to Publications section"
                    aria-current={activeSection === 'publications' ? 'page' : undefined}
                  >
                    Publications
                    {activeSection === 'publications' && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-pressed={darkMode}
                >
                  {darkMode ? <FaSun className="text-yellow-500 text-lg md:text-base" /> : <FaMoon className="text-gray-600 text-lg md:text-base" />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {mobileMenuOpen ? <FaTimes className="text-gray-600 dark:text-gray-300 text-lg" /> : <FaBars className="text-gray-600 dark:text-gray-300 text-lg" />}
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 dark:border-gray-700"
                role="menu"
                aria-label="Mobile navigation menu"
              >
                <div className="py-4 space-y-1">
                  <button 
                    onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }} 
                    className={`block w-full text-left px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg mx-2 touch-manipulation ${
                      activeSection === 'about' 
                        ? 'text-primary font-semibold bg-primary/10' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                    role="menuitem"
                    aria-label="Navigate to About section"
                    aria-current={activeSection === 'about' ? 'page' : undefined}
                  >
                    About
                  </button>
                  <button 
                    onClick={() => { scrollToSection('experience'); setMobileMenuOpen(false); }} 
                    className={`block w-full text-left px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg mx-2 touch-manipulation ${
                      activeSection === 'experience' 
                        ? 'text-primary font-semibold bg-primary/10' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                    role="menuitem"
                    aria-label="Navigate to Experience section"
                    aria-current={activeSection === 'experience' ? 'page' : undefined}
                  >
                    Experience
                  </button>
                  <button 
                    onClick={() => { scrollToSection('featured-publications'); setMobileMenuOpen(false); }} 
                    className={`block w-full text-left px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg mx-2 touch-manipulation ${
                      activeSection === 'publications' 
                        ? 'text-primary font-semibold bg-primary/10' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                    }`}
                    role="menuitem"
                    aria-label="Navigate to Publications section"
                    aria-current={activeSection === 'publications' ? 'page' : undefined}
                  >
                    Publications
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        <main role="main">
          <ErrorBoundary sectionName="About section">
            <section id="about" className="py-20 max-w-5xl mx-auto px-6" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-3xl font-bold text-center mb-10 text-primary">About Me</h2>
            <div className="flex flex-col md:flex-row items-start gap-10">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <LazyImage
                  src="/assets/profile.jpg"
                  alt="Kishan KC"
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary"
                  placeholder={
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center border-4 border-primary">
                      <span className="text-4xl">👨‍💻</span>
                    </div>
                  }
                />
              </div>
              <motion.div className="flex-1 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Role & Education Highlight */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                      <span className="text-blue-600 dark:text-blue-300 text-2xl">👨‍💼</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Current Role & Education</h3>
                      <p className="text-blue-700 dark:text-blue-300">
                        - Senior Applied Scientist at Amazon
                      </p>
                      <p className="text-blue-700 dark:text-blue-300">
                        - Ph.D. in Computing and Information Sciences from Rochester Institute of Technology
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivation Highlight */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-800 p-3 rounded-full">
                      <span className="text-orange-600 dark:text-orange-300 text-2xl">💡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">What Drives Me</h3>
                      <p className="text-orange-700 dark:text-orange-300">
                        Motivated by applying AI to practical problems and communicating complex concepts in a clear, accessible way.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Research Focus Highlight */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
                      <span className="text-purple-600 dark:text-purple-300 text-2xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Research Focus</h3>
                      <p className="text-purple-700 dark:text-purple-300 mb-3">
                        I specialize in Natural Language Processing (NLP), Generative AI, Multimodal Large Language Models, and Information Retrieval.
                      </p>
                      <p className="text-purple-700 dark:text-purple-300">
                        My research focuses on designing algorithms/solutions for generative multimodal question answering and multimodal search systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact & Achievements Highlight */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                      <span className="text-green-600 dark:text-green-300 text-2xl">🏆</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Impact & Achievements</h3>
                      <p className="text-green-700 dark:text-green-300">
                        Published multiple research papers that advance the state of Machine Learning, NLP and generative AI. Bridged experimentation and real-world deployment, turning large-scale data into reliable, production-ready solutions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Expertise Section */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Technical Expertise</h3>
                  
                  {/* AI/ML Research */}
                <div className="space-y-3">
                    <h4 className="font-medium text-base text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <span className="text-blue-600 dark:text-blue-400">🤖</span>
                      AI/ML Research & Development
                    </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Generative AI</span>
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Multimodal LLMs</span>
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Multimodal Information Retrieval</span>
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Context Engineering</span>
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Retrieval-Augmented Generation</span>
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Question-Answering Systems</span>
                    </div>
                  </div>

                  {/* Machine Learning */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-base text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <span className="text-purple-600 dark:text-purple-400">🧠</span>
                      Machine Learning & Neural Networks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">Deep Learning</span>
                      <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">Graph Neural Networks</span>
                      <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">Bayesian Methods</span>
                      <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">Probabilistic ML</span>
                    </div>
                  </div>
                  
                  {/* Programming & Tools */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-base text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <span className="text-orange-600 dark:text-orange-400">⚡</span>
                      Programming & Technical Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">Python</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">PyTorch</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">TensorFlow</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">Hugging Face</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">Scikit-learn</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">NumPy/Pandas</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">AWS</span>
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">Git</span>
                    </div>
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="mailto:kishankhatrichettri@gmail.com"
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-2xl transition-colors duration-200"
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href="https://twitter.com/kishan_kc07"
                    target="_blank"
                    rel="noopener"
                    className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 text-2xl transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://scholar.google.co.uk/citations?user=pNQVEMUAAAAJ"
                    target="_blank"
                    rel="noopener"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-2xl transition-colors duration-200"
                    aria-label="Google Scholar"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/kckishan"
                    target="_blank"
                    rel="noopener"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kishankc"
                    target="_blank"
                    rel="noopener"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-2xl transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>                  
                </div>
              </motion.div>
            </div>
          </section>
          </ErrorBoundary>



          <ErrorBoundary sectionName="Experience section">
            <section id="experience" className="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="text-3xl font-bold text-center mb-12 text-experience">Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Professional experience">
              {experienceData.map((exp, index) => (
                <div key={index} role="listitem">
                <ExperienceCard 
                  {...exp} 
                  isCurrent={index === 0}
                />
                </div>
              ))}
            </div>
          </section>
          </ErrorBoundary>
          
                    <ErrorBoundary sectionName="Publications section">
            {/* No search/filter UI, just show publications below */}
            {/* Featured Publications Section */}
            <section id="featured-publications" className="py-8 px-6 max-w-6xl mx-auto" aria-labelledby="featured-publications-heading">
              <h2 id="featured-publications-heading" className="text-3xl font-bold text-center mb-4 text-publication">Featured Publications</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Highlights of my most impactful research contributions
              </p>
            
                          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {isLoading ? (
                  // Loading skeletons for featured publications
                  [1, 2, 3].map((i) => (
                    <div key={`loading-featured-${i}`} className="h-full border-2 border-yellow-200 dark:border-yellow-600 rounded-xl shadow-lg">
                      <PublicationCard key={`loading-featured-card-${i}`} isLoading={true} />
                    </div>
                  ))
                ) : featuredPublications.length > 0 ? (
                  featuredPublications.map((pub, index) => (
                <motion.div
                      key={`featured-${pub.title || index}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Enhanced publication card */}
                      <div className="h-full border-2 border-yellow-200 dark:border-yellow-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <PublicationCard 
                          key={`featured-card-${pub.title || index}-${index}`}
                          {...pub} 
                          abstract={pub.abstract}
                          isLoading={false}
                        />
                      </div>
                </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No featured publications found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms or filters</p>
                  </div>
                )}
              </div>
          </section>
          
          {/* Other Publications Toggle Button */}
          {regularPublications.length > 0 && (
            <div className="text-center py-10">
              <button
                onClick={() => setShowOtherPublications(!showOtherPublications)}
                className="bg-publication hover:bg-purple-800 dark:hover:bg-purple-600 text-white font-medium px-8 py-4 md:px-6 md:py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg touch-manipulation text-base md:text-sm"
              >
                {showOtherPublications ? "Hide Other Publications" : "View Other Publications"}
              </button>
            </div>
          )}

          {/* Other Publications Section */}
          {showOtherPublications && (
            <section id="publications" className="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="other-publications-heading">
              <h2 id="other-publications-heading" className="text-3xl font-bold text-center mb-12 text-publication">Other Publications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Additional research publications">
                {regularPublications.length > 0 ? (
                  regularPublications.map((pub, index) => (
                    <motion.div
                      key={`regular-${pub.title || index}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      role="listitem"
                    >
                      <PublicationCard 
                        key={`regular-card-${pub.title || index}-${index}`}
                        {...pub} 
                        abstract={pub.abstract}
                        isLoading={false}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No other publications found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms or filters</p>
                  </div>
                )}
              </div>
            </section>
            )}
          </ErrorBoundary>
        </main>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-primary text-white p-4 md:p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 z-50 touch-manipulation"
            aria-label="Back to top of page"
            title="Back to top"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
              }
            }}
          >
            <FaArrowUp className="text-xl md:text-lg" aria-hidden="true" />
          </motion.button>
        )}

        <footer className="text-center py-10 border-t dark:border-gray-700">
          <p className="text-sm">© 2025 Kishan KC • All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
