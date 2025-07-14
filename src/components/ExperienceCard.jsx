import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

function ExperienceCard({ logo, title, company, location, duration, isCurrent = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative bg-white dark:bg-gray-800 border-2 rounded-xl shadow-sm hover:shadow-md p-6 text-center ${
        isCurrent 
          ? 'border-green-500 dark:border-green-400' 
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Current Role Badge */}
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Current Role
        </div>
      )}

      <LazyImage
        src={logo}
        alt={`${company} logo`}
        className="w-16 h-16 mx-auto mb-4 object-contain rounded-lg bg-white p-2 border border-gray-200 dark:border-gray-600"
        placeholder={
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
            <span className="text-2xl">🏢</span>
          </div>
        }
      />
      
      <h3 className={`text-lg font-bold mb-2 ${
        isCurrent ? 'text-green-700 dark:text-green-300' : 'text-gray-800 dark:text-gray-100'
      }`}>
        {title}
      </h3>
      
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
        {company}
      </p>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        📍 {location}
      </p>
      
      <p className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
        isCurrent 
          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}>
        {duration}
      </p>
    </motion.div>
  );
}

export default ExperienceCard;
