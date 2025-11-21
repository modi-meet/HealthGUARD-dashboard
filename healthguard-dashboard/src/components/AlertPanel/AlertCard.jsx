import styled from '@emotion/styled';
import { theme } from '../../config/theme';
import { formatDistanceToNow } from 'date-fns';

const AlertCard = ({ alert, onAcknowledge, onResolve }) => {
  return (
    <Card critical={alert.severity === 'critical'}>
      <CardHeader>
        <UserInfo>
          <UserAvatar critical={alert.severity === 'critical'}>
            {alert.userId.substring(0, 2).toUpperCase()}
          </UserAvatar>
          <div>
            <UserId>ID: {alert.userId.substring(0, 8)}</UserId>
            <TimeAgo>{formatDistanceToNow(alert.timestampDate, { addSuffix: true })}</TimeAgo>
          </div>
        </UserInfo>
        <StatusBadge status={alert.status}>{alert.status}</StatusBadge>
      </CardHeader>

      <VitalsContainer>
        <VitalItem>
          <VitalLabel>HR</VitalLabel>
          <VitalValue critical={alert.vitals.heartRate > 150 || alert.vitals.heartRate < 40}>
            {alert.vitals.heartRate}
            <Unit>bpm</Unit>
          </VitalValue>
        </VitalItem>
        <VitalItem>
          <VitalLabel>SpO2</VitalLabel>
          <VitalValue critical={alert.vitals.spO2 < 90}>
            {alert.vitals.spO2}
            <Unit>%</Unit>
          </VitalValue>
        </VitalItem>
        <VitalItem>
          <VitalLabel>BP</VitalLabel>
          <VitalValue>
            {alert.vitals.bloodPressure}
          </VitalValue>
        </VitalItem>
      </VitalsContainer>

      {alert.droneDispatched && (
        <DroneInfo>
          <span>🚁 Drone ETA</span>
          <strong>{alert.droneETA} min</strong>
        </DroneInfo>
      )}

      {alert.status === 'active' && (
        <ActionGrid>
          <ActionButton
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onAcknowledge(alert.id); }}
          >
            Acknowledge
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={(e) => { e.stopPropagation(); onResolve(alert.id); }}
          >
            Resolve
          </ActionButton>
        </ActionGrid>
      )}
    </Card>
  );
};

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid ${props => props.critical ? 'rgba(255, 69, 58, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;

  ${props => props.critical && `
    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 4px;
        background: ${theme.colors.critical};
    }
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-left: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.critical ? theme.colors.critical : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: white;
`;

const UserId = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const TimeAgo = styled.div`
  font-size: 11px;
  color: ${theme.colors.text.secondary};
`;

const StatusBadge = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${props => props.status === 'active' ? 'rgba(255, 69, 58, 0.1)' : 'rgba(50, 215, 75, 0.1)'};
  color: ${props => props.status === 'active' ? theme.colors.critical : theme.colors.success};
`;

const VitalsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 12px;
`;

const VitalItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VitalLabel = styled.span`
  font-size: 10px;
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const VitalValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.critical ? theme.colors.critical : theme.colors.text.primary};
`;

const Unit = styled.span`
  font-size: 10px;
  color: ${theme.colors.text.secondary};
  margin-left: 2px;
  font-weight: 400;
`;

const DroneInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${theme.colors.primary};
  background: rgba(10, 132, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const ActionButton = styled.button`
  border: none;
  padding: 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: ${theme.colors.success};
    color: white;
    &:hover { opacity: 0.9; }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    &:hover { background: rgba(255, 255, 255, 0.2); }
  `}
`;

export default AlertCard;
