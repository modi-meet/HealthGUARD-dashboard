import styled from '@emotion/styled';
import { theme } from '../../config/theme';

const ViewContainer = styled.div`
  padding: 20px;
  color: ${theme.colors.text.primary};
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Placeholder = styled.div`
  background: ${theme.colors.surface};
  padding: 40px;
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
`;

export const HistoryView = () => (
    <ViewContainer>
        <Title>Alert History</Title>
        <Placeholder>
            History logs will appear here.
            <br /><br />
            (Connect Firebase to see past alerts)
        </Placeholder>
    </ViewContainer>
);

export const DronesView = () => (
    <ViewContainer>
        <Title>Drone Fleet Status</Title>
        <Placeholder>
            Drone fleet map and telemetry will appear here.
        </Placeholder>
    </ViewContainer>
);

export const SettingsView = () => (
    <ViewContainer>
        <Title>System Settings</Title>
        <Placeholder>
            Configuration options for alerts, map, and user profile.
        </Placeholder>
    </ViewContainer>
);
