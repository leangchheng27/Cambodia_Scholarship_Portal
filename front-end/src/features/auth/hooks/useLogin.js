// src/features/auth/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../services/authApi';
import { useAuth } from '../../../context/AuthContext';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await login({ email, password });
      
      // Update AuthContext with user data and token
      loginContext({ ...user, token });
      
      console.log('Login successful:', user);
      
      // Check if profile is completed, if not redirect to profile setup
      const savedProfile = localStorage.getItem('profile');
      if (!savedProfile) {
        navigate('/profile-setup');
      } else {
        navigate('/home');
      }
      
      return user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return { handleLogin, handleGoogleLogin, loading, error };
}
