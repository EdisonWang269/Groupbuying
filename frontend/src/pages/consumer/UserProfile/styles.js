// src/pages/UserProfile/styles.js
import styled from '@emotion/styled';
import { 
  PageContainer, 
  PageHeader, 
  HeaderBackground, 
  HeaderContent,
  PageTitle,
  Card,
} from '../components/shared/styles';

// 繼承基礎組件
export const Container = PageContainer;
export const Header = styled(PageHeader)`
  padding: ${props => props.theme.spacing.xs} 0;
`;
export const Title = styled(PageTitle)`
  font-size: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const ProfileContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.full};
  border: 4px solid white;
  box-shadow: ${props => props.theme.shadows.md};
  background-color: ${props => props.theme.colors.placeholder};
  object-fit: cover;
`;

export const InfoContainer = styled(Card)`
  padding: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.small.fontSize};
`;

export const StaticInfo = styled.div`
  padding: 0.75rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#e53935' : '#e0e0e0'};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#e53935' : '#6CB7AA'};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: ${props => props.theme.spacing.xl};
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const EditButton = styled(BaseButton)`
  background-color: ${props => props.primary ? '#6CB7AA' : '#e0e0e0'};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.primary ? '#5a9e93' : '#bdbdbd'};
  }
`;

export const SaveButton = styled(BaseButton)`
  background-color: ${props => props.primary ? '#6CB7AA' : '#e0e0e0'};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.primary ? '#5a9e93' : '#bdbdbd'};
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: #e0e0e0;
  color: #424242;

  &:hover:not(:disabled) {
    background-color: #bdbdbd;
  }
`;

export const FormError = styled.span`
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const ErrorMessage = styled.div`
  color: #e53935;
  background-color: #ffebee;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
`;

export const SuccessMessage = styled.div`
  color: #2e7d32;
  background-color: #e8f5e9;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
`;

export { HeaderBackground, HeaderContent };