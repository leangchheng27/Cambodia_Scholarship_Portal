import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { useAuth } from './context/AuthContext.jsx';
import UniversityPage from './pages/UniversityPage.jsx';
import UniversityDetailPage from './pages/UniversityDetailPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/university" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/universities/:id" element={<UniversityDetailPage />} />
          <Route path="*" element={<Navigate to="/university" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;