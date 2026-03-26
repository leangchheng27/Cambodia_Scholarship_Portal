const DashboardStats = ({ stats }) => {
    if (!stats) return null;

    return (
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
    );
};

export default DashboardStats;
