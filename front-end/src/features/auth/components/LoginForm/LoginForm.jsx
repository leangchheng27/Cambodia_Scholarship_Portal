import React, { useState } from 'react';
import './LoginForm.css';
import { useLogin } from '../../hooks/useLogin';
import { Link, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const signupTarget = location.search ? `/signup${location.search}` : '/signup';

  const { handleLogin, handleGoogleLogin, loading, error } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  return (
    <>
      <h1 className="auth-title">Login</h1>
      <button 
        type="button" 
        className="social-btn" 
        onClick={handleGoogleLogin}
      >
        <span className="icon">🌐</span> Continue with Google
      </button>
      <div className="divider-row">
        <div className="line" />
        <span className="or-text">OR</span>
        <div className="line" />
      </div>
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <Link to="/forgot-password" className="forgot-link">Forgot Password ?</Link>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="form-error">{error}</div>}
      </form>
      <div className="muted-text">Don't Have Account? <Link to={signupTarget}>Sign up</Link></div>
    </>
  );
};

export default LoginForm;