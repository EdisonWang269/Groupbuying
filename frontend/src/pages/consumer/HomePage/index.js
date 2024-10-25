import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './components/ProductCard';
import {
  Container,
  Header,
  Title,
  TitleHighlight,
  SearchBarContainer,
  SearchBar,
  SearchIcon,
  ProductsGrid,
  HeaderContent,
  HeaderBackground
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
        <HeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </HeaderBackground>
        <HeaderContent>
          <Title>
            Go<TitleHighlight>團購</TitleHighlight>
          </Title>
          <SearchBarContainer>
            <SearchIcon>
              <Search size={18} color="#6CB7AA" />
            </SearchIcon>
            <SearchBar placeholder="搜尋商品" />
          </SearchBarContainer>
        </HeaderContent>
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