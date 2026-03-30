import PaginationControls from '../common/PaginationControls.jsx';

const InternshipsTable = ({ internships, currentPage, setCurrentPage, ITEMS_PER_PAGE, onEdit, onDelete, search = '', onSearchChange = () => {} }) => {
    // Filter internships by search
    const filteredInternships = internships.filter(internship =>
        internship.name.toLowerCase().includes(search.toLowerCase()) ||
        (internship.company || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Internships</h2>
                <button onClick={() => onEdit('internships')} className="add-btn">
                    + Add Internship
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or company..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
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
                        {filteredInternships
                            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                            .map((internship, idx) => (
                                <tr key={internship.id}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                    <td>{internship.name}</td>
                                    <td>{internship.company || 'N/A'}</td>
                                    <td>{internship.duration || 'N/A'}</td>
                                    <td>
                                        <button 
                                            onClick={() => onEdit('internships', internship)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(internship.id)}
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
            <PaginationControls 
                page={currentPage} 
                setPage={setCurrentPage} 
                total={filteredInternships.length}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default InternshipsTable;
