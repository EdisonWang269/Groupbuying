// src/pages/ProductDetail/index.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import OrderModal from '../components/OrderModal';
import {
  Container,
  Header,
  HeaderBackground,
  StyledHeaderContent,
  BackButton,
  HeaderTitle,
  MainContent,
  Content,
  ImageWrapper,
  Image,
  ProductInfo,
  ProductTitle,
  Price,
  QuantitySelector,
  OrderButton,
  StatementDate,
  Description,
  DescriptionTitle,
  DescriptionText
} from './styles';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { id } = useParams();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Container>
      <Header sticky>
        <HeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </HeaderBackground>
        <StyledHeaderContent>
          <BackButton onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="white" />
          </BackButton>
          <HeaderTitle>商品詳情</HeaderTitle>
        </StyledHeaderContent>
      </Header>
      
      <MainContent>
        <ImageWrapper>
          <Image
            src="/images/cake1.jpg"
            alt="商品圖片"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-product-image.jpg';
            }}
          />
        </ImageWrapper>
        
        <Content>
          <ProductInfo>
            <ProductTitle>香酥芋泥蛋糕</ProductTitle>
            <Price>NT$ 240 /盒</Price>
            <StatementDate>結單日期：2024/5/10</StatementDate>
            
            <Description>
              <DescriptionTitle>商品說明</DescriptionTitle>
              <DescriptionText>
                香濃芋頭內餡 搭配日本麵粉特製鬆軟蛋糕的完美比例。
                手做★口感扎實 軟綿Q彈蛋糕體，搭配滑順芋泥香醇內餡。
                一口接著一口最對味★無添加糖 無持久性防腐劑的安心選擇。
                完全無人工色素。
              </DescriptionText>
            </Description>

            <QuantitySelector>
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                －
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>
                ＋
              </button>
            </QuantitySelector>
            
            <OrderButton primary onClick={() => setShowOrderModal(true)}>
              立即下單
            </OrderButton>
          </ProductInfo>
        </Content>
      </MainContent>

      {showOrderModal && (
        <OrderModal
          onClose={() => setShowOrderModal(false)}
          quantity={quantity}
          productName="香酥芋泥蛋糕"
          price={240}
        />
      )}
    </Container>
  );
};

export default ProductDetail;