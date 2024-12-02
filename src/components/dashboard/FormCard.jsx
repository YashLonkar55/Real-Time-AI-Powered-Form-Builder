import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FormCard = ({ form }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          form.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {form.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{form.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{form.responses}</span> responses
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">{form.lastActive}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/form/${form.id}/edit`} className="text-indigo-600 hover:text-indigo-800">
            Edit
          </Link>
          <Link to={`/form/${form.id}/responses`} className="text-indigo-600 hover:text-indigo-800">
            View Responses
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FormCard;