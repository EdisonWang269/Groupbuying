// src/pages/admin/components/DateDialog/styles.js
import styled from '@emotion/styled';

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
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  svg {
    color: #6CB7AA;
  }
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
  }
`;

export const DateBox = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  p {
    margin: 0;
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};

    &.date {
      font-size: ${props => props.theme.typography.body.fontSize};
      color: ${props => props.theme.colors.text};
      font-weight: 500;
      margin-top: ${props => props.theme.spacing.xs};
    }
  }
`;

export const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;