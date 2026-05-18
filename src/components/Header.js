import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const { connected, notifications, unreadCount, markAllRead, clearNotifications } = useSocket();
  const [showNotifs, setShowNotifs] = useState(false);

  const priorityColors = {
    emergency: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#64748b',
    complaint: '#3b82f6',
    escalation: '#f59e0b',
    task: '#10b981',
  };

  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle sidebar">
        <span>☰</span>
      </button>

      <div className="header-title">
        <span className="breadcrumb">{window.location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}</span>
      </div>

      <div className="header-actions">
        {/* Connection status */}
        <div className={`conn-badge ${connected ? 'conn-live' : 'conn-offline'}`}>
          <span className="conn-dot" />
          <span>{connected ? 'Live' : 'Offline'}</span>
        </div>

        {/* Notifications */}
        <div className="notif-wrapper relative">
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) markAllRead(); }}
            aria-label="Notifications"
          >
            <span style={{ fontSize: 18 }}>🔔</span>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
          </button>

          {showNotifs && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span className="font-semibold">Notifications</span>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm" onClick={clearNotifications}>Clear</button>
                  <button className="btn-close" onClick={() => setShowNotifs(false)}>✕</button>
                </div>
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">No notifications</div>
                ) : (
                  notifications.slice(0, 10).map((n, i) => (
                    <div key={i} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                      <div className="notif-dot" style={{ background: priorityColors[n.type] || priorityColors[n.priority] || '#3b82f6' }} />
                      <div className="notif-content">
                        <div className="notif-msg">{n.message}</div>
                        <div className="notif-time">{new Date(n.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User pill */}
        <div className="user-pill">
          <div className="header-avatar">{user?.name?.charAt(0)}</div>
          <span className="user-pill-name">{user?.name?.split(' ')[0]}</span>
        </div>
      </div>

      <style>{`
        .header {
          height: 64px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 16px;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .menu-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 20px;
          padding: 8px;
          border-radius: var(--radius-sm);
          display: none;
          cursor: pointer;
        }
        .menu-btn:hover { color: var(--text-primary); background: var(--bg-surface); }
        .header-title { flex: 1; }
        .breadcrumb {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: capitalize;
        }
        .header-actions { display: flex; align-items: center; gap: 12px; }
        .conn-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid transparent;
        }
        .conn-live { background: var(--success-bg); color: var(--success); border-color: rgba(16,185,129,0.2); }
        .conn-offline { background: var(--danger-bg); color: var(--danger); border-color: rgba(239,68,68,0.2); }
        .conn-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s infinite;
        }
        .notif-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          background: var(--bg-card);
          border: 1px solid var(--border-hover);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          z-index: 200;
          animation: fadeIn 0.2s ease;
        }
        .notif-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }
        .btn-close { background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 14px; padding: 4px; }
        .notif-list { max-height: 360px; overflow-y: auto; }
        .notif-empty { padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px; }
        .notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          transition: background var(--transition);
        }
        .notif-item:last-child { border-bottom: none; }
        .notif-item.unread { background: var(--bg-surface); }
        .notif-item:hover { background: var(--bg-surface); }
        .notif-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .notif-msg { font-size: 13px; line-height: 1.4; }
        .notif-time { font-size: 11px; color: var(--text-muted); margin-top: 3px; }
        .user-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px 6px 6px;
          border-radius: 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
        }
        .header-avatar {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent), #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 13px; color: #fff;
        }
        .user-pill-name { font-size: 13px; font-weight: 600; }
        @media (max-width: 768px) {
          .menu-btn { display: block; }
          .conn-badge span:last-child { display: none; }
          .user-pill-name { display: none; }
        }
      `}</style>
    </header>
  );
}
