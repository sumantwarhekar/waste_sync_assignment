'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductList from '../../frontend/components/productList';
import Pagination from '../../frontend/components/pagination';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const category = searchParams.get('category') || '';
  const tenant = searchParams.get('tenant') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10;

  const updateQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCategory = formData.get('category').trim();
    const newTenant = formData.get('tenant').trim();

    const queryParams = {};
    if (newCategory) queryParams.category = newCategory;
    if (newTenant) queryParams.tenant = newTenant;
    queryParams.page = '1'; // Reset page

    updateQueryParams(queryParams);

    // Reset products if both fields are empty
    if (!newCategory && !newTenant) {
      setProducts([]);
      setTotal(0);
    }
  };

  const handlePageChange = (newPage) => {
    updateQueryParams({
      category,
      tenant,
      page: newPage.toString()
    });
  };

  useEffect(() => {
    if (!category && !tenant) {
      setProducts([]);
      setTotal(0);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?category=${category}&tenant=${tenant}&page=${page}&limit=${limit}`
        );
        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
        setTotal(0);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category, tenant, page]);

  return (
    <div style={{ padding: '40px' }}>
      <Link href="/">
        <button style={{
          backgroundColor: '#444',
          color: 'white',
          padding: '0.5rem 1rem',
          marginRight: '1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Home
        </button>
      </Link>

      <h1>Search Products</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          defaultValue={category}
          style={inputStyle}
        />
        <input
          type="text"
          name="tenant"
          placeholder="Tenant"
          defaultValue={tenant}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ProductList products={products} />
          {products.length > 0 && (
            <Pagination 
              currentPage={page}
              totalItems={total}
              itemsPerPage={limit}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

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
