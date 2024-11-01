import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { orderAPI } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
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
  OrderInfoGroup,
  InfoItem,
  StatusTag,
  NoOrders,
  ErrorContainer,
  RetryButton
} from './styles';

const OrderHistory = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('所有清單');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user?.userid) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.getUserOrders(user.userid);
      
      if (response?.order && Array.isArray(response.order)) {
        const uniqueOrders = Array.from(new Set(response.order.map(order => 
          JSON.stringify(order)
        ))).map(str => JSON.parse(str));
        
        const sortedOrders = uniqueOrders.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        
        setOrders(sortedOrders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      if (err?.response?.status !== 404) {
        setError('無法載入訂單資訊，請稍後再試');
        console.error('Error fetching orders:', err);
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.userid]);

  const filterOrders = useCallback((tab) => {
    const uniqueOrders = Array.from(new Set(orders.map(order => 
      JSON.stringify(order)
    ))).map(str => JSON.parse(str));
    
    switch (tab) {
      case '未完成':
        return uniqueOrders.filter(order => !order.receive_status);
      case '已完成':
        return uniqueOrders.filter(order => order.receive_status);
      default:
        return uniqueOrders;
    }
  }, [orders]);

  const filteredOrders = useMemo(() => 
    filterOrders(selectedTab), 
    [filterOrders, selectedTab]
  );

  const getOrderStatus = useCallback((order) => {
    const now = new Date();
    const dueDate = order.due_date ? new Date(order.due_date) : null;

    if (order.receive_status) {
      return {
        text: '已完成',
        status: 'completed'
      };
    }

    if (order.arrival_date === '待定' || !order.arrival_date) {
      return {
        text: '處理中',
        status: 'processing'
      };
    }

    if (dueDate && now > dueDate) {
      return {
        text: '已過時',
        status: 'expired'
      };
    }

    return {
      text: '待領取',
      status: 'pending'
    };
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return '待定';
    try {
      return new Date(dateString).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return '日期格式錯誤';
    }
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <RetryButton onClick={fetchOrders}>重試</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </HeaderBackground>
        <HeaderContent direction="column" gap="24px">
          <Title>我的訂單</Title>
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
        </HeaderContent>
      </Header>

      <OrdersList>
        {filteredOrders.length === 0 ? (
          <NoOrders>
            <p>
              {selectedTab === '所有清單' 
                ? '尚未有任何訂單' 
                : `沒有${selectedTab}訂單`}
            </p>
          </NoOrders>
        ) : (
          filteredOrders.map(order => {
            const orderStatus = getOrderStatus(order);
            const totalPrice = order.price ? `NT$ ${order.price}` : '未設定';

            return (
              <OrderCard key={order.order_id} hover>
                <OrderInfo>
                  <OrderImage 
                    src={order.product_picture} 
                    alt={order.product_name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-product-image.jpg';
                    }}
                  />
                  <OrderDetails>
                    <h3>{order.product_name}</h3>
                    <OrderInfoGroup>
                      <InfoItem>
                        <span>購買數量：</span>
                        <span>{order.quantity} {order.unit || '件'}</span>
                      </InfoItem>
                      <InfoItem highlight>
                        <span>總價：</span>
                        <span>{totalPrice}</span>
                      </InfoItem>
                      <InfoItem fullWidth>
                        <span>到貨日期：</span>
                        <span>{formatDate(order.arrival_date)}</span>
                      </InfoItem>
                      <InfoItem fullWidth>
                        <span>領取期限：</span>
                        <span>{formatDate(order.due_date)}</span>
                      </InfoItem>
                    </OrderInfoGroup>
                    <StatusTag status={orderStatus.status}>
                      {orderStatus.text}
                    </StatusTag>
                  </OrderDetails>
                </OrderInfo>
              </OrderCard>
            );
          })
        )}
      </OrdersList>
    </Container>
  );
};

export default OrderHistory;