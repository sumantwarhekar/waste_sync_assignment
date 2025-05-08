import { useState } from 'react';

export default function SearchBar({ onSearch, setCategory, setTenant }) {
  const [localCategory, setLocalCategory] = useState('');
  const [localTenant, setLocalTenant] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategory(localCategory); // Set the category state in the parent component
    setTenant(localTenant); // Set the tenant state in the parent component
    onSearch(); // Trigger the search function passed from the parent
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Search Products</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Tenant"
          value={localTenant}
          onChange={(e) => setLocalTenant(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Search</button>
      </form>
    </div>
  );
}

// Inline styles for the form elements
const inputStyle = {
  padding: '10px',
  margin: '5px',
  width: '200px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
