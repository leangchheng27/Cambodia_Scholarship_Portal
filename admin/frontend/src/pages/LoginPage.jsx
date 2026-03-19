import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call main backend for auth (shares same DB)
      const response = await axios.post('http://localhost:3000/auth/login', { 
        email, 
        password 
      });
      const { token, user } = response.data;

      // Check if user is admin
      if (user.role !== 'admin') {
        setError('Only admin users can access this portal');
        setLoading(false);
        return;
      }

      login({ token, ...user });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="auth-title">Admin Login</h1>
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
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <a href="#forgot" className="forgot-link">Forgot Password ?</a>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
        {error && <div className="form-error">{error}</div>}
      </form>
      <div className="muted-text">Admin Access Only</div>
    </AuthLayout>
  );
};

export default LoginPage;
