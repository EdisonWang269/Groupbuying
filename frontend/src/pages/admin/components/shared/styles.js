// src/pages/admin/components/shared/styles.js
import styled from '@emotion/styled';

export const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const AdminHeader = styled.header`
  position: relative;
  background: linear-gradient(135deg, #6CB7AA 0%, #4A90A0 100%);
  padding: ${props => props.theme.spacing.xl} 0;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const AdminHeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  
  .circle {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
  }

  .circle-2 {
    width: 200px;
    height: 200px;
    top: -100px;
    right: -100px;
  }

  .circle-3 {
    width: 150px;
    height: 150px;
    bottom: -75px;
    right: 10%;
  }
`;

export const AdminHeaderContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.xl};
`;

export const AdminTitle = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const AdminContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

export const AdminCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

export const AdminInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  transition: all ${props => props.theme.transition.default};

  &:focus {
    outline: none;
    border-color: #6CB7AA;
    box-shadow: 0 0 0 4px rgba(108, 183, 170, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.backgroundLight};
    cursor: not-allowed;
  }
`;

export const AdminTextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all ${props => props.theme.transition.default};

  &:focus {
    outline: none;
    border-color: #6CB7AA;
    box-shadow: 0 0 0 4px rgba(108, 183, 170, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

export const AdminButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  font-weight: 500;
  transition: all ${props => props.theme.transition.default};
  border: none;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const AdminPrimaryButton = styled(AdminButton)`
  background-color: #6CB7AA;
  color: white;

  &:hover:not(:disabled) {
    background-color: #5ea99c;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

export const AdminSecondaryButton = styled(AdminButton)`
  background-color: white;
  border: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};

  &:hover {
    background-color: ${props => props.theme.colors.backgroundLight};
    border-color: #6CB7AA;
    color: #6CB7AA;
  }
`;

export const AdminLabel = styled.label`
  display: block;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 500;
`;

export const AdminErrorMessage = styled.div`
  background-color: ${props => `${props.theme.colors.primary}15`};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.small.fontSize};
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusTag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.small.fontSize};
  font-weight: 500;
  
  ${props => props.status ? `
    background-color: ${props.theme.colors.success}15;
    color: ${props.theme.colors.success};
  ` : `
    background-color: ${props.theme.colors.warning}15;
    color: ${props.theme.colors.warning};
  `}
`;

export const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
  }

  .currency {
    position: absolute;
    left: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
  }

  input {
    padding-left: ${props => props.theme.spacing.xl};
  }
`;