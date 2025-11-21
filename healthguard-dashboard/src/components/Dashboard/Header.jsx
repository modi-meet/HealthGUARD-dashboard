import styled from '@emotion/styled';
import { theme } from '../../config/theme';

const Header = ({ connected, activeCount, criticalCount, onSimulate }) => {
    return (
        <HeaderContainer>
            <LogoSection>
                <Logo>HealthGuard</Logo>
                <StatusIndicator connected={connected}>
                    {connected ? '🟢 Connected' : '🔴 Disconnected'}
                </StatusIndicator>
            </LogoSection>

            <StatsSection>
                <Badge color={theme.colors.critical}>
                    {criticalCount} Critical
                </Badge>
                <Badge color={theme.colors.warning}>
                    {activeCount} Active
                </Badge>
                <SimulateButton onClick={onSimulate}>
                    Simulate Alert
                </SimulateButton>
            </StatsSection>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  height: 64px;
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  backdrop-filter: blur(10px);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.5px;
`;

const StatusIndicator = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.connected ? theme.colors.success : theme.colors.critical};
  background: ${props => props.connected ? theme.colors.success + '1A' : theme.colors.critical + '1A'};
  padding: 4px 8px;
  border-radius: 12px;
`;

const StatsSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Badge = styled.div`
  background: ${props => props.color};
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px ${props => props.color}40;
`;

const SimulateButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.primary}1A;
  }
`;

export default Header;
