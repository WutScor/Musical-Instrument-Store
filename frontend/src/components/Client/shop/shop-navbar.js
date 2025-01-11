import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineFilter } from "react-icons/ai";

const ShopNavbar = ({ onFilterChange, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  // Load categories từ API
  useEffect(() => {
    axios.get('/categories?page=1&limit=20')
      .then(response => {
        // Thêm một mục "All" vào đầu danh sách categories
        setCategories([{ id: '', name: 'All' }, ...response.data.items]);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;

    let filterParams = { price: value };

    // Tùy theo lựa chọn của người dùng, gán min_price và max_price
    if (value === "Default") {
      filterParams = { min_price: '', max_price: '' }; // Không có giới hạn về giá
    } else if (value === "0-1000") {
      filterParams = { min_price: '0', max_price: '1000' };
    } else if (value === "1000-2000") {
      filterParams = { min_price: '1000', max_price: '2000' };
    } else if (value === "2000-3000") {
      filterParams = { min_price: '2000', max_price: '3000' };
    } else if (value === "3000-4000") {
      filterParams = { min_price: '3000', max_price: '4000' };
    } else if (value === ">4000") {
      filterParams = { min_price: '4000', max_price: '' }; // Chỉ gán min_price
    }

    onFilterChange(filterParams);
  };

  return (
    <div>
      {/* Navbar Section */}
      <div
        className="d-flex align-items-center px-4"
        style={{ height: '100px', backgroundColor: '#F9F1E7' }}
      >
        <div className="d-flex align-items-center me-4">
          <AiOutlineFilter size={20} />
          <span className="ms-2">Filter</span>
        </div>

        <div className="d-flex align-items-center me-4">
          <span className="me-2">Category</span>
          <select
            className="form-select"
            style={{ width: '150px', borderRadius: '4px', backgroundColor: '#fff', color: '#000' }}
            value={selectedCategory || ''} // Giá trị mặc định là từ prop selectedCategory
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex align-items-center">
          <span className="me-2">Price</span>
          <select
            className="form-select"
            style={{ width: '200px', borderRadius: '4px', backgroundColor: '#fff', color: '#000' }}
            onChange={handlePriceChange}
          >
            <option value="Default">Default</option>
            <option value="0-1000">0$ - 1000$</option>
            <option value="1000-2000">1000$ - 2000$</option>
            <option value="2000-3000">2000$ - 3000$</option>
            <option value="3000-4000">3000$ - 4000$</option>
            <option value=">4000">&gt; 4000$</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShopNavbar;
