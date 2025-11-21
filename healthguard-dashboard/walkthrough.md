# HealthGuard Dashboard Walkthrough

## Overview
I have redesigned the HealthGuard Dashboard to align with Apple's design strategy, featuring a "Bento Grid" layout, glassmorphism, and refined typography. I also implemented GPS location tracking in the map component.

## Key Improvements
- **Apple Design Strategy**:
    - **Bento Grid Layout**: Modular, widget-based interface.
    - **Glassmorphism**: Heavy use of `backdrop-filter` and translucent backgrounds.
    - **Typography**: SF Pro Display style with clear hierarchy.
    - **Sidebar Navigation**: Cleaner navigation structure.
- **GPS Integration**:
    - The map now requests the user's geolocation.
    - Displays a "You are here" marker.
    - Centers on the user initially if no alerts are present.
- **Refined Components**:
    - **Alert Cards**: Redesigned as sleek widgets with vital stats.
    - **Map**: Dark mode tiles with custom "Apple Maps" style markers.
    - **Stats Bar**: Integrated into the grid layout.

## Project Structure
```
src/
├── components/
│   ├── Map/
│   │   └── MapContainer.jsx       # GPS-enabled Leaflet map
│   ├── AlertPanel/
│   │   ├── AlertList.jsx          # List container
│   │   └── AlertCard.jsx          # Widget-style alert card
│   └── Dashboard/
│       ├── DashboardLayout.jsx    # Sidebar + Bento Grid layout
│       └── StatsBar.jsx           # Stats widgets
├── hooks/
│   └── useRealtimeAlerts.js       # Firebase logic
├── config/
│   └── theme.js                   # Updated Apple-style tokens
└── index.css                      # Global styles
```

## How to Run
1.  **Navigate to the project directory:**
    ```bash
    cd healthguard-dashboard
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Design Notes
- The dashboard uses a pure black background (`#000000`) for OLED optimization.
- Surfaces use `rgba(28, 28, 30, 0.6)` to mimic iOS dark mode materials.
- Critical alerts pulse with a "breathing" animation.

## Next Steps
- Connect to a live Firebase instance.
- Add more interactive widgets (e.g., Drone camera feed).
