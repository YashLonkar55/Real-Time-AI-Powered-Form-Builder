import { motion } from 'framer-motion';

const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className={`${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
            </span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;