import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormPreviewPage from './pages/FormPreviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import FormResponsesPage from './pages/FormResponsesPage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<FormBuilderPage />} />
          <Route path="/form/:formId/edit" element={<FormBuilderPage />} />
          <Route path="/preview/:formId" element={<FormPreviewPage />} />
          <Route path="/analytics/:formId" element={<AnalyticsPage />} />
          <Route path="/form/:formId/responses" element={<FormResponsesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;