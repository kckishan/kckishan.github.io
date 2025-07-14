import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaGithub, FaQuoteLeft, FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaCopy, FaCheck, FaClock } from 'react-icons/fa';
import LazyImage from './LazyImage';
import { calculateReadingTime } from '../utils/readingTime';

function PublicationCard({ 
  image, 
  title, 
  authors, 
  venue, 
  year, 
  paperLink, 
  bibtexLink, 
  codeLink, 
  citeText,
  abstract = '',
  isLoading = false 
}) {
  // Create a more robust unique ID using multiple fields
  const createUniqueId = () => {
    const titlePart = title ? title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 20) : 'untitled';
    const authorPart = authors ? authors.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 10) : 'unknown';
    const yearPart = year || 'unknown';
    return `${titlePart}-${authorPart}-${yearPart}`;
  };
  
  const publicationId = createUniqueId();
  const [showAbstract, setShowAbstract] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [copied, setCopied] = useState(false);

  const trackEvent = (action, label) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: 'Publications',
        event_label: label
      });
    }
  };

  const handlePaperClick = () => {
    trackEvent('view_paper', title);
    if (!linkError) {
      window.open(paperLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleLinkError = () => {
    setLinkError(true);
  };

  const generateCitation = () => {
    // Generate APA-style citation
    const currentYear = new Date().getFullYear();
    const accessDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `${authors} (${year}). ${title}. ${venue}${paperLink ? `. Retrieved ${accessDate}, from ${paperLink}` : ''}`;
  };

  const handleCopyCitation = async () => {
    try {
      const citation = generateCitation();
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      trackEvent('copy_citation', title);
      
      // Reset copy state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateCitation();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse h-full flex flex-col">
        <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-6 space-y-3 flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex gap-2 mt-4">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white dark:bg-gray-800 border border-publication shadow-sm hover:shadow-md rounded-lg overflow-hidden h-full flex flex-col"
      role="article"
      aria-labelledby={`paper-title-${publicationId}`}
    >
      <div className="h-48 bg-white dark:bg-gray-800 flex items-center justify-center relative">
        {image && !imageError ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={image}
              alt={`Research paper: ${title}`}
              className="max-w-full max-h-full object-contain transition-opacity duration-300"
              onError={handleImageError}
              loading="lazy"
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
              style={{ opacity: 0 }}
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{venue}</p>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative z-10 bg-white dark:bg-gray-800">
        <h3 
          id={`paper-title-${publicationId}`}
          className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 min-h-[3.5rem] flex items-start"
          title={title}
        >
          {title}
        </h3>

        {/* Abstract Toggle Button */}
        {abstract && (
          <button
            onClick={() => {
              trackEvent('abstract_toggle', title);
              setShowAbstract(!showAbstract);
            }}
            className="mb-3 text-sm text-publication hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center gap-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded px-2 py-1"
            aria-expanded={showAbstract}
            aria-controls={`abstract-${publicationId}`}
            title={showAbstract ? "Hide abstract" : "Show abstract"}
          >
            <span>Abstract</span>
            {showAbstract ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </button>
        )}

        {/* Expandable Abstract */}
        <AnimatePresence>
          {showAbstract && abstract && (
            <motion.div
              id={`abstract-${publicationId}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              role="region"
              aria-label="Paper abstract"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {abstract}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p
          className="text-sm text-gray-600 dark:text-gray-300 italic mb-3 flex-1"
          dangerouslySetInnerHTML={{
            __html: authors.replace(/Kishan KC/g, "<strong>Kishan KC</strong>")
          }}
        />
        <p className="text-sm text-publication font-semibold mb-4">{venue}, {year}</p>
        
        <div className="flex gap-2 mt-auto">
          {linkError ? (
            <div className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 md:p-3 rounded-lg text-center text-sm">
              Link unavailable
            </div>
          ) : (
            <button
              onClick={handlePaperClick}
              onError={handleLinkError}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-4 md:p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation"
            title="View Paper"
              aria-label={`View paper: ${title}`}
          >
            <FaFileAlt className="text-lg" />
              <FaExternalLinkAlt className="text-xs" />
            </button>
          )}
          
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-4 md:p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation"
              title="View Code"
              aria-label={`View code for: ${title}`}
              onClick={() => trackEvent('view_code', title)}
            >
              <FaGithub className="text-lg" />
              <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
          
          {/* Copy Citation Button */}
          <button
            onClick={handleCopyCitation}
            className={`bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-4 md:p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation ${
              copied ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : ''
            }`}
            title={copied ? "Citation copied!" : "Copy citation"}
            aria-label={`Copy citation for: ${title}`}
          >
            {copied ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
          </button>
          
          {citeText && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(citeText);
                trackEvent('copy_citation', title);
                // You could add a toast notification here
              }}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
              title="Copy Citation"
              aria-label={`Copy citation for: ${title}`}
            >
              <FaQuoteLeft className="text-lg" />
            </button>
          )}
          
          {bibtexLink && (
            <a
              href={bibtexLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              title="BibTeX"
              aria-label={`Download BibTeX for: ${title}`}
              onClick={() => trackEvent('download_bibtex', title)}
            >
              <span className="text-sm font-mono">BibTeX</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PublicationCard;