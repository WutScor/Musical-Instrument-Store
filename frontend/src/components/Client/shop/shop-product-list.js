import React, { useState } from 'react';
import ProductItem from './shop-product';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Số sản phẩm mỗi trang
  

  // Tính toán số trang tổng cộng
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Lấy các sản phẩm cho trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    Math.min(currentPage * productsPerPage, products.length)
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Product Grid Section */}
      <div className="container mt-4">
        <div className="row">
          {currentProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="container-w3 mt-5">
                <div className="products-row w-100 d-flex">
                  <ProductItem product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {/* Previous Button */}
            <li
              className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={handlePreviousPage}
              style={{ cursor: 'pointer' }}
            >
              <a className="page-link" style={{ backgroundColor: '#F9F1E7', borderColor: '#B88E2F' }}>
                Previous
              </a>
            </li>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              return (
                <li
                  className={`page-item ${isActive ? 'active' : ''}`}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{ cursor: 'pointer' }}
                >
                  <a
                    className="page-link"
                    style={{
                      color: isActive ? 'white' : 'black',
                      backgroundColor: isActive ? '#B88E2F' : '#F9F1E7',
                      borderColor: '#B88E2F',
                    }}
                  >
                    {pageNumber}
                  </a>
                </li>
              );
            })}

            {/* Next Button */}
            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={handleNextPage}
              style={{ cursor: 'pointer' }}
            >
              <a className="page-link" style={{ backgroundColor: '#F9F1E7', borderColor: '#B88E2F' }}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
