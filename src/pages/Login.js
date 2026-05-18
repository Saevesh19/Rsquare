import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@hospiflow.com', password: 'admin123', color: '#ef4444' },
  { label: 'Manager', email: 'manager@hospiflow.com', password: 'manager123', color: '#f59e0b' },
  { label: 'Front Desk', email: 'frontdesk@hospiflow.com', password: 'frontdesk123', color: '#3b82f6' },
  { label: 'Housekeeping', email: 'housekeeping@hospiflow.com', password: 'house123', color: '#10b981' },
  { label: 'Maintenance', email: 'maintenance@hospiflow.com', password: 'maint123', color: '#8b5cf6' },
  { label: 'Kitchen', email: 'kitchen@hospiflow.com', password: 'kitchen123', color: '#f97316' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) navigate('/dashboard');
  };

  const fillDemo = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-container">
        <div className="login-left">
          <div className="hero-logo">
            <div className="hero-mark">H</div>
            <div>
              <div className="hero-name">HospiFlow</div>
              <div className="hero-sub">Real-Time Hotel Operations</div>
            </div>
          </div>
          <h1 className="hero-heading">Smarter hotel<br />operations, <span className="accent-text">live</span></h1>
          <p className="hero-desc">
            Centralized management for front desk, housekeeping, maintenance, and staff — all in real time.
          </p>
          <div className="hero-stats">
            {[['100%','Digital workflows'],['2min','Auto-escalation'],['Real-time','Task tracking']].map(([v,l]) => (
              <div key={l} className="hero-stat">
                <div className="hero-stat-value">{v}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <div className="login-card-header">
              <h2>Sign In</h2>
              <p>Access the operations dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@hospiflow.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <div className="demo-section">
              <div className="demo-label">Quick demo login</div>
              <div className="demo-grid">
                {DEMO_ACCOUNTS.map(acc => (
                  <button
                    key={acc.label}
                    className="demo-btn"
                    onClick={() => fillDemo(acc)}
                    type="button"
                    style={{ '--demo-color': acc.color }}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }
        .login-bg {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        .login-container {
          display: flex;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          align-items: center;
          padding: 40px;
          gap: 60px;
          position: relative;
          z-index: 1;
        }
        .login-left { flex: 1; }
        .hero-logo { display: flex; align-items: center; gap: 14px; margin-bottom: 48px; }
        .hero-mark {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-weight: 800; font-size: 24px; color: #fff;
        }
        .hero-name { font-family: var(--font-display); font-weight: 800; font-size: 20px; }
        .hero-sub { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .hero-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .accent-text { color: var(--accent); }
        .hero-desc { color: var(--text-secondary); font-size: 15px; line-height: 1.7; max-width: 400px; margin-bottom: 40px; }
        .hero-stats { display: flex; gap: 32px; }
        .hero-stat-value { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--accent); }
        .hero-stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .login-right { width: 400px; flex-shrink: 0; }
        .login-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 36px;
        }
        .login-card-header { margin-bottom: 28px; }
        .login-card-header h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; }
        .login-card-header p { color: var(--text-secondary); font-size: 14px; margin-top: 4px; }
        .login-form { display: flex; flex-direction: column; gap: 20px; margin-bottom: 28px; }
        .demo-section { border-top: 1px solid var(--border); padding-top: 20px; }
        .demo-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; font-weight: 600; }
        .demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .demo-btn {
          padding: 8px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition);
        }
        .demo-btn:hover {
          background: rgba(var(--demo-color), 0.1);
          color: var(--demo-color);
          border-color: var(--demo-color);
        }
        @media (max-width: 768px) {
          .login-container { flex-direction: column; padding: 24px 16px; gap: 32px; }
          .login-left { order: 2; }
          .login-right { order: 1; width: 100%; }
          .hero-stats { display: none; }
        }
      `}</style>
    </div>
  );
}
