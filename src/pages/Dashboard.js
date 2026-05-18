import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

const COLORS = { emergency: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#64748b' };

function StatCard({ value, label, color, icon, sub }) {
  return (
    <div className="stat-card animate-fade">
      <div className="flex items-center justify-between">
        <div className="stat-label">{label}</div>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div className="stat-value" style={{ color: color || 'var(--text-primary)' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [data, setData] = useState(null);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [dashRes, complRes] = await Promise.all([
        axios.get(`${API_BASE}/dashboard/overview`),
        axios.get(`${API_BASE}/complaints?limit=5`),
      ]);
      setData(dashRes.data);
      setRecentComplaints(complRes.data.complaints);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const refresh = () => fetchData();
    socket.on('complaint:new', refresh);
    socket.on('complaint:updated', refresh);
    socket.on('room:updated', refresh);
    socket.on('task:updated', refresh);
    return () => {
      socket.off('complaint:new', refresh);
      socket.off('complaint:updated', refresh);
      socket.off('room:updated', refresh);
      socket.off('task:updated', refresh);
    };
  }, [socket]);

  const statusBadge = (status) => {
    const map = {
      pending: 'badge-warning', approved: 'badge-info', assigned: 'badge-accent',
      in_progress: 'badge-accent', completed: 'badge-success', verified: 'badge-success',
      declined: 'badge-danger',
    };
    return <span className={`badge ${map[status] || 'badge-default'}`}>{status?.replace('_', ' ')}</span>;
  };

  if (loading) {
    return (
      <div>
        <div className="stats-grid">
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 16 }} />)}
        </div>
      </div>
    );
  }

  const { rooms, staff, complaints, tasks, orders, avgResponseTime, weeklyComplaints } = data || {};

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Operations Dashboard</h1>
        <p className="page-subtitle">Welcome back, {user?.name} — here's the live overview</p>
      </div>

      {/* Emergency alert banner */}
      {complaints?.emergency > 0 && (
        <div className="emergency-banner animate-fade">
          <span className="priority-dot priority-emergency" />
          <strong>⚠ {complaints.emergency} active emergency complaint{complaints.emergency > 1 ? 's' : ''} require immediate attention</strong>
        </div>
      )}

      {/* Stats grid */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <StatCard value={rooms?.total || 0} label="Total Rooms" icon="⬡" />
        <StatCard value={rooms?.occupied || 0} label="Occupied" icon="◉" color="var(--accent)" sub={`${rooms?.occupancyRate || 0}% occupancy`} />
        <StatCard value={rooms?.available || 0} label="Available" icon="◎" color="var(--success)" />
        <StatCard value={rooms?.needsCleaning || 0} label="Needs Cleaning" icon="✦" color="var(--warning)" />
        <StatCard value={complaints?.pending || 0} label="Pending Complaints" icon="⚠" color="var(--warning)" />
        <StatCard value={complaints?.today || 0} label="Today's Complaints" icon="📋" />
        <StatCard value={staff?.active || 0} label="Staff On Duty" icon="◑" color="var(--success)" sub={`of ${staff?.total || 0} total`} />
        <StatCard value={tasks?.pending || 0} label="Pending Tasks" icon="◈" color={tasks?.pending > 10 ? 'var(--warning)' : undefined} />
      </div>

      <div className="two-col" style={{ marginBottom: 24 }}>
        {/* Weekly chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Complaint Trend (7 days)</h3>
            <span className="badge badge-default">Weekly</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
            {(weeklyComplaints || []).map((day, i) => {
              const max = Math.max(...(weeklyComplaints || []).map(d => d.count), 1);
              const h = Math.max((day.count / max) * 100, 4);
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{day.count}</div>
                  <div style={{ width: '100%', height: h + '%', minHeight: 4, background: i === 6 ? 'var(--accent)' : 'var(--bg-surface)', borderRadius: 4, border: '1px solid var(--border)', transition: 'height 0.5s ease' }} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{day.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick metrics */}
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Live Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Avg Response Time', value: `${avgResponseTime || 0} min`, bar: Math.min((avgResponseTime || 0) / 30 * 100, 100), color: avgResponseTime > 10 ? 'var(--warning)' : 'var(--success)' },
              { label: 'Task Completion Rate', value: `${tasks?.total ? Math.round((tasks.completedToday / tasks.total) * 100) : 0}%`, bar: tasks?.total ? (tasks.completedToday / tasks.total) * 100 : 0, color: 'var(--success)' },
              { label: 'Room Occupancy', value: `${rooms?.occupancyRate || 0}%`, bar: rooms?.occupancyRate || 0, color: 'var(--accent)' },
              { label: 'Pending Orders', value: orders?.pending || 0, bar: Math.min((orders?.pending || 0) * 10, 100), color: 'var(--warning)' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between" style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.value}</span>
                </div>
                <div style={{ height: 5, background: 'var(--bg-surface)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${m.bar}%`, background: m.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent complaints */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Recent Complaints</h3>
          <a href="/complaints" className="btn btn-ghost btn-sm">View All →</a>
        </div>
        {recentComplaints.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <div>No complaints right now</div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentComplaints.map(c => (
                  <tr key={c._id}>
                    <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>{c.complaintId}</span></td>
                    <td><strong>Room {c.roomNumber}</strong>{c.guestName && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.guestName}</div>}</td>
                    <td><span className="badge badge-default">{c.type}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={`priority-dot priority-${c.priority}`} />
                        <span style={{ fontSize: 13, color: COLORS[c.priority] }}>{c.priority}</span>
                      </div>
                    </td>
                    <td>{statusBadge(c.status)}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .emergency-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--danger-bg);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          margin-bottom: 20px;
          color: var(--danger);
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
