import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Search Engine</h1>
      <Link href="/products">
        <button style={buttonStyle}>Products</button>
      </Link>
    </div>
  );
}

const buttonStyle = {
  padding: '15px 30px',
  fontSize: '16px',
  marginTop: '20px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff', 
  border: 'none',
  borderRadius: '5px',
};
