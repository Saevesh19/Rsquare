import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

import Layout from './components/layout/Layout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Complaints from './pages/Complaints';
import Housekeeping from './pages/Housekeeping';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import GuestPage from './pages/GuestPage';

import './index.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <div
          className="skeleton"
          style={{
            width: 200,
            height: 20
          }}
        ></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#131d35',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'DM Sans, sans-serif'
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff'
                }
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff'
                }
              },
            }}
          />

          <Routes>

            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >

              <Route
                index
                element={<Navigate to="/dashboard" replace />}
              />

              <Route
                path="dashboard"
                element={<Dashboard />}
              />

              <Route path="rooms" element={<Rooms />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="housekeeping" element={<Housekeeping />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="staff" element={<Staff />} />
              <Route path="orders" element={<Orders />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="/guest/:roomNumber" element={<GuestPage />} />

            </Route>

          </Routes>

        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;