import React, { useState, useEffect } from 'react';
import ShopIntro from "../../components/Client/shop/shop-intro";
import ShopNavbar from "../../components/Client/shop/shop-navbar";
import ProductList from '../../components/Client/shop/shop-product-list';


const ShopPage = () => {
    const [filters, setFilters] = useState({ category: 'All', price: 'Default' });
    const [products, setProducts] = useState([]);
    
    // Gọi api để lấy products khi render
    useEffect(() => {
        const data = [
            { id: 1, name: 'Syltherine', price: 2000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: 'New' },
            { id: 2, name: 'Leviosa', price: 2500000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: 'Hot' },
            { id: 3, name: 'Lolito', price: 7000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: 'Sale' },
            { id: 4, name: 'Respira', price: 6000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: null },
            { id: 5, name: 'Laria', price: 3000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: null }, 
            { id: 6, name: 'Syltherine', price: 2000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: 'New' },
            { id: 7, name: 'Leviosa', price: 2500000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: 'Hot' },
            { id: 8, name: 'Lolito', price: 7000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: 'Sale' },
            { id: 9, name: 'Respira', price: 6000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: null },
            { id: 10, name: 'Laria', price: 3000000, image: 'https://kadence.in/wp-content/uploads/2024/02/1-72.jpg', badge: null }, 
        ];
        const fetchInitialProducts = async () => {
        try {
            // Mở comment khi có api
            //const response = await fetch('/api/products'); 
            //const data = await response.json();
            //setProducts(data); 
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };

        fetchInitialProducts();
    }, []); 

    // Khi bộ lọc thay đổi, gọi API lấy sản phẩm theo bộ lọc
    useEffect(() => {
        const fetchFilteredProducts = async () => {
        try {
            const response = await fetch(
            `/api/products?category=${filters.category}&price=${filters.price}`
            );
            const data = await response.json();
            setProducts(data); 
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
        };

        //Mở khi có api
        //fetchFilteredProducts();
    }, [filters]); 

    // Hàm xử lý sự thay đổi bộ lọc
    const handleFilterChange = (newFilter) => {
        setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilter,
        }));
    };

    return (
        <div>
            <ShopIntro></ShopIntro>
            <ShopNavbar onFilterChange={handleFilterChange} />
            <ProductList products={products} />
        </div>
    );
}

export default ShopPage;