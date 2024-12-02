import { useState } from 'react';
import { motion } from 'framer-motion';
import ResponseChart from '../components/analytics/ResponseChart';
import ResponseTable from '../components/analytics/ResponseTable';

const AnalyticsPage = () => {
  const [chartData] = useState([
    { name: 'Monday', value: 12 },
    { name: 'Tuesday', value: 19 },
    { name: 'Wednesday', value: 15 },
    { name: 'Thursday', value: 22 },
    { name: 'Friday', value: 18 },
    { name: 'Saturday', value: 8 },
    { name: 'Sunday', value: 10 }
  ]);

  const [responses] = useState([
    {
      id: 1,
      respondent: 'John Doe',
      email: 'john@example.com',
      submissionDate: '2024-03-10 14:30',
      status: 'Complete'
    },
    {
      id: 2,
      respondent: 'Jane Smith',
      email: 'jane@example.com',
      submissionDate: '2024-03-10 15:45',
      status: 'Complete'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Form Analytics</h1>
        <button className="btn-primary">
          Export Report
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {[
          { title: 'Total Responses', value: '234', trend: '+12%' },
          { title: 'Completion Rate', value: '87%', trend: '+5%' },
          { title: 'Avg. Time to Complete', value: '4m 30s', trend: '-30s' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            <span className="text-sm text-green-600">{stat.trend}</span>
          </div>
        ))}
      </motion.div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Response Trend</h2>
        <ResponseChart data={chartData} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Responses</h2>
        <ResponseTable responses={responses} />
      </div>
    </div>
  );
};

export default AnalyticsPage;