import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForms } from '../utils/formStorage';

const FormPreviewPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (formId === 'draft') {
      const previewForm = JSON.parse(localStorage.getItem('previewForm'));
      setForm(previewForm);
    } else {
      const forms = getForms();
      const selectedForm = forms.find(f => f.id === formId);
      setForm(selectedForm);
    }
  }, [formId]);

  if (!form) {
    return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{form.title}</h1>
        {form.description && (
          <p className="text-gray-600 mb-6">{form.description}</p>
        )}

        <div className="space-y-6">
          {form.elements.map((element) => (
            <div key={element.id} className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {element.title}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {element.type === 'text' && (
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your answer"
                  disabled
                />
              )}

              {element.type === 'textarea' && (
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your answer"
                  disabled
                />
              )}

              {element.type === 'radio' && (
                <div className="space-y-2 mt-2">
                  {element.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        name={element.id}
                        disabled
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label className="ml-3 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {element.type === 'checkbox' && (
                <div className="space-y-2 mt-2">
                  {element.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        disabled
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label className="ml-3 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {element.type === 'select' && (
                <select
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select an option</option>
                  {element.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPreviewPage;