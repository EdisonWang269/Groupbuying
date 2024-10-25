import styled from '@emotion/styled';

// 共用對話框容器樣式
export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

export const DialogContent = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.lg};
  padding: ${props => props.theme.spacing.xl};
`;

export const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const DialogTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  font-weight: 500;
  transition: all ${props => props.theme.transition.default};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  ${props => props.variant === 'primary' && `
    background-color: ${props.theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${props.theme.colors.primary}dd;
    }

    &:disabled {
      background-color: ${props.theme.colors.border};
      cursor: not-allowed;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: white;
    border: 1px solid ${props.theme.colors.border};
    color: ${props.theme.colors.text};

    &:hover {
      background-color: ${props.theme.colors.backgroundLight};
    }
  `}
`;

export const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};

  label {
    display: block;
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.typography.body.fontSize};
    transition: all ${props => props.theme.transition.default};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }
  }

  .helper-text {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
    margin-top: ${props => props.theme.spacing.xs};
  }
`;