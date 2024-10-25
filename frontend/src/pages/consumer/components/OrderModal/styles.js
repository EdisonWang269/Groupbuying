// src/components/OrderModal/styles.js
import styled from '@emotion/styled';
import { 
  Overlay as BaseOverlay,
  Card,
  Button as BaseButton
} from '../shared/styles';

export const Overlay = styled(BaseOverlay)``;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 360px;
  position: relative;
  animation: ${props => props.theme.animations?.slideUp || 'none'} 0.3s ease-out;
`;

export const Content = styled(Card)`
  padding: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

export const CloseButton = styled(BaseButton)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 32px;
  height: 32px;
  padding: 0;
  background: white;
  z-index: 1;

  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
    transform: scale(1.1);
  }
`;

export const Title = styled.h3`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

export const OrderDetails = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};

  &:last-of-type {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const TotalPrice = styled(DetailItem)`
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  font-weight: bold;
  color: #6CB7AA;
  font-size: 1.2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

export const Button = styled(BaseButton)`
  flex: 1;
`;