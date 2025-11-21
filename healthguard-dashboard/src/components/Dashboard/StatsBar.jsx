import styled from '@emotion/styled';
import { theme } from '../../config/theme';

const StatsBar = ({ alerts }) => {
  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    active: alerts.filter(a => a.status === 'active').length,
    resolved: alerts.filter(a => a.status === 'resolved').length
  };

  return (
    <Container>
      <StatCard>
        <Label>Total Alerts</Label>
        <Value>{stats.total}</Value>
      </StatCard>
      <StatCard>
        <Label>Critical</Label>
        <Value color={theme.colors.critical}>{stats.critical}</Value>
      </StatCard>
      <StatCard>
        <Label>Active</Label>
        <Value color={theme.colors.warning}>{stats.active}</Value>
      </StatCard>
      <StatCard>
        <Label>Resolved</Label>
        <Value color={theme.colors.success}>{stats.resolved}</Value>
      </StatCard>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Label = styled.div`
  font-size: 11px;
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Value = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.color || theme.colors.text.primary};
  font-family: ${theme.fonts.primary};
`;

export default StatsBar;
