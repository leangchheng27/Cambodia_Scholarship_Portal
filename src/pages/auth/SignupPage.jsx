import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SignupForm from '../../features/auth/components/SignupForm/SignupForm';
import AuthLogo from '../../features/auth/components/Authlogo/Authlogo';
import '../../features/auth/styles/SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = (userData) => {
    // Register the user (in a real app, this would call an API)
    console.log('Registering user:', userData);
    
    // Log the user in after successful registration
    login({
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
    
    // Navigate to profile setup page
    navigate('/profile-setup');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left"><SignupForm onRegister={handleRegister} /></div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default SignupPage;
