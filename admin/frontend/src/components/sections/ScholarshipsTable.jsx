import PaginationControls from '../common/PaginationControls.jsx';

const ScholarshipsTable = ({ 
    cambodiaScholarships, 
    abroadScholarships, 
    scholarshipType, 
    setScholarshipType,
    currentPage, 
    setCurrentPage, 
    ITEMS_PER_PAGE, 
    onEdit, 
    onDelete 
}) => {
    const displayedScholarships = scholarshipType === 'cambodia' ? cambodiaScholarships : abroadScholarships;

    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Scholarships</h2>
                <button onClick={() => onEdit('create')} className="add-btn">
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
                        {displayedScholarships
                            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                            .map((scholarship, idx) => (
                                <tr key={scholarship.id}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                    <td>{scholarship.name}</td>
                                    <td><span className="type-badge">{scholarship.type}</span></td>
                                    <td>{scholarship.funded_by || 'N/A'}</td>
                                    <td>{scholarship.course_duration || 'N/A'}</td>
                                    <td>
                                        <button 
                                            onClick={() => onEdit('edit', scholarship)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(scholarship.id)}
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
                total={displayedScholarships.length}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default ScholarshipsTable;
