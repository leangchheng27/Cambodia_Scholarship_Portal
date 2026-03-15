// Admin dashboard page
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AIAnalytics from './AIAnalytics';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [scholarships, setScholarships] = useState([]);
    const [internships, setInternships] = useState([]);
    const [activeTab, setActiveTab] = useState('users'); // users, universities, scholarships, internships, ai-analytics
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // create or edit
    const [currentItem, setCurrentItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Pagination for users
    const USERS_PER_PAGE = 15;
    const navigate = useNavigate();

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const API = axios.create({
                baseURL: 'http://localhost:3000',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const [statsRes, usersRes, universitiesRes, scholarshipsRes, internshipsRes] = await Promise.all([
                API.get('/admin/dashboard'),
                API.get('/admin/users'),
                API.get('/admin/universities'),
                API.get('/admin/scholarships'),
                API.get('/admin/internships'),
            ]);

            setStats(statsRes.data.stats);
            setUsers(usersRes.data.users);
            setUniversities(universitiesRes.data.universities);
            setScholarships(scholarshipsRes.data.scholarships);
            setInternships(internshipsRes.data.internships);
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
            await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            fetchDashboardData();
        } catch (err) {
            alert('Failed to delete user: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleDelete = async (type, id) => {
        const typeNames = {
            universities: 'university',
            scholarships: 'scholarship',
            internships: 'internship'
        };
        
        if (!window.confirm(`Are you sure you want to delete this ${typeNames[type]}?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/admin/${type}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            fetchDashboardData();
        } catch (err) {
            alert(`Failed to delete ${typeNames[type]}: ` + (err.response?.data?.error || err.message));
        }
    };

    const handleCreateOrEdit = (type, item = null) => {
        setModalType(type);
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const token = localStorage.getItem('token');
            const endpoint = activeTab;
            
            if (currentItem) {
                // Edit
                await axios.put(`http://localhost:3000/admin/${endpoint}/${currentItem.id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // Create
                await axios.post(`http://localhost:3000/admin/${endpoint}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            
            setShowModal(false);
            setCurrentItem(null);
            fetchDashboardData();
        } catch (err) {
            alert('Failed to save: ' + (err.response?.data?.error || err.message));
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
                        <h3>Total Universities</h3>
                        <p className="stat-number">{stats.totalUniversities}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Scholarships</h3>
                        <p className="stat-number">{stats.totalScholarships}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Internships</h3>
                        <p className="stat-number">{stats.totalInternships}</p>
                    </div>
                </div>
            )}

            <div className="tabs-container">
                <button 
                    className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={`tab ${activeTab === 'universities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('universities')}
                >
                    Universities
                </button>
                <button 
                    className={`tab ${activeTab === 'scholarships' ? 'active' : ''}`}
                    onClick={() => setActiveTab('scholarships')}
                >
                    Scholarships
                </button>
                <button 
                    className={`tab ${activeTab === 'internships' ? 'active' : ''}`}
                    onClick={() => setActiveTab('internships')}
                >
                    Internships
                </button>
                <button 
                    className={`tab ${activeTab === 'ai-analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ai-analytics')}
                >
                    🤖 AI Analytics
                </button>
            </div>

            {activeTab === 'users' && (
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
                                {users
                                    .sort((a, b) => a.id - b.id) // Sort by ID lowest to highest
                                    .slice(
                                        (currentPage - 1) * USERS_PER_PAGE,
                                        currentPage * USERS_PER_PAGE
                                    )
                                    .map(user => (
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
                    
                    {/* Pagination Controls */}
                    <div className="pagination-controls">
                        {currentPage > 1 && (
                            <button 
                                onClick={() => setCurrentPage(1)}
                                className="pagination-btn"
                            >
                                ← First
                            </button>
                        )}
                        
                        {Array.from({ length: Math.ceil(users.length / USERS_PER_PAGE) }, (_, i) => i + 1)
                            .filter(pageNum => {
                                // Show first 2 pages, last 2 pages, current page, and neighboring pages
                                const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
                                return (
                                    pageNum <= 2 ||
                                    pageNum > totalPages - 2 ||
                                    Math.abs(pageNum - currentPage) <= 1
                                );
                            })
                            .reduce((acc, pageNum, idx, arr) => {
                                // Add ellipsis between page ranges
                                if (idx > 0 && arr[idx - 1] !== pageNum - 1) {
                                    acc.push(
                                        <span key={`ellipsis-${pageNum}`} className="pagination-ellipsis">
                                            ...
                                        </span>
                                    );
                                }
                                acc.push(
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                                return acc;
                            }, [])}
                        
                        {currentPage < Math.ceil(users.length / USERS_PER_PAGE) && (
                            <button 
                                onClick={() => setCurrentPage(Math.ceil(users.length / USERS_PER_PAGE))}
                                className="pagination-btn"
                            >
                                Last →
                            </button>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'universities' && (
                <div className="content-section">
                    <div className="section-header">
                        <h2>Universities</h2>
                        <button onClick={() => handleCreateOrEdit('create')} className="add-btn">
                            + Add University
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Website</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities.map(university => (
                                    <tr key={university.id}>
                                        <td>{university.id}</td>
                                        <td>{university.name}</td>
                                        <td>{university.location || 'N/A'}</td>
                                        <td>{university.website || 'N/A'}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleCreateOrEdit('edit', university)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete('universities', university.id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'scholarships' && (
                <div className="content-section">
                    <div className="section-header">
                        <h2>Scholarships</h2>
                        <button onClick={() => handleCreateOrEdit('create')} className="add-btn">
                            + Add Scholarship
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Funded By</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholarships.map(scholarship => (
                                    <tr key={scholarship.id}>
                                        <td>{scholarship.id}</td>
                                        <td>{scholarship.name}</td>
                                        <td>{scholarship.funded_by || 'N/A'}</td>
                                        <td>{scholarship.course_duration || 'N/A'}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleCreateOrEdit('edit', scholarship)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete('scholarships', scholarship.id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'internships' && (
                <div className="content-section">
                    <div className="section-header">
                        <h2>Internships</h2>
                        <button onClick={() => handleCreateOrEdit('create')} className="add-btn">
                            + Add Internship
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {internships.map(internship => (
                                    <tr key={internship.id}>
                                        <td>{internship.id}</td>
                                        <td>{internship.name}</td>
                                        <td>{internship.company || 'N/A'}</td>
                                        <td>{internship.duration || 'N/A'}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleCreateOrEdit('edit', internship)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete('internships', internship.id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'ai-analytics' && (
                <AIAnalytics />
            )}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{modalType === 'create' ? 'Add' : 'Edit'} {activeTab.slice(0, -1)}</h2>
                        <form onSubmit={handleSubmitForm}>
                            {activeTab === 'universities' && (
                                <>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="University Name" 
                                        defaultValue={currentItem?.name || ''}
                                        required 
                                    />
                                    <textarea 
                                        name="description" 
                                        placeholder="Description"
                                        defaultValue={currentItem?.description || ''}
                                        rows="4"
                                    />
                                    <input 
                                        type="text" 
                                        name="location" 
                                        placeholder="Location"
                                        defaultValue={currentItem?.location || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="website" 
                                        placeholder="Website URL"
                                        defaultValue={currentItem?.website || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="poster_image_url" 
                                        placeholder="Poster Image URL"
                                        defaultValue={currentItem?.poster_image_url || currentItem?.image_url || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="slider_image_url" 
                                        placeholder="Slider Image URL"
                                        defaultValue={currentItem?.slider_image_url || ''}
                                    />
                                </>
                            )}
                            {activeTab === 'scholarships' && (
                                <>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Scholarship Name"
                                        defaultValue={currentItem?.name || ''}
                                        required 
                                    />
                                    <textarea 
                                        name="description" 
                                        placeholder="Description"
                                        defaultValue={currentItem?.description || ''}
                                        rows="4"
                                    />
                                    <input 
                                        type="text" 
                                        name="funded_by" 
                                        placeholder="Funded By"
                                        defaultValue={currentItem?.funded_by || ''}
                                    />
                                    <input 
                                        type="text" 
                                        name="course_duration" 
                                        placeholder="Course Duration"
                                        defaultValue={currentItem?.course_duration || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="registration_link" 
                                        placeholder="Registration Link"
                                        defaultValue={currentItem?.registration_link || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="poster_image_url" 
                                        placeholder="Poster Image URL"
                                        defaultValue={currentItem?.poster_image_url || currentItem?.image_url || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="slider_image_url" 
                                        placeholder="Slider Image URL"
                                        defaultValue={currentItem?.slider_image_url || ''}
                                    />
                                </>
                            )}
                            {activeTab === 'internships' && (
                                <>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Internship Name"
                                        defaultValue={currentItem?.name || ''}
                                        required 
                                    />
                                    <textarea 
                                        name="description" 
                                        placeholder="Description"
                                        defaultValue={currentItem?.description || ''}
                                        rows="4"
                                    />
                                    <input 
                                        type="text" 
                                        name="company" 
                                        placeholder="Company"
                                        defaultValue={currentItem?.company || ''}
                                    />
                                    <input 
                                        type="text" 
                                        name="duration" 
                                        placeholder="Duration"
                                        defaultValue={currentItem?.duration || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="registration_link" 
                                        placeholder="Registration Link"
                                        defaultValue={currentItem?.registration_link || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="poster_image_url" 
                                        placeholder="Poster Image URL"
                                        defaultValue={currentItem?.poster_image_url || currentItem?.image_url || ''}
                                    />
                                    <input 
                                        type="url" 
                                        name="slider_image_url" 
                                        placeholder="Slider Image URL"
                                        defaultValue={currentItem?.slider_image_url || ''}
                                    />
                                </>
                            )}
                            <div className="modal-actions">
                                <button type="submit" className="submit-btn">
                                    {modalType === 'create' ? 'Create' : 'Update'}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
