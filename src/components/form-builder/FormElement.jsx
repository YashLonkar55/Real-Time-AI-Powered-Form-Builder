import { motion } from 'framer-motion';
import { Draggable } from '@hello-pangea/dnd';
import ElementContent from './ElementContent';

const FormElement = ({ element, index, onUpdate }) => {
  const handleTitleChange = (e) => {
    onUpdate(element.id, { ...element, title: e.target.value });
  };

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-sm p-4 mb-4"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <input
                type="text"
                className="text-lg font-medium w-full border-none focus:ring-0"
                value={element.title}
                onChange={handleTitleChange}
                placeholder="Question Title"
              />
              <div className="mt-2">
                <ElementContent element={element} onUpdate={onUpdate} />
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600"
                onClick={() => onUpdate(element.id, { ...element, required: !element.required })}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={element.required}
                onChange={() => onUpdate(element.id, { ...element, required: !element.required })}
              />
              <span className="ml-2">Required</span>
            </label>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default FormElement;