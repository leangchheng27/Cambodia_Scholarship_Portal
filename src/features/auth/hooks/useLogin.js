// src/features/auth/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authApi';
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
      const user = await login({ email, password });
      
      // Update AuthContext with user data
      loginContext(user);
      
      console.log('Login successful:', user);
      
      // Navigate to home page
      navigate('/home');
      
      return user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
