import React, { useState, useEffect } from 'react';
import ShopIntro from "../../components/Client/shop/shop-intro";
import ShopNavbar from "../../components/Client/shop/shop-navbar";
import ProductList from '../../components/Client/shop/shop-product-list';
import axios from 'axios';

const ShopPage = () => {
  const [filters, setFilters] = useState({ category: '', min_price: '', max_price: ''});
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  // Fetch products from API when page or filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { page, category, min_price, max_price } = filters;
        const params = {
          page: page || 1, 
          limit: 8, 
          category_id: category, 
          search: '', 
          min_price: min_price, 
          max_price: max_price, 
          min_release_year: '', 
          max_release_year: '', 
          isAvailable: '',
        };
        
        const response = await axios.get('/musical_instruments', { params });
        setProducts(response.data.items);
        setPagination({
          page: response.data.pagination.page,
          totalPages: response.data.pagination.totalPages,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [filters]);
  // console.log(products);

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
      page: 1, // Reset to page 1 when filter changes
    }));
  };

  return (
    <div>
      <ShopIntro />
      <ShopNavbar onFilterChange={handleFilterChange} />
      <ProductList 
        products={products} 
        pagination={pagination} 
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} 
      />
    </div>
  );
};

export default ShopPage;