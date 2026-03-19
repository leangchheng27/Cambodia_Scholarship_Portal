const PaginationControls = ({ page, setPage, total, itemsPerPage }) => {
    const totalPages = Math.ceil(total / itemsPerPage);
    
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

export default PaginationControls;
