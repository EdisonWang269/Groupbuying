// src/pages/consumer/components/OrderModal/index.js
import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  Content,
  Title,
  CloseButton,
  OrderDetails,
  DetailItem,
  TotalPrice,
  Button,
  ButtonGroup,
  ErrorMessage,
} from './styles';

const OrderModal = ({ 
  onClose, 
  onConfirm, 
  loading, 
  error,
  product,
  quantity
}) => {
  const total = product.price * quantity;

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>確認訂單</Title>
        <CloseButton onClick={onClose} disabled={loading}>✕</CloseButton>

        <Content>
          <OrderDetails>
            <DetailItem>
              <span>商品名稱</span>
              <span>{product.product_name}</span>
            </DetailItem>
            <DetailItem>
              <span>單價</span>
              <span>NT$ {product.price} /{product.unit}</span>
            </DetailItem>
            <DetailItem>
              <span>數量</span>
              <span>{quantity}</span>
            </DetailItem>
            <TotalPrice>
              <span>總計</span>
              <span>NT$ {total}</span>
            </TotalPrice>
          </OrderDetails>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            <Button 
              onClick={onClose} 
              disabled={loading}
            >
              取消
            </Button>
            <Button 
              onClick={onConfirm}
              disabled={loading}
              primary
            >
              {loading ? '處理中...' : '確認下單'}
            </Button>
          </ButtonGroup>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OrderModal;