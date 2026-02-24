import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import SocialAuthButtons from '../components/SocialAuthButtons';
import AuthDivider from '../components/AuthDivider';
import logo from '../../../assets/Login/logo.png';
import '../styles/loginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock login - in real app this would validate credentials
    login({
      name: email.split('@')[0],
      email: email,
      phone: '+855 70 245 678',
      nationality: 'Cambodian',
      interests: ['Technology', 'AI', 'Hacking'],
      skills: ['Basic coding'],
      profileType: 'student',
    });
    
    navigate('/home');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left: Login Form */}
        <div className="auth-left">
          <h1 className="auth-title">Login</h1>
          
          <SocialAuthButtons mode="login" />
          
          <AuthDivider />
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div style={{ textAlign: "right", marginBottom: 16 }}>
              <a href="#" className="forgot-link">Forgot Password ?</a>
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
          <div className="muted-text">Don't Have Account? <Link to="/register">Sign up</Link></div>
        </div>
        {/* Right: Logo */}
        <div className="auth-right">
          <img src={logo} alt="Cambodia Scholarship Portal" className="auth-logo" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
