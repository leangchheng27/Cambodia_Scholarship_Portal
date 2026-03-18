import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getUsers, getAdminUniversities, getAdminScholarships, getAdminInternships, deleteUser, deleteItem, updateItem, createItem } from './adminApi';
import AIAnalytics from './AIAnalytics';
import cspLogo from '../assets/logo.png';
import LoadingText from '../../components/ui/LoadingText/LoadingText.jsx';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [cambodiaScholarships, setCambodiaScholarships] = useState([]);
    const [abroadScholarships, setAbroadScholarships] = useState([]);
    const [scholarshipType, setScholarshipType] = useState('cambodia');
    const [internships, setInternships] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentItem, setCurrentItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [universityPage, setUniversityPage] = useState(1);
    const [scholarshipPage, setScholarshipPage] = useState(1);
    const [internshipPage, setInternshipPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const navigate = useNavigate();

    const makePagination = (page, setPage, total) => {
        const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
        if (totalPages <= 1) return null;
        return (
            <div className="pagination-controls">
                {page > 1 && (
                    <button onClick={() => setPage(1)} className="pagination-btn">First</button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(n => n <= 2 || n > totalPages - 2 || Math.abs(n - page) <= 1)
                    .reduce((acc, n, idx, arr) => {
                        if (idx > 0 && arr[idx - 1] !== n - 1)
                            acc.push(<span key={`e-${n}`} className="pagination-ellipsis">...</span>);
                        acc.push(
                            <button key={n} onClick={() => setPage(n)}
                                className={`pagination-btn ${page === n ? 'active' : ''}`}>{n}</button>
                        );
                        return acc;
                    }, [])}
                {page < totalPages && (
                    <button onClick={() => setPage(totalPages)} className="pagination-btn">Last</button>
                )}
            </div>
        );
    };

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const [statsRes, usersRes, universitiesRes, scholarshipsRes, internshipsRes] = await Promise.all([
                getDashboardStats(),
                getUsers(),
                getAdminUniversities(),
                getAdminScholarships(),
                getAdminInternships(),
            ]);

            setStats(statsRes.stats);
            setUsers(usersRes.users);
            setUniversities(universitiesRes.universities || []);
            setCambodiaScholarships(scholarshipsRes.cambodia || []);
            setAbroadScholarships(scholarshipsRes.abroad || []);
            setInternships(internshipsRes.internships || []);
            console.log('universities:', universitiesRes.universities?.length);
            console.log('cambodia:', scholarshipsRes.cambodia?.length);
            console.log('abroad:', scholarshipsRes.abroad?.length);
            console.log('internships:', internshipsRes.internships?.length);
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

    // Reset pages when switching tabs or scholarship type
    useEffect(() => { setUniversityPage(1); setScholarshipPage(1); setInternshipPage(1); }, [activeTab]);
    useEffect(() => { setScholarshipPage(1); }, [scholarshipType]);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteUser(userId);
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
            await deleteItem(type, id);
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
            const endpoint = activeTab;
            
            if (currentItem) {
                await updateItem(endpoint, currentItem.id, data);
            } else {
                await createItem(endpoint, data);
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
        return (
            <div className="admin-loading">
                <LoadingText text="Loading dashboard data..." />
            </div>
        );
    }

    if (error) {
        return <div className="admin-error">{error}</div>;
    }

    const pageTitle = { dashboard: 'Dashboard', users: 'Users', universities: 'Universities', scholarships: 'Scholarships', internships: 'Internships' };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <img src={cspLogo} alt="CSP Logo" className="sidebar-logo" />
                    <span className="sidebar-title">CSP Admin</span>
                </div>

                <nav className="sidebar-nav">
                    <p className="nav-section-label">GENERAL</p>
                    <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <span className="nav-icon">📊</span> Dashboard
                    </button>

                    <p className="nav-section-label">MANAGEMENT</p>
                    <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                        <span className="nav-icon">👥</span> Users
                    </button>
                    <button className={`nav-item ${activeTab === 'universities' ? 'active' : ''}`} onClick={() => setActiveTab('universities')}>
                        <span className="nav-icon">🏫</span> Universities
                    </button>
                    <button className={`nav-item ${activeTab === 'scholarships' ? 'active' : ''}`} onClick={() => setActiveTab('scholarships')}>
                        <span className="nav-icon">🎓</span> Scholarships
                    </button>
                    <button className={`nav-item ${activeTab === 'internships' ? 'active' : ''}`} onClick={() => setActiveTab('internships')}>
                        <span className="nav-icon">💼</span> Internships
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sidebar-logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <h2 className="topbar-title">{pageTitle[activeTab]}</h2>
                    </div>
                    <div className="topbar-right">
                        <span className="topbar-admin-badge">Admin</span>
                    </div>
                </header>

                <div className="admin-content">

                    {/* Dashboard: stats + AI Analytics */}
                    {activeTab === 'dashboard' && (
                        <>
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
                            <AIAnalytics />
                        </>
                    )}
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
                                    .sort((a, b) => a.id - b.id)
                                    .slice(
                                        (currentPage - 1) * ITEMS_PER_PAGE,
                                        currentPage * ITEMS_PER_PAGE
                                    )
                                    .map((user, idx) => (
                                        <tr key={user.id}>
                                            <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
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
                    
                    {makePagination(currentPage, setCurrentPage, users.length)}
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
                                    <th>Original Link</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities
                                    .slice((universityPage - 1) * ITEMS_PER_PAGE, universityPage * ITEMS_PER_PAGE)
                                    .map((university, idx) => (
                                        <tr key={university.id}>
                                            <td>{(universityPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                            <td>{university.name}</td>
                                            <td>{university.location || 'N/A'}</td>
                                            <td>{university.original_link || university.website || 'N/A'}</td>
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
                    {makePagination(universityPage, setUniversityPage, universities.length)}
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
                    <div className="scholarship-tabs">
                        <button 
                            className={`tab-btn ${scholarshipType === 'cambodia' ? 'active' : ''}`}
                            onClick={() => setScholarshipType('cambodia')}
                        >
                            Cambodia ({cambodiaScholarships.length})
                        </button>
                        <button 
                            className={`tab-btn ${scholarshipType === 'abroad' ? 'active' : ''}`}
                            onClick={() => setScholarshipType('abroad')}
                        >
                            Abroad ({abroadScholarships.length})
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Funded By</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(scholarshipType === 'cambodia' ? cambodiaScholarships : abroadScholarships)
                                    .slice((scholarshipPage - 1) * ITEMS_PER_PAGE, scholarshipPage * ITEMS_PER_PAGE)
                                    .map((scholarship, idx) => (
                                        <tr key={scholarship.id}>
                                            <td>{(scholarshipPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                            <td>{scholarship.name}</td>
                                            <td><span className="type-badge">{scholarship.type}</span></td>
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
                    {makePagination(scholarshipPage, setScholarshipPage,
                        (scholarshipType === 'cambodia' ? cambodiaScholarships : abroadScholarships).length)}
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
                                {internships
                                    .slice((internshipPage - 1) * ITEMS_PER_PAGE, internshipPage * ITEMS_PER_PAGE)
                                    .map((internship, idx) => (
                                        <tr key={internship.id}>
                                            <td>{(internshipPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                            <td>{internship.name}</td>
                                            <td>{internship.funded_by || 'N/A'}</td>
                                            <td>{internship.course_duration || 'N/A'}</td>
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
                    {makePagination(internshipPage, setInternshipPage, internships.length)}
                </div>
            )}

                </div>{/* /admin-content */}
            </div>{/* /admin-main */}

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
                                        name="original_link" 
                                        placeholder="Original Link"
                                        defaultValue={currentItem?.original_link || currentItem?.website || ''}
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
                                    <select 
                                        name="type" 
                                        defaultValue={currentItem?.type || 'cambodia'}
                                        required
                                    >
                                        <option value="cambodia">Cambodia</option>
                                        <option value="abroad">Abroad</option>
                                    </select>
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
                                        name="original_link" 
                                        placeholder="Original Link"
                                        defaultValue={currentItem?.original_link || currentItem?.registration_link || ''}
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
                                        name="original_link" 
                                        placeholder="Original Link"
                                        defaultValue={currentItem?.original_link || currentItem?.registration_link || ''}
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
