import React from 'react';
import ProductItem from './shop-product';
import { Grid } from "@mui/material";

const ProductList = ({ products, pagination, onPageChange }) => {
  const { page, totalPages } = pagination;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${page === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(page - 1)}
            >
              <a className="page-link" style={{ backgroundColor: '#F9F1E7', borderColor: '#B88E2F' }}>
                Previous
              </a>
            </li>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === page;
              return (
                <li
                  className={`page-item ${isActive ? 'active' : ''}`}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
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

            <li
              className={`page-item ${page === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(page + 1)}
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
