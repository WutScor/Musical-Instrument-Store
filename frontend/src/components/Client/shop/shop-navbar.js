import React from 'react';
import { AiOutlineFilter } from "react-icons/ai";

const ShopNavbar = ({ onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ price: e.target.value });
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
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            <option value="Guitar">Guitar</option>
            <option value="Drum">Drum</option>
            <option value="Piano">Piano</option>
          </select>
        </div>

        <div className="d-flex align-items-center">
          <span className="me-2">Price</span>
          <select
            className="form-select"
            style={{ width: '150px', borderRadius: '4px', backgroundColor: '#fff', color: '#000' }}
            onChange={handlePriceChange}
          >
            <option value="Default">Default</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShopNavbar;
