import React, { useState, useEffect } from 'react';
import { Calendar, Truck, Package } from 'lucide-react';
import {
  AdminContainer,
  AdminHeader,
  AdminHeaderBackground,
  AdminHeaderContent,
  AdminTitle,
  AdminContentContainer,
  IconWrapper
} from '../../../components/shared/styles';
import {
  ProductCard,
  ProductInfo,
  ProductTitle,
  InfoRow,
  SetArrivalButton,
  OrderSummary,
  OrderSummaryTitle,
  OrderSummaryContent,
  OrderAmount,
  OrderCount
} from './styles';
import ArrivalDialog from '../dialogs/ArrivalDialog';

const PhaseTwo = () => {
  const [showArrivalDialog, setShowArrivalDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 模擬數據，實際使用時需要從API獲取
  const products = [
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      statement_date: '2024/05/15',
      total_orders: 50,
      total_amount: 12000
    },
    {
      id: 2,
      name: '特製泡芙',
      price: 180,
      statement_date: '2024/05/20',
      total_orders: 30,
      total_amount: 5400
    },
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      statement_date: '2024/05/15',
      total_orders: 50,
      total_amount: 12000
    },
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      statement_date: '2024/05/15',
      total_orders: 50,
      total_amount: 12000
    },
    {
      id: 1,
      name: '香酥芋泥蛋糕',
      price: 240,
      statement_date: '2024/05/15',
      total_orders: 50,
      total_amount: 12000
    }
  ];

  useEffect(() => {
    const updatePurchaseQuantity = async (productId, quantity) => {
      try {
        await fetch(`/api/products/${productId}/quantity`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            purchase_quantity: quantity
          })
        });
      } catch (error) {
        console.error('更新訂購數量失敗:', error);
      }
    };

    products.forEach(product => {
      updatePurchaseQuantity(product.id, product.total_orders);
    });
  }, []);

  const handleSetArrival = (product) => {
    setSelectedProduct(product);
    setShowArrivalDialog(true);
  };

  const handleConfirmArrival = async (arrivalData) => {
    try {
      await fetch(`/api/products/${selectedProduct.id}/arrival`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arrival_date: arrivalData.arrivalDate,
          due_days: arrivalData.dueDays
        })
      });

      setShowArrivalDialog(false);
      setSelectedProduct(null);
      // 這裡應該要重新獲取商品列表
    } catch (error) {
      console.error('設定到貨資訊失敗:', error);
    }
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
          <AdminTitle>等待到貨商品</AdminTitle>
        </AdminHeaderContent>
      </AdminHeader>

      <AdminContentContainer>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              
              <InfoRow>
                <span>單價：${product.price}</span>
                <OrderCount>總訂購數：{product.total_orders}</OrderCount>
                <OrderAmount>總金額：${product.total_amount}</OrderAmount>
              </InfoRow>
              
              <InfoRow isDateRow>
                <IconWrapper>
                  <Calendar size={16} />
                </IconWrapper>
                <span>結單日期：{product.statement_date}</span>
              </InfoRow>

              <OrderSummary>
                <OrderSummaryTitle>
                  <IconWrapper>
                    <Package size={16} />
                  </IconWrapper>
                  訂單摘要
                </OrderSummaryTitle>
                <OrderSummaryContent>
                  <div>總訂購數量：{product.total_orders} 件</div>
                  <div>總訂購金額：${product.total_amount}</div>
                </OrderSummaryContent>
              </OrderSummary>

              <SetArrivalButton
                onClick={() => handleSetArrival(product)}
              >
                <IconWrapper>
                  <Truck size={18} />
                </IconWrapper>
                設定到貨資訊
              </SetArrivalButton>
            </ProductInfo>
          </ProductCard>
        ))}

        <ArrivalDialog
          isOpen={showArrivalDialog}
          onClose={() => setShowArrivalDialog(false)}
          onConfirm={handleConfirmArrival}
          product={selectedProduct}
        />
      </AdminContentContainer>
    </AdminContainer>
  );
};

export default PhaseTwo;