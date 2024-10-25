// src/pages/OrderHistory/index.js
import React, { useState } from 'react';
import {
  Container,
  Header,
  HeaderBackground,
  HeaderContent,
  Title,
  TabsContainer,
  TabButton,
  OrdersList,
  OrderCard,
  OrderInfo,
  OrderImage,
  OrderDetails,
  StatusTag,
  NoOrders
} from './styles';

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState('所有清單');
  const [orders] = useState([
    {
      id: 1,
      productName: '香酥芋泥蛋糕',
      statement_date: '2024/1/28',
      delivery_date: '2024/2/10',
      status: '待領取',
      image: '/cake1.jpg'
    },
    {
      id: 2,
      productName: '可頌黑糖馬告',
      statement_date: '2024/1/26',
      delivery_date: '2024/2/8',
      status: '已領取',
      image: '/cake2.jpg'
    },
    {
      id: 3,
      productName: '特選蛋糕',
      statement_date: '2024/1/25',
      delivery_date: '2024/2/7',
      status: '已結單',
      image: '/cake3.jpg'
    }
  ]);

  const filterOrders = (tab) => {
    switch (tab) {
      case '未完成':
        return orders.filter(order => order.status === '待領取');
      case '已完成':
        return orders.filter(order => order.status === '已領取' || order.status === '已結單');
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders(selectedTab);

  return (
    <Container>
      <Header>
        <HeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </HeaderBackground>
        <HeaderContent>
          <Title>我的訂單</Title>
        </HeaderContent>
      </Header>

      <TabsContainer>
        {['所有清單', '未完成', '已完成'].map(tab => (
          <TabButton 
            key={tab}
            isActive={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabsContainer>

      <OrdersList>
        {filteredOrders.length === 0 ? (
          <NoOrders>
            <p>沒有符合條件的訂單</p>
          </NoOrders>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id}>
              <OrderInfo>
                <OrderImage 
                  src={order.image} 
                  alt={order.productName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-product-image.jpg';
                  }}
                />
                <OrderDetails>
                  <h3>{order.productName}</h3>
                  <p>結單日期：{order.statement_date}</p>
                  <p>取貨日期：{order.delivery_date}</p>
                  <StatusTag status={order.status}>
                    {order.status}
                  </StatusTag>
                </OrderDetails>
              </OrderInfo>
            </OrderCard>
          ))
        )}
      </OrdersList>
    </Container>
  );
};

export default OrderHistory;