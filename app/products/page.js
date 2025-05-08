'use client';

import { useEffect, useState } from 'react';
import Pagination from '../../frontend/components/pagination';
import ProductList from '../../frontend/components/productList';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 25;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/search?page=${page}&limit=${limit}`);
        const data = await res.json();

        // Prevent going to a page beyond available data
        if (page > 1 && data.products.length === 0) {
          setPage(1); // Reset to first page
          return;
        }

        //console.log('Fetched data:', data);
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
        setTotal(0);
      }
    };

    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    
    <div style={{ padding: '1rem' }}>
      <Link href="/">
        <button style={{
          backgroundColor: '#444',
          color: 'white',
          padding: '0.5rem 1rem',
          marginRight: '1rem',
          borderRadius: '4px'
        }}>
          Home
        </button>
      </Link>

      <h1>All Products</h1>
      <Link href="/search">
        <button style={{ backgroundColor: 'green', color: 'white', padding: '0.5rem 1rem', marginBottom: '1rem' }}>
          Search Products
        </button>
      </Link>

      {products.length === 0 ? (
        <p>{total === 0 ? 'No products found.' : 'No more products on this page.'}</p>
      ) : (
        <ProductList products={products} />
      )}

      {total > limit && (
        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={limit}
          onPageChange={setPage}
        />
      )}

    </div>
  );
}
