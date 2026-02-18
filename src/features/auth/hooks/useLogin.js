// src/features/auth/hooks/useLogin.js
import { useState } from 'react';
import { login } from '../services/authApi';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const user = await login({ email, password });
      // You can handle user state or context here
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
