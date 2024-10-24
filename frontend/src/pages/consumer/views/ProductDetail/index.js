// src/pages/ProductDetail/index.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderModal from '../../components/OrderModal';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  Image,
  ProductTitle,
  Price,
  QuantitySelector,
  OrderButton,
  StatementDate,
  Description
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
      <Header>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
        <HeaderTitle>恩恩的團購</HeaderTitle>
      </Header>
      
      <Content>
        <Image
          src="/images/cake1.jpg"
          alt="商品圖片"
        />
        
        <ProductTitle>香酥芋泥蛋糕</ProductTitle>
        <Price>價格：$ 240 /盒</Price>
        
        <QuantitySelector>
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </QuantitySelector>
        
        <OrderButton onClick={() => setShowOrderModal(true)}>
          立即下單
        </OrderButton>
        
        <StatementDate>結單日期：2024/5/10</StatementDate>
        
        <Description>
          <h4>商品說明：</h4>
          <p>
            香濃芋頭內餡 搭配日本麵粉特製鬆軟蛋糕的完美比例。
            手做★口感扎實 軟綿Q彈蛋糕體，搭配滑順芋泥香醇內餡。
            一口接著一口最對味★無添加糖 無持久性防腐劑的安心選擇。
            完全無人工色素。
          </p>
        </Description>
      </Content>

      {showOrderModal && (
        <OrderModal
          onClose={() => setShowOrderModal(false)}
          quantity={quantity}
        />
      )}
    </Container>
  );
};

export default ProductDetail;