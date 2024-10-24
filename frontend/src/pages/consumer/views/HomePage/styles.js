// src/pages/HomePage/styles.js
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

export const Header = styled.header`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`;

export const SearchBar = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.typography.body.fontSize};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;