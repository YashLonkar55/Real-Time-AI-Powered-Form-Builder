import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import FormElement from '../components/form-builder/FormElement';
import CorrectAnswerSelector from '../components/form-builder/CorrectAnswerSelector';
import FormHeader from '../components/form-builder/FormHeader';
import { saveForm, getForms } from '../utils/formStorage';
import FloatingAddButton from '../components/form-builder/FloatingAddButton';

const FormBuilderPage = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formElements, setFormElements] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (formId) {
      const forms = getForms();
      const existingForm = forms.find(f => f.id === formId);
      if (existingForm) {
        setFormTitle(existingForm.title);
        setFormDescription(existingForm.description);
        setFormElements(existingForm.elements);
      }
    }
  }, [formId]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormElements(items);
  };

  const updateElement = (id, updatedElement) => {
    setFormElements(elements =>
      elements.map(element =>
        element.id === id ? updatedElement : element
      )
    );
  };

  const addNewElement = (type) => {
    const newElement = {
      id: String(Date.now()),
      type,
      title: '',
      required: false,
      value: '',
      options: type === 'radio' || type === 'checkbox' || type === 'select' 
        ? ['Option 1', 'Option 2', 'Option 3']
        : [],
      correctAnswer: type === 'checkbox' ? [] : '',
      isGraded: false
    };
    setFormElements([...formElements, newElement]);
  };

  const handleSave = async () => {
    if (!formTitle) {
      alert('Please add a title to your form');
      return;
    }

    setIsSaving(true);
    const formData = {
      id: formId || String(Date.now()),
      title: formTitle,
      description: formDescription,
      elements: formElements.map(element => ({
        ...element,
        // Only include correctAnswer if the question is graded
        correctAnswer: element.isGraded ? element.correctAnswer : undefined
      })),
      createdAt: formId ? undefined : new Date().toISOString(),
      responses: 0,
      isQuiz: formElements.some(element => element.isGraded) // Add flag to indicate if form is a quiz
    };

    try {
      await saveForm(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (!formTitle) {
      alert('Please add a title to your form');
      return;
    }

    const formData = {
      title: formTitle,
      description: formDescription,
      elements: formElements
    };
    localStorage.setItem('previewForm', JSON.stringify(formData));
    navigate('/preview/draft');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {formId ? 'Edit Form' : 'Create Form'}
        </h1>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePreview}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Preview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Form'}
          </motion.button>
        </div>
      </div>

      <FormHeader
        title={formTitle}
        description={formDescription}
        onTitleChange={(e) => setFormTitle(e.target.value)}
        onDescriptionChange={(e) => setFormDescription(e.target.value)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="form-elements">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {formElements.map((element, index) => (
                <FormElement
                  key={element.id}
                  element={element}
                  index={index}
                  onUpdate={updateElement}
                  showGrading={true}
                  correctAnswerSelector={
                  <CorrectAnswerSelector
                    type={element.type}
                    options={element.options}
                    correctAnswer={element.correctAnswer}
                    isGraded={element.isGraded}
                    onChange={(newCorrectAnswer) => {
                    updateElement(element.id, {
                      ...element,
                      correctAnswer: newCorrectAnswer
                    });
                    }}
                  />
                  }
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <FloatingAddButton onAddElement={addNewElement} />
    </div>
  );
};

export default FormBuilderPage;