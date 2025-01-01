import React, { useEffect, useState } from "react";
import HomeBrowse from "../../components/Client/home/home-browse";
import HomeProducts from "../../components/Client/home/home-products/home-products";
import HomeSlider from "../../components/Client/home/home-slider";
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/musical_instruments');
                console.log('API Response:', response.data);

                const allProducts = response.data?.data || []; // Lấy mảng sản phẩm từ response.data.data

                if (allProducts.length === 0) {
                    console.warn('No products found in API response.');
                }

                // Chọn 8 sản phẩm ngẫu nhiên
                const randomProducts = allProducts
                    .sort(() => 0.5 - Math.random()) // Shuffle mảng
                    .slice(0, 8); // Lấy 8 phần tử đầu tiên sau khi shuffle

                setProducts(randomProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <HomeSlider />
            <HomeBrowse />
            <HomeProducts products={products} />
        </>
    );
};

export default HomePage;
