// src/pages/HomePage/index.js
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {
  Container,
  Header,
  HeaderBackground,
  HeaderContent,
  Title,
  TitleHighlight,
  SearchBarContainer,
  SearchBar,
  SearchIcon,
  ProductsGrid,
  NoResultsMessage
} from './styles';

const HomePage = () => {
  // 商品資料
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

  // 搜尋相關狀態
  const [searchInput, setSearchInput] = useState('');  // 即時輸入值
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');  // 延遲後的搜尋詞

  // 使用 useEffect 實現 debounce
  useEffect(() => {
    // 設定 500ms 的延遲
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchInput);
    }, 350);

    // cleanup function
    return () => clearTimeout(timer);
  }, [searchInput]);

  // 使用 useMemo 優化搜尋效能
  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return products;
    
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    return products.filter(product => 
      product.product_name.toLowerCase().includes(lowerSearchTerm) ||
      product.price.toString().includes(lowerSearchTerm)
    );
  }, [products, debouncedSearchTerm]);

  // 處理搜尋輸入
  const handleSearchChange = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  return (
    <Container>
      <Header sticky>
        <HeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </HeaderBackground>
        <HeaderContent direction="column" justify="center" gap="16px">
          <Title>
            Go<TitleHighlight>團購</TitleHighlight>
          </Title>
          <SearchBarContainer>
            <SearchIcon>
              <Search size={18} color="#6CB7AA" />
            </SearchIcon>
            <SearchBar 
              placeholder="搜尋商品"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </SearchBarContainer>
        </HeaderContent>
      </Header>
      
      <ProductsGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <NoResultsMessage>
            找不到符合「{debouncedSearchTerm}」的商品
          </NoResultsMessage>
        )}
      </ProductsGrid>
    </Container>
  );
};

export default HomePage;