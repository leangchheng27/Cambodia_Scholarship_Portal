import PaginationControls from '../common/PaginationControls.jsx';

const InternshipsTable = ({ internships, currentPage, setCurrentPage, ITEMS_PER_PAGE, onEdit, onDelete }) => {
    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Internships</h2>
                <button onClick={() => onEdit('internships')} className="add-btn">
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
                            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                            .map((internship, idx) => (
                                <tr key={internship.id}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                    <td>{internship.name}</td>
                                    <td>{internship.funded_by || 'N/A'}</td>
                                    <td>{internship.course_duration || 'N/A'}</td>
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
                total={internships.length}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default InternshipsTable;
