import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setConnected(true);
      if (user) {
        socket.emit('authenticate', { userId: user._id, role: user.role });
      }
    });

    socket.on('disconnect', () => setConnected(false));

    // Real-time events
    socket.on('complaint:new', (complaint) => {
      addNotification({ type: 'complaint', message: `New complaint from Room ${complaint.roomNumber}`, priority: complaint.priority, id: complaint._id });
      if (['admin','manager','front_desk'].includes(user?.role)) {
        toast(`🔔 New complaint: Room ${complaint.roomNumber} - ${complaint.type}`, { duration: 5000 });
      }
    });

    socket.on('complaint:escalated', (data) => {
      addNotification({ type: 'escalation', message: `Auto-escalated: Room ${data.roomNumber}`, priority: 'high', id: data.complaint._id });
      toast.error(`⚡ Complaint escalated: Room ${data.roomNumber}`, { duration: 6000 });
    });

    socket.on('emergency:alert', (data) => {
      addNotification({ type: 'emergency', message: `🚨 EMERGENCY: ${data.type} in Room ${data.roomNumber}`, priority: 'emergency', id: data.complaintId });
      toast.error(`🚨 EMERGENCY ALERT: Room ${data.roomNumber}`, { duration: 10000 });
    });

    socket.on('task:created', (task) => {
      if (task.assignedTo?._id === user?._id || task.assignedTo === user?._id) {
        addNotification({ type: 'task', message: `New task assigned: ${task.title}`, priority: task.priority });
        toast(`📋 New task: ${task.title}`, { duration: 4000 });
      }
    });

    socket.on('housekeeping:task_needed', (data) => {
      if (['housekeeping','manager','admin'].includes(user?.role)) {
        toast(`🧹 Room ${data.roomNumber} needs cleaning (${data.priority} priority)`, { duration: 5000 });
      }
    });

    return () => { socket.disconnect(); };
  }, [user]);

  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, timestamp: new Date(), read: false }, ...prev.slice(0, 49)]);
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearNotifications = () => setNotifications([]);

  return (
    <SocketContext.Provider value={{
      socket: socketRef.current,
      connected,
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      markAllRead,
      clearNotifications,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
