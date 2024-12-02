import { motion } from 'framer-motion';

const ElementTypes = ({ onAddElement }) => {
  const elementTypes = [
    { type: 'text', label: 'Text Field', icon: 'M12 4v16m8-8H4' },
    { type: 'textarea', label: 'Text Area', icon: 'M4 6h16M4 12h16m-7 6h7' },
    { type: 'radio', label: 'Multiple Choice', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { type: 'checkbox', label: 'Checkboxes', icon: 'M5 13l4 4L19 7' },
    { type: 'select', label: 'Dropdown', icon: 'M19 9l-7 7-7-7' },
    { type: 'scale', label: 'Rating Scale', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 right-8 flex flex-col space-y-2"
    >
      {elementTypes.map(({ type, label, icon }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddElement(type)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 group relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ElementTypes;