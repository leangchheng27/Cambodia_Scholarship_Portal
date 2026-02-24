import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  
  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  // Persist profile to localStorage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('profile');
    }
  }, [profile]);
  
  const login = (u) => setUser(u);
  
  const logout = () => {
    setUser(null);
    setProfile(null);
  };
  
  const updateProfile = (profileData) => {
    console.log("AuthContext - Updating profile with:", profileData);
    console.log("AuthContext - Current profile before update:", profile);
    console.log("AuthContext - Current user before update:", user);
    
    const newProfile = { ...profile, ...profileData };
    setProfile(newProfile);
    
    // Also merge profile data into user object
    if (user) {
      const newUser = { ...user, ...profileData };
      setUser(newUser);
      console.log("AuthContext - New user after update:", newUser);
    }
    
    console.log("AuthContext - New profile after update:", newProfile);
  };
  
  return (
    <AuthContext.Provider value={{ user, profile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
