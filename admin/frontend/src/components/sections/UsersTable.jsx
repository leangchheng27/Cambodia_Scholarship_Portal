import PaginationControls from '../common/PaginationControls.jsx';

const UsersTable = ({ users, currentPage, setCurrentPage, ITEMS_PER_PAGE, onEdit, onDelete, search = '', onSearchChange = () => {} }) => {
    // Filter users by search
    const filteredUsers = users.filter(user =>
        (user.name || '').toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="users-section">
            <div className="section-header">
                <h2>All Users</h2>
                <button onClick={() => onEdit('users')} className="add-btn">+ Add User</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>
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
                        {filteredUsers
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
                                        <button
                                            onClick={() => onEdit('users', user)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        {user.role !== 'admin' && (
                                            <button 
                                                onClick={() => onDelete(user.id)}
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
            <PaginationControls 
                page={currentPage} 
                setPage={setCurrentPage} 
                total={filteredUsers.length}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default UsersTable;
