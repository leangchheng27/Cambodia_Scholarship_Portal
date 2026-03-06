import React from 'react';
import '../../features/auth/styles/loginPage.css';
import LoginForm from '../../features/auth/components/LoginForm/LoginForm';
import AuthLogo from '../../features/auth/components/Authlogo/Authlogo';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left"><LoginForm /></div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default LoginPage;