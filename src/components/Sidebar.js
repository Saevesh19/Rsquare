import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleLabels = {
  admin: 'Administrator',
  manager: 'Hotel Manager',
  front_desk: 'Front Desk',
  housekeeping: 'Housekeeping',
  maintenance: 'Maintenance',
  kitchen: 'Kitchen Staff',
  room_service: 'Room Service',
};

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '⊞', roles: ['admin','manager','front_desk','housekeeping','maintenance','kitchen','room_service'] },
  { path: '/rooms', label: 'Rooms', icon: '⬡', roles: ['admin','manager','front_desk'] },
  { path: '/complaints', label: 'Complaints', icon: '⚠', roles: ['admin','manager','front_desk','maintenance','housekeeping'] },
  { path: '/housekeeping', label: 'Housekeeping', icon: '✦', roles: ['admin','manager','front_desk','housekeeping'] },
  { path: '/tasks', label: 'My Tasks', icon: '◈', roles: ['admin','manager','front_desk','housekeeping','maintenance','kitchen','room_service'] },
  { path: '/orders', label: 'Food & Orders', icon: '◉', roles: ['admin','manager','front_desk','kitchen','room_service'] },
  { path: '/staff', label: 'Staff', icon: '◑', roles: ['admin','manager','front_desk'] },
  { path: '/analytics', label: 'Analytics', icon: '◲', roles: ['admin','manager'] },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const allowedNav = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-mark">H</div>
          <div className="logo-text">
            <span className="logo-name">HospiFlow</span>
            <span className="logo-tagline">Operations Suite</span>
          </div>
        </div>

        {/* User info */}
        <div className="sidebar-user">
          <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          <div className="user-info">
            <div className="user-name truncate">{user?.name}</div>
            <div className="user-role">{roleLabels[user?.role] || user?.role}</div>
          </div>
          <div className="online-dot" title="Online" />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {allowedNav.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">⏻</span>
            <span className="nav-label">Sign Out</span>
          </button>
        </div>
      </aside>

      <style>{`
        .sidebar-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 98;
          display: none;
        }
        .sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: var(--sidebar-width);
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 99;
          transition: transform 0.3s ease;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px 20px;
          border-bottom: 1px solid var(--border);
        }
        .logo-mark {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          flex-shrink: 0;
        }
        .logo-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 17px;
          display: block;
          line-height: 1.1;
        }
        .logo-tagline {
          font-size: 11px;
          color: var(--text-muted);
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .user-avatar {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent), #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          color: #fff;
          flex-shrink: 0;
        }
        .user-name { font-size: 14px; font-weight: 600; }
        .user-role { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .online-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--success);
          position: absolute; right: 20px; top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 6px var(--success);
        }
        .sidebar-nav {
          flex: 1;
          padding: 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition);
          background: none;
          border: none;
          text-decoration: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .nav-item:hover { color: var(--text-primary); background: var(--bg-surface); }
        .nav-item.active { color: var(--accent); background: var(--accent-glow); font-weight: 600; }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
        .sidebar-footer { padding: 12px; border-top: 1px solid var(--border); }
        .logout-btn:hover { color: var(--danger) !important; background: var(--danger-bg) !important; }

        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .sidebar-overlay { display: block; }
        }
      `}</style>
    </>
  );
}
