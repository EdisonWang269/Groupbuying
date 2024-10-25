// src/pages/admin/components/ArrivalDialog/styles.js
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

  .product-name {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
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
  margin: 0;

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

export const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const DaysInputGroup = styled(InputGroup)`
  .helper-text {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
    margin-top: ${props => props.theme.spacing.xs};
  }

  input {
    width: 200px;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      width: 100%;
    }
  }
`;

export const InfoAlert = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => `${props.theme.colors.warning}15`};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.warning};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin-top: ${props => props.theme.spacing.lg};
`;