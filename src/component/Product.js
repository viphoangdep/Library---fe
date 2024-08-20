import React from 'react';

function Product({ src }) {
  return (
    <div className="Product">
      <div className="container">
        <img 
          src={src}
          className="d-block w-100"
          style={{ borderRadius: '8px' }} 
        />
      </div>
    </div>
  );
}

export default Product;