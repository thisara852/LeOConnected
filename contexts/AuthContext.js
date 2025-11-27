import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user: currentUser } = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        await loadProfile(currentUser.id);
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async (userId) => {
    const { data } = await profileService.getProfile(userId);
    if (data) {
      setProfile(data);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await authService.signIn(email, password);
    if (data && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
      await loadProfile(data.user.id);
      return { error: null };
    }
    return { error };
  };

  const signUp = async (email, password, username) => {
    const { data, error } = await authService.signUp(email, password, username);
    if (data && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
      await loadProfile(data.user.id);
      return { error: null };
    }
    return { error };
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await profileService.updateProfile(user.id, updates);
    if (data) {
      setProfile(data);
      return { error: null };
    }
    return { error };
  };

  const value = {
    user,
    profile,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile: () => user && loadProfile(user.id),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
