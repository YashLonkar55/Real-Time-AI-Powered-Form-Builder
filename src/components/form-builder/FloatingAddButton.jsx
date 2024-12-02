import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingAddButton = ({ onAddElement }) => {
	const [isOpen, setIsOpen] = useState(false);

	const questionTypes = [
		{ type: 'text', label: 'Text Input' },
		{ type: 'textarea', label: 'Long Text' },
		{ type: 'radio', label: 'Multiple Choice' },
		{ type: 'checkbox', label: 'Checkboxes' },
		{ type: 'select', label: 'Dropdown' },
	];

	return (
		<div className="fixed bottom-8 right-8">
			<div className="relative">
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-2 w-48"
						>
							{questionTypes.map(({ type, label }) => (
								<button
									key={type}
									onClick={() => {
										onAddElement(type);
										setIsOpen(false);
									}}
									className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors duration-150"
								>
									{label}
								</button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setIsOpen(!isOpen)}
					onBlur={() => setTimeout(() => setIsOpen(false), 200)}
					className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8"
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

export default FloatingAddButton;