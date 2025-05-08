export default function ProductList({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product?._id || Math.random()} style={listItemStyle}>
            <h3>{product?.name || 'Unnamed Product'}</h3>
            <p><strong>Category:</strong> {product?.category || 'N/A'}</p>
            <p><strong>Tenant:</strong> {product?.tenant || 'N/A'}</p>
            <p><strong>Price:</strong> 
              {typeof product?.price === 'number'
                ? `$${product.price.toFixed(2)}`
                : 'N/A'}
            </p>
            {product?.description && <p>{product.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple inline styles for list items
const listItemStyle = {
  borderBottom: '1px solid #ddd',
  padding: '10px',
  marginBottom: '10px',
};
