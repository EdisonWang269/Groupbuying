import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.product_picture}
        alt={product.product_name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.product_name}</h3>
        <p className="price">$ {product.price}</p>
        <p className="date">結單日期：{product.statement_date}</p>
      </div>
    </div>
  );
};

export default ProductCard;