import { motion } from 'framer-motion';

const PreviewFormElement = ({ element }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {element.title}
        {element.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput(element)}
    </motion.div>
  );
};

const renderInput = (element) => {
  switch (element.type) {
    case 'text':
      return (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your answer"
        />
      );
    case 'textarea':
      return (
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="4"
          placeholder="Your answer"
        />
      );
    default:
      return null;
  }
};

export default PreviewFormElement;