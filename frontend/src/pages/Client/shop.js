import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import ShopIntro from "../../components/Client/shop/shop-intro";
import ShopNavbar from "../../components/Client/shop/shop-navbar";
import ProductList from '../../components/Client/shop/shop-product-list';
import axios from 'axios';

const ShopPage = () => {
  const [filters, setFilters] = useState({ category: '', min_price: '', max_price: '' });
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [searchParams] = useSearchParams();
  const location = useLocation(); 

  useEffect(() => {
    // Nếu có bộ lọc từ location.state, cập nhật filters
    if (location.state?.filters) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...location.state.filters,
        page: 1,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const search = searchParams.get('search') || '';
        const { page, category, min_price, max_price } = filters;
        const params = {
          page: page || 1, 
          limit: 8, 
          category_id: category, 
          search,
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
  }, [filters, searchParams]);

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
      page: 1,
    }));
  };

  return (
    <div>
      <ShopIntro />
      <ShopNavbar 
        onFilterChange={handleFilterChange}
        selectedCategory={filters.category}
         />
      <ProductList 
        products={products} 
        pagination={pagination} 
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} 
      />
    </div>
  );
};

export default ShopPage;
