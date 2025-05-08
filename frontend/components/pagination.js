export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div style={paginationStyle}>
      <button 
        onClick={handlePrev} 
        disabled={currentPage === 1} 
        style={buttonStyle}
      >
        Previous
      </button>
      <span style={pageInfoStyle}>
        {currentPage} of {totalPages}
      </span>
      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages} 
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
}

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '0 10px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
};

const pageInfoStyle = {
  fontSize: '16px',
  margin: '0 10px',
};
