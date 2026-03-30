import PaginationControls from '../common/PaginationControls.jsx';

const CAMBODIAN_PROVINCES = [
    'Phnom Penh', 'Battambang', 'Banteay Meanchey', 'Kampong Cham', 'Kampong Chhnang',
    'Kampong Thom', 'Kampot', 'Kandal', 'Kep', 'Koh Kong', 'Kompong Speu', 'Kratie',
    'Mondulkiri', 'Oddar Meanchey', 'Pailin', 'Preah Vihear', 'Prey Veng', 'Pursat',
    'Ratanakiri', 'Siem Reap', 'Sihanoukville', 'Stung Treng', 'Svay Rieng', 'Takeo', 'Tbong Khmum'
];

const UniversitiesTable = ({ universities, currentPage, setCurrentPage, ITEMS_PER_PAGE, onEdit, onDelete, selectedProvince, setSelectedProvince, search = '', onSearchChange = () => {} }) => {
    // Filter universities by selected province
    const filteredByProvince = selectedProvince === 'all' 
        ? universities 
        : universities.filter(uni => uni.location === selectedProvince);

    // Filter by search
    const filteredUniversities = filteredByProvince.filter(uni =>
        uni.name.toLowerCase().includes(search.toLowerCase()) ||
        (uni.location || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Universities</h2>
                <button onClick={() => onEdit('universities')} className="add-btn">
                    + Add University
                </button>
            </div>
            
            {/* Province Filter Dropdown */}
            <div className="filter-container">
                <label htmlFor="province-filter">Filter by Province:</label>
                <select 
                    id="province-filter"
                    value={selectedProvince} 
                    onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setCurrentPage(1); // Reset to page 1 when filtering
                    }}
                    className="filter-select"
                >
                    <option value="all">All Provinces</option>
                    {CAMBODIAN_PROVINCES.map(province => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
                <span className="filter-count">({filteredUniversities.length} universities)</span>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or location..."
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
                            <th>Location</th>
                            <th>Original Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUniversities
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
                total={filteredUniversities.length}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default UniversitiesTable;
