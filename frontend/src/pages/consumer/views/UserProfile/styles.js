// src/pages/UserProfile/styles.js
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  min-height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.backgroundLight};
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 768px;
    margin: 0 auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Header = styled.header`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const ProfileContent = styled.div`
  width: 100%;
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.placeholder};
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const InfoGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
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
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  transition: border-color ${props => props.theme.transition.default};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;