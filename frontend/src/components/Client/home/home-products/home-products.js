import React from 'react';
import ProductItem from '../../shop/shop-product';
import { Button, Grid } from "@mui/material";
import { Link } from 'react-router-dom';

const HomeProducts = ({ products }) => {

  return (
    <div>
      <div className="container mt-4 d-flex justify-content-center align-items-center flex-column">
      <h1 className="title mt-5">Explore Our Instruments</h1>
      <p className="title-desc mb-5">
          Find the perfect musical instrument to elevate your performance.
      </p>
        <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
        <Link to={'/shop'} className="btn-container"><Button className="sm-button">Show More</Button></Link>
      </div>
    </div>
  );
};

export default HomeProducts;
