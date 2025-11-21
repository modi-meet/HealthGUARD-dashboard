import styled from '@emotion/styled';
import AlertCard from './AlertCard';

const AlertList = ({ alerts, onAcknowledge, onResolve }) => {
    return (
        <ListContainer>
            {alerts.length === 0 ? (
                <EmptyState>No Active Alerts</EmptyState>
            ) : (
                alerts.map(alert => (
                    <AlertCard
                        key={alert.id}
                        alert={alert}
                        onAcknowledge={onAcknowledge}
                        onResolve={onResolve}
                    />
                ))
            )}
        </ListContainer>
    );
};

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 40px;
`;

export default AlertList;
