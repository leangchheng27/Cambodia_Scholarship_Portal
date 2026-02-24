import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  
  const login = (u) => setUser(u);
  const logout = () => {
    setUser(null);
    setProfile(null);
  };
  const updateProfile = (profileData) => {
    setProfile({ ...profile, ...profileData });
    // Also merge profile data into user object
    if (user) {
      setUser({ ...user, ...profileData });
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, profile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
