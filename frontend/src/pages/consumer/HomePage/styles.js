// src/pages/HomePage/styles.js
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { 
  PageContainer, 
  PageHeader, 
  HeaderBackground, 
  HeaderContent,
  PageTitle
} from '../components/shared/styles';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const Container = PageContainer;
export const Header = styled(PageHeader)`
  margin-bottom: 20px;
`;

export const Title = styled(PageTitle)`
  font-size: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

export const TitleHighlight = styled.span`
  margin-left: 4px;
  color: white;
  user-select: none;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  transition: all ${props => props.theme.transition.default};
  
  &:focus-within {
    transform: translateY(-1px);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 2;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.95rem;
  background: white;
  transition: all ${props => props.theme.transition.default};
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows.md};
  }

  &::placeholder {
    color: #88C5BA;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 24px 16px;
  }
`;

export const NoResultsMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 20px;
  color: #666666;
  font-size: 1.1rem;
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  color: #e53935;

  button {
    padding: 0.5rem 1rem;
    background-color: #6CB7AA;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #5a9e93;
    }
  }
`;

export { HeaderBackground, HeaderContent };