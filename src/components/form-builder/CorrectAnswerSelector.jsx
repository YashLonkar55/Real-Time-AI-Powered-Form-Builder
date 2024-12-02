import React from 'react';

const CorrectAnswerSelector = ({ type, options, correctAnswer = '', onChange, isGraded }) => {
	if (!isGraded) return null;

	switch (type) {
		case 'radio':
		case 'select':
			return (
				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Correct Answer
					</label>
					<select
						value={correctAnswer || ''} // Ensure correctAnswer is a scalar value
						onChange={(e) => onChange(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					>
						<option value="">Select correct option</option>
						{options.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			);

		case 'checkbox':
			return (
				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Correct Answer(s)
					</label>
					{options.map((option, index) => (
						<div key={index} className="flex items-center mt-2">
							<input
								type="checkbox"
								checked={Array.isArray(correctAnswer) && correctAnswer.includes(option)} // Safeguard correctAnswer
								onChange={(e) => {
									const newCorrectAnswers = e.target.checked
										? [...correctAnswer, option]
										: correctAnswer.filter(answer => answer !== option);
									onChange(newCorrectAnswers);
								}}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label className="ml-2 block text-sm text-gray-900">
								{option}
							</label>
						</div>
					))}
				</div>
			);

		default:
			return null;
	}
};

export default CorrectAnswerSelector;
