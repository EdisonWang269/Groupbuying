// src/pages/HomePage/index.js
import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import {
  Container,
  Header,
  Title,
  SearchBar,
  ProductsGrid
} from './styles';

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
    <Container>
      <Header>
        <Title>恩恩的團購商品</Title>
        <SearchBar>
          <input type="text" placeholder="Search" />
        </SearchBar>
      </Header>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default HomePage;