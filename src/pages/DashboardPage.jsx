import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import FormCard from '../components/dashboard/FormCard';
import QuickStats from '../components/dashboard/QuickStats';
import { getForms } from '../utils/formStorage';

const DashboardPage = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const handleViewForm = (form) => {
    localStorage.setItem('previewForm', JSON.stringify(form));
    navigate(`/form/${form.id}/responses`);
  };



  useEffect(() => {
    const savedForms = getForms();
    setForms(savedForms);
  }, []);

  const stats = [
    { title: 'Total Forms', value: forms.length, trend: 0 },
    { title: 'Total Responses', value: forms.reduce((acc, form) => acc + form.responses, 0), trend: 0 },
    { title: 'Active Forms', value: forms.filter(form => form.status === 'active').length, trend: 0 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/create"
          className="btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Form
        </Link>
      </div>

      <QuickStats stats={stats} />

      {forms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
          <p className="text-gray-500 mb-4">Create your first form to get started</p>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Form
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forms.map(form => (
            <FormCard 
              key={form.id} 
              form={form} 
              onView={() => handleViewForm(form)}
            />
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;