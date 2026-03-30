// src/features/auth/hooks/useLogin.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../services/authApi';
import { useAuth } from '../../../context/AuthContext';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = (() => {
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');
    return redirect && redirect.startsWith('/') ? redirect : null;
  })();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await login({ email, password });
      
      // Update AuthContext with user data and token
      loginContext({ ...user, token });

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return user;
      }
      
      console.log('Login successful:', user);
      console.log('User profileType:', user.profileType);
      console.log('User role:', user.role);
      console.log('User grades:', user.grades);
      console.log('User academicType:', user.academicType);
      console.log('User educationLevel:', user.educationLevel);
      
      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        // Check if user has profile data (backward compatible with existing users)
        // New users need profileType, existing users may only have grades/academicType/etc
        const hasProfileData = user.profileType || 
                               user.grades || 
                               user.academicType || 
                               user.universityField || 
                               user.studentType || 
                               user.educationLevel;
        
        if (hasProfileData) {
          console.log('✅ User profile complete in database, redirecting to homepage');
          navigate('/home');
        } else {
          console.log('⚠️ New user without profile, redirecting to setup');
          navigate('/profile-setup');
        }
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
    loginWithGoogle(redirectPath);
  };

  return { handleLogin, handleGoogleLogin, loading, error };
}
