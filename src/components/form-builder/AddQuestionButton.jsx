import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddQuestionButton = ({ onAddElement }) => {
	const [isOpen, setIsOpen] = useState(false);

	const questionTypes = [
		{ type: 'text', label: 'Text Input', icon: '✍️' },
		{ type: 'textarea', label: 'Long Text', icon: '📝' },
		{ type: 'radio', label: 'Multiple Choice', icon: '⭕' },
		{ type: 'checkbox', label: 'Checkboxes', icon: '☑️' },
		{ type: 'select', label: 'Dropdown', icon: '▼' },
	];

	return (
		<div className="relative flex justify-center my-6">
			<div 
				className="relative"
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							className="absolute bottom-16 -left-20 bg-white rounded-lg shadow-xl p-2 w-48 z-50"
						>
							{questionTypes.map(({ type, label, icon }) => (
								<button
									key={type}
									onClick={() => onAddElement(type)}
									className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors duration-150 flex items-center space-x-2"
								>
									<span>{icon}</span>
									<span>{label}</span>
								</button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</motion.button>
			</div>
		</div>
	);
};

export default AddQuestionButton;