// src/pages/consumer/HomePage/index.js
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { productAPI } from '../../../api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
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
  NoResultsMessage,
  ErrorMessage
} from './styles';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAllProducts();
      
      if (response && response.data) {
        // 更新本地狀態
        setProducts(response.data);
        // 存儲到 localStorage
        localStorage.setItem('products', JSON.stringify(response.data));
      } else {
        throw new Error('無效的數據格式');
      }
    } catch (err) {
      setError('無法載入商品，請稍後再試');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // 在組件載入時獲取商品
  useEffect(() => {
    fetchProducts();
  }, []);

  // 搜尋防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchInput);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // 過濾商品
  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return products;
    
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    return products.filter(product => 
      product.product_name.toLowerCase().includes(lowerSearchTerm) ||
      product.price.toString().includes(lowerSearchTerm)
    );
  }, [products, debouncedSearchTerm]);

  // 處理搜尋
  const handleSearchChange = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  // 重試功能
  const handleRetry = useCallback(() => {
    fetchProducts();
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
              disabled={loading || !!error}
            />
          </SearchBarContainer>
        </HeaderContent>
      </Header>
      
      {loading && <LoadingSpinner />}
      
      {error && (
        <ErrorMessage>
          {error}
          <button onClick={handleRetry}>重試</button>
        </ErrorMessage>
      )}
      
      {!loading && !error && (
        <ProductsGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <NoResultsMessage>
              找不到符合「{debouncedSearchTerm}」的商品
            </NoResultsMessage>
          )}
        </ProductsGrid>
      )}
    </Container>
  );
};

export default HomePage;