import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left: Login Form */}
        <div className="auth-left">
          <h1 className="auth-title">Login</h1>
          <button className="social-btn"><span className="icon">🌐</span> Continue with Google</button>
          <button className="social-btn secondary">Continue with Phone Number</button>
          <div className="divider-row">
            <div className="line" />
            <span className="or-text">OR</span>
            <div className="line" />
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Ratan Asinike"
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
                placeholder="************"
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
