import { motion } from 'framer-motion';

const FormHeader = ({ title, description, onTitleChange, onDescriptionChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <input
        type="text"
        className="text-3xl font-bold w-full border-none focus:ring-0"
        placeholder="Form Title"
        value={title}
        onChange={onTitleChange}
      />
      <input
        type="text"
        className="text-gray-600 w-full mt-2 border-none focus:ring-0"
        placeholder="Form Description"
        value={description}
        onChange={onDescriptionChange}
      />
    </motion.div>
  );
};

export default FormHeader;