import { Draggable } from '@hello-pangea/dnd';
import ElementContent from './ElementContent';
import CorrectAnswerSelector from './CorrectAnswerSelector';

const FormElement = ({ element, index, onUpdate, showGrading, correctAnswerSelector }) => {
  const handleChange = (field, value) => {
    onUpdate(element.id, { ...element, [field]: value });
  };




  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-sm p-4 mb-4"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <input
                type="text"
                className="text-lg font-medium w-full border-none focus:ring-0"
                value={element.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Question Title"
              />
                <div className="mt-2">
                <ElementContent 
                  element={element} 
                  onUpdate={onUpdate}
                  showGrading={showGrading}
                />
                </div>
                {['radio', 'select', 'checkbox'].includes(element.type) && (
                <CorrectAnswerSelector
                  type={element.type}
                  options={element.options}
                  correctAnswer={element.correctAnswer}
                  isGraded={element.isGraded}
                  onChange={(newCorrectAnswer) => {
                  handleChange('correctAnswer', newCorrectAnswer);
                  }}
                />
                )}
            </div>
            <div className="ml-4 flex items-center space-x-2">
              {showGrading && (
                <button
                  className={`px-3 py-1 rounded ${
                    element.isGraded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleChange('isGraded', !element.isGraded)}
                >
                  {element.isGraded ? 'Graded' : 'Not Graded'}
                </button>
              )}
              <button 
                className="p-2 text-gray-400 hover:text-gray-600"
                onClick={() => handleChange('required', !element.required)}
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
                onChange={() => handleChange('required', !element.required)}
              />
              <span className="ml-2">Required</span>
            </label>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default FormElement;