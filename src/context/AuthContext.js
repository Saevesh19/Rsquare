import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hospiflow_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const savedUser = localStorage.getItem('demo_user');

  if (savedUser && token) {
    setUser(JSON.parse(savedUser));
  }

  setLoading(false);

}, [token]);
  const fetchMe = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/me`);
      setUser(res.data.user);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {

  const demoUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@hospiflow.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Manager User',
      email: 'manager@hospiflow.com',
      password: 'manager123',
      role: 'manager'
    },
    {
      id: 3,
      name: 'Front Desk',
      email: 'frontdesk@hospiflow.com',
      password: 'front123',
      role: 'front_desk'
    },
    {
      id: 4,
      name: 'Housekeeping',
      email: 'housekeeping@hospiflow.com',
      password: 'housekeeping123',
      role: 'housekeeping'
    },
    {
      id: 5,
      name: 'Maintenance',
      email: 'maintenance@hospiflow.com',
      password: 'maintenance123',
      role: 'maintenance'
    },
    {
      id: 6,
      name: 'Kitchen User',
      email: 'kitchen@hospiflow.com',
      password: 'kitchen123',
      role: 'kitchen'
    },

  ];

  const foundUser = demoUsers.find(
    user =>
      user.email === email &&
      user.password === password
  );

  if (foundUser) {

    const fakeToken = 'demo-token-123';

    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    };

    localStorage.setItem('hospiflow_token', fakeToken);

    setToken(fakeToken);
    setUser(userData);
    localStorage.setItem('demo_user', JSON.stringify(userData));

    toast.success(`Welcome back, ${userData.name}!`);

    return {
      success: true,
      user: userData
    };

  } else {

    toast.error('Invalid credentials');

    return {
      success: false,
      error: 'Invalid credentials'
    };

  }
};

  const logout = async () => {
    try {
      if (token) await axios.post(`${API_BASE}/auth/logout`);
    } catch {}
    localStorage.removeItem('hospiflow_token');
    localStorage.removeItem('demo_user');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export { API_BASE };
