// src/pages/UserProfile/styles.js
import styled from '@emotion/styled';
import { 
  PageContainer, 
  PageHeader, 
  HeaderBackground, 
  HeaderContent,
  PageTitle,
  Card,
  Button
} from '../components/shared/styles';

// 繼承基礎組件
export const Container = PageContainer;
export const Header = styled(PageHeader)`
  padding: ${props => props.theme.spacing.xs} 0; // 縮小上下間距
`;
export const Title = styled(PageTitle)`
  font-size: 2rem; // 調整標題尺寸

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.75rem; // 手機版相應調整
  }
`;

export const ProfileContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
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
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${props => props.theme.borderRadius.full};
  border: 4px solid white;
  box-shadow: ${props => props.theme.shadows.md};
  background-color: ${props => props.theme.colors.placeholder};
  object-fit: cover;
`;

export const InfoContainer = styled(Card)`
  padding: ${props => props.theme.spacing.xl};
`;

export const InfoGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.small.fontSize};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  transition: all ${props => props.theme.transition.default};

  &:focus {
    outline: none;
    border-color: #6CB7AA;
    box-shadow: 0 0 0 3px rgba(108, 183, 170, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

export const SaveButton = styled(Button)`
  width: 100%;
  margin-top: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.md};
  font-size: 1.1rem;
`;

// 導出共享組件
export { HeaderBackground, HeaderContent };