// src/pages/consumer/components/OrderModal/styles.js
import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  text-align: center;
`;

export const OrderDetails = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #666;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TotalPrice = styled(DetailItem)`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  font-weight: bold;
  color: #6CB7AA;
  font-size: 1.2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  background-color: ${props => props.primary ? '#6CB7AA' : '#e0e0e0'};
  color: ${props => props.primary ? 'white' : '#666'};

  &:hover:not(:disabled) {
    background-color: ${props => props.primary ? '#5a9e93' : '#d0d0d0'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #e53935;
  padding: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
  background-color: #ffebee;
  border-radius: 4px;
`;