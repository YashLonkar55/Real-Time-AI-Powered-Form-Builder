const ElementContent = ({ element, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate(element.id, { ...element, value: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(element.options || [])];
    newOptions[index] = value;
    onUpdate(element.id, { ...element, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(element.options || []), ''];
    onUpdate(element.id, { ...element, options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = element.options.filter((_, i) => i !== index);
    onUpdate(element.id, { ...element, options: newOptions });
  };

  const renderOptions = () => (
    <div className="space-y-2">
      {element.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder={`Option ${index + 1}`}
          />
          <button
            onClick={() => removeOption(index)}
            className="text-red-500 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
      <button
        onClick={addOption}
        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
      >
        + Add Option
      </button>
    </div>
  );

  switch (element.type) {
    case 'text':
      return (
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Short answer text"
          value={element.value || ''}
          onChange={handleChange}
        />
      );
    case 'textarea':
      return (
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Long answer text"
          value={element.value || ''}
          onChange={handleChange}
          rows={4}
        />
      );
    case 'radio':
    case 'checkbox':
    case 'select':
      return renderOptions();
    case 'scale':
      return (
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            max="10"
            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={element.min || 1}
            onChange={(e) => onUpdate(element.id, { ...element, min: e.target.value })}
          />
          <span>to</span>
          <input
            type="number"
            min="1"
            max="10"
            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={element.max || 5}
            onChange={(e) => onUpdate(element.id, { ...element, max: e.target.value })}
          />
        </div>
      );
    default:
      return null;
  }
};

export default ElementContent;