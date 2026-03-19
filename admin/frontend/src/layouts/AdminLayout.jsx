import { useNavigate } from 'react-router-dom';
import cspLogo from '../../assets/logo.png';
import './AdminLayout.css';

const AdminLayout = ({ activeTab, setActiveTab, onLogout, children, pageTitle }) => {
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
                    <button 
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <span className="nav-icon">📊</span> Dashboard
                    </button>

                    <p className="nav-section-label">MANAGEMENT</p>
                    <button 
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('users')}
                    >
                        <span className="nav-icon">👥</span> Users
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'universities' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('universities')}
                    >
                        <span className="nav-icon">🏫</span> Universities
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'scholarships' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('scholarships')}
                    >
                        <span className="nav-icon">🎓</span> Scholarships
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'internships' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('internships')}
                    >
                        <span className="nav-icon">💼</span> Internships
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={onLogout} className="sidebar-logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <h2 className="topbar-title">{pageTitle}</h2>
                    </div>
                    <div className="topbar-right">
                        <span className="topbar-admin-badge">Admin</span>
                    </div>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
