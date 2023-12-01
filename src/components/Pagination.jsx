import React from 'react';

const Pagination = ({ currentPage, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <div className='pagination-btn-container'>
        <p className='page-count'>Page {currentPage} of {totalPages}</p>
        <button className="pagination-button" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        <i class="fa-solid fa-angles-left"></i>
        </button>
        <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <i class="fa-solid fa-angle-left"></i>
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button key={page + 1} className={`pagination-button ${currentPage === page + 1 ? 'active' : ''}`} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </button>
        ))}
        <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <i class="fa-solid fa-angle-right"></i>
        </button>
        <button className="pagination-button" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
