import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormPreviewPage from './pages/FormPreviewPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<FormBuilderPage />} />
          <Route path="/preview/:formId" element={<FormPreviewPage />} />
          <Route path="/analytics/:formId" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;