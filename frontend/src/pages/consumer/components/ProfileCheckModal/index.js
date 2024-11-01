import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalOverlay, ModalContainer, Title, Content, MessageBox, ButtonGroup, Button } from './styles';

const ProfileCheckModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleProfile = () => {
    localStorage.setItem('returnPath', window.location.pathname);
    navigate('/profile');
    onClose();
  };

  const handleLater = () => {
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={handleClick}>
        <Title>請填寫個人資料</Title>

        <Content>
          <MessageBox>
            請填寫姓名和聯絡電話後再下單。
          </MessageBox>

          <ButtonGroup>
            <Button onClick={handleLater}>
              稍後設定
            </Button>
            <Button onClick={handleProfile} primary>
              立即填寫
            </Button>
          </ButtonGroup>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileCheckModal;