import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForms } from '../utils/formStorage';

const FormResponsesPage = () => {
	const { formId } = useParams();
	const [form, setForm] = useState(null);

	useEffect(() => {
		const forms = getForms();
		const selectedForm = forms.find(f => f.id === formId);
		setForm(selectedForm);
	}, [formId]);

	if (!form) {
		return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-2xl font-bold text-gray-900 mb-4">Responses for {form.title}</h1>
			<div className="bg-white shadow rounded-lg p-6">
				{/* Add response display logic here */}
				<p className="text-gray-600">No responses yet</p>
			</div>
		</div>
	);
};

export default FormResponsesPage;