// Admin dashboard page
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const API = axios.create({
                baseURL: 'http://localhost:3000/api',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const [statsRes, usersRes] = await Promise.all([
                API.get('/admin/dashboard'),
                API.get('/admin/users')
            ]);

            setStats(statsRes.data.stats);
            setUsers(usersRes.data.users);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError('Failed to load dashboard data');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh data
            fetchDashboardData();
        } catch (err) {
            alert('Failed to delete user: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return <div className="admin-loading">Loading...</div>;
    }

    if (error) {
        return <div className="admin-error">{error}</div>;
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            {stats && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p className="stat-number">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Verified Users</h3>
                        <p className="stat-number">{stats.verifiedUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Unverified Users</h3>
                        <p className="stat-number">{stats.unverifiedUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Admins</h3>
                        <p className="stat-number">{stats.totalAdmins}</p>
                    </div>
                </div>
            )}

            <div className="users-section">
                <h2>All Users</h2>
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Verified</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name || 'N/A'}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.isVerified ? 'verified' : 'unverified'}`}>
                                            {user.isVerified ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {user.role !== 'admin' && (
                                            <button 
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
