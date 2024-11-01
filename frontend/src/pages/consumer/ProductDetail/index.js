import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { orderAPI, userAPI } from '../../../api';
import OrderModal from '../components/OrderModal';
import SuccessModal from '../components/SuccessModal';
import ProfileCheckModal from '../components/ProfileCheckModal';
import LoadingSpinner from '../../../components/LoadingSpinner';
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
  DescriptionText,
  ErrorContainer
} from './styles';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [userProfileChecking, setUserProfileChecking] = useState(false);

  useEffect(() => {
    const loadProduct = () => {
      setLoading(true);
      try {
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const foundProduct = storedProducts.find(p => p.product_id === parseInt(id));
        
        if (!foundProduct) {
          setError('找不到商品資訊');
          return;
        }

        setProduct(foundProduct);
      } catch (err) {
        setError('載入商品資訊時發生錯誤');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const checkUserProfile = async () => {
    if (!isAuthenticated) {
      setOrderError('請先登入再進行購買');
      return false;
    }

    try {
      setUserProfileChecking(true);
      const response = await userAPI.getUserInfo(user.userid);
      if (!response.user_name || !response.phone) {
        setShowProfileModal(true);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error checking user profile:', err);
      setOrderError('檢查用戶資料時發生錯誤');
      return false;
    } finally {
      setUserProfileChecking(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOrderClick = async () => {
    const isProfileComplete = await checkUserProfile();
    if (isProfileComplete) {
      setShowOrderModal(true);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      setOrderLoading(true);
      setOrderError(null);
      
      if (!product.product_id) {
        throw new Error('無效的商品資訊');
      }

      const orderData = {
        product_id: parseInt(product.product_id),
        quantity: parseInt(quantity)
      };

      const response = await orderAPI.createOrder(orderData);
      if (response?.message === 'Order created successfully' || 
          response?.message === 'Order quantity updated successfully') {
        setShowOrderModal(false);
        setShowSuccessModal(true);
        setQuantity(1);
      } else {
        throw new Error('訂單建立失敗');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setOrderError(err.message || '建立訂單失敗，請稍後再試');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          {error}
          <button onClick={() => navigate('/')}>返回首頁</button>
        </ErrorContainer>
      </Container>
    );
  }

  if (!product) {
    return null;
  }

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
            src={product.product_picture}
            alt={product.product_name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-product-image.jpg';
            }}
          />
        </ImageWrapper>
        
        <Content>
          <ProductInfo>
            <ProductTitle>{product.product_name}</ProductTitle>
            <Price>NT$ {product.price} /{product.unit}</Price>
            <StatementDate>
              結單日期：{product.statement_date}
            </StatementDate>
            
            {product.product_describe && (
              <Description>
                <DescriptionTitle>商品說明</DescriptionTitle>
                <DescriptionText>
                  {product.product_describe}
                </DescriptionText>
              </Description>
            )}

            <QuantitySelector>
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || orderLoading || userProfileChecking}
              >
                －
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={orderLoading || userProfileChecking}
              >
                ＋
              </button>
            </QuantitySelector>
            
            <OrderButton 
              primary 
              onClick={handleOrderClick}
              disabled={orderLoading || userProfileChecking}
            >
              {orderLoading ? '處理中...' : 
               userProfileChecking ? '檢查中...' : 
               '立即下單'}
            </OrderButton>
          </ProductInfo>
        </Content>
      </MainContent>

      {showProfileModal && (
        <ProfileCheckModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showOrderModal && (
        <OrderModal
          onClose={() => {
            setShowOrderModal(false);
            setOrderError(null);
          }}
          onConfirm={handleOrderSubmit}
          loading={orderLoading}
          error={orderError}
          product={product}
          quantity={quantity}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </Container>
  );
};

export default ProductDetail;