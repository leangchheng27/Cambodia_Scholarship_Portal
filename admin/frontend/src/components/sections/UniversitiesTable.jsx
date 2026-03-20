import PaginationControls from '../common/PaginationControls.jsx';

const UniversitiesTable = ({ universities, currentPage, setCurrentPage, ITEMS_PER_PAGE, onEdit, onDelete }) => {
    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Universities</h2>
                <button onClick={() => onEdit('universities')} className="add-btn">
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
                            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                            .map((university, idx) => (
                                <tr key={university.id}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                    <td>{university.name}</td>
                                    <td>{university.location || 'N/A'}</td>
                                    <td>{university.original_link || university.website || 'N/A'}</td>
                                    <td>
                                        <button 
                                            onClick={() => onEdit('universities', university)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(university.id)}
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
                total={universities.length}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default UniversitiesTable;
