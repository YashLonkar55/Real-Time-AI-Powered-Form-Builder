import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PreviewFormElement from '../components/form-preview/PreviewFormElement';

const FormPreviewPage = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (formId === 'draft') {
      const previewData = localStorage.getItem('previewForm');
      if (previewData) {
        setFormData(JSON.parse(previewData));
      }
    }
  }, [formId]);

  if (!formData) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
        <p className="text-gray-600 mb-8">{formData.description}</p>

        <form onSubmit={(e) => e.preventDefault()}>
          {formData.elements.map((element) => (
            <PreviewFormElement key={element.id} element={element} />
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FormPreviewPage;