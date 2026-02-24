import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerAccount } from '../../features/auth/services/authApi';
import SignupForm from '../../features/auth/components/SignupForm/SignupForm';
import AuthLogo from '../../features/auth/components/Authlogo/Authlogo';
import '../../features/auth/styles/SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleRegister = (userData) => {
    try {
      console.log('Registering user:', userData);
      
      // Prepare full user data with password for storage
      const fullUserData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // Store password for login validation
        firstName: userData.firstName,
        lastName: userData.lastName,
        dob: userData.dob,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        createdAt: new Date().toISOString()
      };
      
      // Register account in localStorage
      registerAccount(fullUserData);
      
      // Log the user in after successful registration (without password in context)
      const { password, ...userWithoutPassword } = fullUserData;
      login(userWithoutPassword);
      
      console.log('Registration successful');
      
      // Navigate to profile setup page
      navigate('/profile-setup');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <SignupForm onRegister={handleRegister} />
          {error && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
        </div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default SignupPage;
