import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRealtimeAlerts } from '../../hooks/useRealtimeAlerts';
import StatsBar from './StatsBar';
import HealthMap from '../Map/MapContainer';
import AlertList from '../AlertPanel/AlertList';
import { HistoryView, DronesView, SettingsView } from '../Views/PlaceholderViews';
import { theme } from '../../config/theme';

const DashboardLayout = () => {
  const { alerts, loading, acknowledgeAlert, resolveAlert, simulateAlert } = useRealtimeAlerts();
  const [activeTab, setActiveTab] = useState('dashboard');

  const activeCount = alerts.filter(a => a.status === 'active').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryView />;
      case 'drones':
        return <DronesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <BentoGrid>
            {/* Map Widget - Large */}
            <MapWidget>
              <HealthMap alerts={alerts} />
              <WidgetOverlay>
                <WidgetTitle>Live Map</WidgetTitle>
              </WidgetOverlay>
            </MapWidget>

            {/* Stats Widget - Small Horizontal */}
            <StatsWidget>
              <StatsBar alerts={alerts} />
            </StatsWidget>

            {/* Alerts Widget - Vertical Scroll */}
            <AlertsWidget>
              <WidgetHeader>
                <WidgetTitle>Active Alerts</WidgetTitle>
                <Badge>{activeCount}</Badge>
              </WidgetHeader>
              <AlertList
                alerts={alerts}
                onAcknowledge={acknowledgeAlert}
                onResolve={resolveAlert}
              />
            </AlertsWidget>
          </BentoGrid>
        );
    }
  };

  return (
    <Layout>
      <Sidebar>
        <BrandSection>
          <LogoIcon>⚡️</LogoIcon>
          <LogoText>HealthGuard</LogoText>
        </BrandSection>

        <NavMenu>
          <NavItem
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </NavItem>
          <NavItem
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          >
            History
          </NavItem>
          <NavItem
            active={activeTab === 'drones'}
            onClick={() => setActiveTab('drones')}
          >
            Drones
          </NavItem>
          <NavItem
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </NavItem>
        </NavMenu>

        <SidebarFooter>
          <StatusDot connected={!loading} />
          <StatusText>{!loading ? 'System Online' : 'Connecting...'}</StatusText>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <TopBar>
          <PageTitle>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </PageTitle>
          <ActionGroup>
            <SimulateButton onClick={simulateAlert}>
              Simulate Emergency
            </SimulateButton>
            <Avatar>OP</Avatar>
          </ActionGroup>
        </TopBar>

        {renderContent()}
      </MainContent>
    </Layout>
  );
};

// Styled Components
const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
`;

const Sidebar = styled.aside`
  width: 260px;
  background: rgba(28, 28, 30, 0.4);
  backdrop-filter: blur(20px);
  border-right: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  z-index: 10;
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
`;

const LogoIcon = styled.div`
  font-size: 24px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primary}88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoText = styled.h1`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const NavItem = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.text.secondary};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }
`;

const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid ${theme.colors.border};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.connected ? theme.colors.success : theme.colors.critical};
  box-shadow: 0 0 8px ${props => props.connected ? theme.colors.success : theme.colors.critical};
`;

const StatusText = styled.span`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SimulateButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #32D74B, #0A84FF);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 24px;
  flex: 1;
  min-height: 0; /* Important for nested scrolling */
`;

const MapWidget = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  position: relative;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.colors.shadows};
`;

const WidgetOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 400;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
`;

const StatsWidget = styled.div`
  grid-column: 2;
  grid-row: 1;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  padding: 20px;
  border: 1px solid ${theme.colors.border};
  height: fit-content;
`;

const AlertsWidget = styled.div`
  grid-column: 2;
  grid-row: 2;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const WidgetHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WidgetTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const Badge = styled.span`
  background: ${theme.colors.critical};
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
`;

export default DashboardLayout;
