import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { useAuth } from './context/AuthContext.jsx';
import './App.css';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/login" replace />;
  return children;
};

const AdminApp = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/*"
      element={
        <AdminRoute>
          <DashboardPage />
        </AdminRoute>
      }
    />
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
