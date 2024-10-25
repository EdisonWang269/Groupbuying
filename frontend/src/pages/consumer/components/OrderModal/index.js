// src/components/OrderModal/index.js
import React from 'react';
import { X } from 'lucide-react';
import {
  Overlay,
  ModalContainer,
  Content,
  CloseButton,
  Title,
  OrderDetails,
  DetailItem,
  TotalPrice,
  ButtonGroup,
  Button
} from './styles';

const OrderModal = ({ onClose, quantity, productName, price }) => {
  const totalPrice = quantity * price;

  const handleSubmit = () => {
    // 這裡之後會串接 API
    console.log('提交訂單', {
      quantity,
      totalPrice
    });
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        
        <Content>
          <Title>訂單確認</Title>
          
          <OrderDetails>
            <DetailItem>
              <span>商品名稱</span>
              <span>{productName}</span>
            </DetailItem>
            <DetailItem>
              <span>單價</span>
              <span>NT$ {price}</span>
            </DetailItem>
            <DetailItem>
              <span>數量</span>
              <span>{quantity} 盒</span>
            </DetailItem>
            <TotalPrice>
              <span>總計</span>
              <span>NT$ {totalPrice}</span>
            </TotalPrice>
          </OrderDetails>
          
          <ButtonGroup>
            <Button onClick={onClose}>取消</Button>
            <Button primary onClick={handleSubmit}>確認下單</Button>
          </ButtonGroup>
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

export default OrderModal;