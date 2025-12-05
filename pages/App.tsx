import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import UniversityDetail from './UniversityDetail';
import Compare from './Compare';
import CalculatorPage from './CalculatorPage';
import MapPage from './MapPage';
import ChatPage from './ChatPage';
import AdminDashboard from './AdminDashboard';
import { AuthProvider } from '../context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-background-light font-display text-slate-900">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/university/:id" element={<UniversityDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;