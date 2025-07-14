// Analytics utility functions
export const trackEvent = (action, category, label = '', value = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

export const trackPageView = (page_title, page_location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: page_title,
      page_location: page_location
    });
  }
};

export const trackOutboundLink = (url, label = '') => {
  trackEvent('click', 'outbound_link', label || url);
};

export const trackDownload = (filename, category = 'download') => {
  trackEvent('download', category, filename);
};

export const trackScroll = (percentage) => {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackEvent('scroll', 'engagement', `${percentage}%`);
  }
};

export const trackTimeOnPage = (seconds) => {
  if (seconds === 30 || seconds === 60 || seconds === 120 || seconds === 300) {
    trackEvent('timing', 'engagement', `${seconds}s`);
  }
}; 