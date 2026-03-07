import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import AuthLogo from '../components/Authlogo/Authlogo';
import '../styles/loginPage.css';

const LoginLayout = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left"><LoginForm /></div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default LoginLayout;
