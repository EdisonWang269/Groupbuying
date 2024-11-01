import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ModalOverlay, ModalContainer, SuccessIcon, Title, Message, Button } from './styles';

const SuccessModal = ({ onClose }) => {
    return (
      <ModalOverlay>
        <ModalContainer>
          <SuccessIcon>
            <CheckCircle size={48} />
          </SuccessIcon>
          <Title>購買成功！</Title>
          <Message>您的訂單已成功送出</Message>
          <Button onClick={onClose}>
            確定
          </Button>
        </ModalContainer>
      </ModalOverlay>
    );
  };
  
  export default SuccessModal;