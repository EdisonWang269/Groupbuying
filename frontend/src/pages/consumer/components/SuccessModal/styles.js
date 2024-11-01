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
  max-width: 400px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  color: #6CB7AA;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
`;

export const Message = styled.p`
  color: #666;
  margin: 0;
`;

export const Button = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #6CB7AA;
  color: white;

  &:hover {
    background-color: #5a9e93;
  }
`;