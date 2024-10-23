import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products] = useState([
    {
      id: 1,
      product_name: '香酥芋泥蛋糕',
      price: 240,
      statement_date: '2024/5/10',
      product_picture: '/images/cake1.jpg'
    },
    {
      id: 2,
      product_name: '奶酥蜂蜜蛋糕',
      price: 220,
      statement_date: '2024/5/12',
      product_picture: '/images/cake2.jpg'
    }
  ]);

  return (
    <div className="page-container">
      <header className="header">
        <h1>恩恩的團購商品</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;