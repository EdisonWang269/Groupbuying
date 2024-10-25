// src/components/dialogs/ArrivalDialog/styles.js
import styled from '@emotion/styled';
import { InputGroup } from '../common/styles';

export const DaysInputGroup = styled(InputGroup)`
  input {
    width: 200px;
  }
`;

export const InfoAlert = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => `${props.theme.colors.warning}10`};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.warning};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin-top: ${props => props.theme.spacing.lg};
`;