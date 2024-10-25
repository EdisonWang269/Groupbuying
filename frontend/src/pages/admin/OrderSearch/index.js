// src/pages/admin/OrderSearch/index.js
import React, { useState } from 'react';
import { Search, Package, Phone, AlertCircle, User, ShoppingBag, Calendar } from 'lucide-react';
import {
  AdminContainer,
  AdminHeader,
  AdminHeaderBackground,
  AdminHeaderContent,
  AdminTitle,
  AdminContentContainer,
  AdminCard,
  AdminInput,
  AdminErrorMessage,
  IconWrapper,
  StatusTag
} from '../components/shared/styles';
import {
  SearchCard,
  SearchButton,
  ResultSection,
  ResultHeader,
  OrderCount,
  NoResult,
  OrderCard,
  OrderHeader,
  OrderInfo,
  OrderDetails,
  InfoItem,
  InfoLabel,
  InfoValue,
  InfoGrid,
  OrdersList
} from './styles';

const OrderSearch = () => {
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!phone || phone.length < 10) {
      setError('請輸入正確的手機號碼');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/orders?phone=${phone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '查詢失敗');
      }

      setOrders(data.orders);
    } catch (error) {
      setError(error.message);
      setOrders(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '待定';
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminHeaderBackground>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </AdminHeaderBackground>
        <AdminHeaderContent>
          <AdminTitle>訂單查詢</AdminTitle>
        </AdminHeaderContent>
      </AdminHeader>

      <AdminContentContainer>
        <SearchCard>
          <AdminInput
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="請輸入手機號碼"
            maxLength="10"
            onKeyPress={handleKeyPress}
          />
          <SearchButton
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <IconWrapper>
                  <Search size={20} />
                </IconWrapper>
                搜尋中...
              </>
            ) : (
              <>
                <IconWrapper>
                  <Search size={20} />
                </IconWrapper>
                搜尋
              </>
            )}
          </SearchButton>
        </SearchCard>

        {error && (
          <AdminErrorMessage>
            <AlertCircle size={16} />
            <span>{error}</span>
          </AdminErrorMessage>
        )}

        <ResultSection>
          {orders === null ? (
            <NoResult>
              <Search size={48} />
              <p>請輸入手機號碼進行查詢</p>
            </NoResult>
          ) : orders.length === 0 ? (
            <NoResult>
              <AlertCircle size={48} />
              <p>找不到相關訂單</p>
            </NoResult>
          ) : (
            <>
              <ResultHeader>
                <AdminTitle as="h2">查詢結果</AdminTitle>
                <OrderCount>共 {orders.length} 筆訂單</OrderCount>
              </ResultHeader>

              <OrdersList>
                {orders.map((order) => (
                  <OrderCard key={order.id}>
                    <OrderHeader>
                      <div className="product-info">
                        <Package size={20} />
                        <h3>{order.product_name}</h3>
                      </div>
                      <StatusTag status={order.receive_status}>
                        {order.receive_status ? '已領取' : '未領取'}
                      </StatusTag>
                    </OrderHeader>

                    <OrderDetails>
                      <InfoGrid>
                        <OrderInfo>
                          <InfoItem>
                            <IconWrapper>
                              <User size={16} />
                            </IconWrapper>
                            <InfoLabel>訂購人</InfoLabel>
                            <InfoValue>{order.user_name}</InfoValue>
                          </InfoItem>
                          
                          <InfoItem>
                            <IconWrapper>
                              <Phone size={16} />
                            </IconWrapper>
                            <InfoLabel>手機號碼</InfoLabel>
                            <InfoValue>{order.phone}</InfoValue>
                          </InfoItem>

                          <InfoItem>
                            <IconWrapper>
                              <ShoppingBag size={16} />
                            </IconWrapper>
                            <InfoLabel>訂購數量</InfoLabel>
                            <InfoValue>{order.quantity} 件</InfoValue>
                          </InfoItem>
                        </OrderInfo>

                        <OrderInfo>
                          <InfoItem>
                            <IconWrapper>
                              <Calendar size={16} />
                            </IconWrapper>
                            <InfoLabel>到貨日期</InfoLabel>
                            <InfoValue>{formatDate(order.arrival_date)}</InfoValue>
                          </InfoItem>

                          <InfoItem>
                            <IconWrapper>
                              <Calendar size={16} />
                            </IconWrapper>
                            <InfoLabel>領取期限</InfoLabel>
                            <InfoValue>{formatDate(order.due_date)}</InfoValue>
                          </InfoItem>
                        </OrderInfo>
                      </InfoGrid>
                    </OrderDetails>
                  </OrderCard>
                ))}
              </OrdersList>
            </>
          )}
        </ResultSection>
      </AdminContentContainer>
    </AdminContainer>
  );
};

export default OrderSearch;