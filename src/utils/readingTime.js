// Reading time estimation utility
// Based on average reading speed of 200 words per minute

export const calculateReadingTime = (text) => {
  if (!text || typeof text !== 'string') {
    return { minutes: 0, words: 0 };
  }

  // Remove HTML tags and extra whitespace
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Count words (split by whitespace and filter empty strings)
  const words = cleanText.split(' ').filter(word => word.length > 0).length;
  
  // Calculate reading time (200 words per minute average)
  const minutes = Math.ceil(words / 200);
  
  return {
    minutes: Math.max(1, minutes), // Minimum 1 minute
    words,
    text: minutes === 1 ? '1 min read' : `${minutes} min read`
  };
};

export const formatReadingTime = (minutes) => {
  if (minutes <= 1) return '1 min read';
  return `${minutes} min read`;
};

// Calculate reading time for multiple sections
export const calculateTotalReadingTime = (sections) => {
  const totalWords = sections.reduce((acc, section) => {
    const { words } = calculateReadingTime(section);
    return acc + words;
  }, 0);
  
  const totalMinutes = Math.ceil(totalWords / 200);
  return {
    minutes: Math.max(1, totalMinutes),
    words: totalWords,
    text: formatReadingTime(totalMinutes)
  };
}; 