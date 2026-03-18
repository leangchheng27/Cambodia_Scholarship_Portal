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
      
      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        // For regular users, check if they have any profile data
        const savedProfile = localStorage.getItem('profile');
        
        if (savedProfile) {
          // If profile exists, parse and check it has meaningful data
          try {
            const profile = JSON.parse(savedProfile);
            console.log('Existing profile found:', profile);
            
            // If profile has any meaningful data, go to homepage
            // This allows existing users to access the site
            if (profile && (profile.profileType || profile.grades || profile.studentType)) {
              console.log('Profile has data, redirecting to homepage');
              navigate('/home');
            } else {
              console.log('Profile exists but empty, redirecting to setup');
              navigate('/profile-setup');
            }
          } catch (e) {
            console.error('Error parsing profile:', e);
            navigate('/profile-setup');
          }
        } else {
          // No profile at all - definitely new user
          console.log('No profile found, redirecting to setup');
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
