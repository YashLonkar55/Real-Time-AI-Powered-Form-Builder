import { v4 as uuidv4 } from 'uuid';

export const saveForms = (forms) => {
  localStorage.setItem('forms', JSON.stringify(forms));
};

export const getForms = () => {
  const forms = localStorage.getItem('forms');
  return forms ? JSON.parse(forms) : [];
};

export const saveForm = (form) => {
  const forms = getForms();
  const newForm = {
    ...form,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    status: 'active',
    responses: 0
  };
  forms.push(newForm);
  saveForms(forms);
  return newForm;
};