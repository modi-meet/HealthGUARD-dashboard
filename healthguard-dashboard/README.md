# HealthGUARD Dashboard

## Overview

HealthGUARD Dashboard is a lightweight web dashboard that receives critical vitals data from iOS devices (via Firebase Realtime Database) and visualizes alerts, statistics, and geolocation on an interactive map. It helps clinicians and support teams monitor real-time patient vitals and respond quickly to out-of-range events.

## Problem

Monitoring many remote iOS devices for abnormal vitals is challenging: developers need a reliable, low-latency way to collect telemetry from devices, identify critical events, and present the information clearly to operators.

## Solution

This project uses Firebase Realtime Database as the ingestion point for iOS vitals. The dashboard listens for changes (alerts) and displays them in real time with contextual details and a map view for location-aware triage.

- iOS app: pushes vitals and alert records to Firebase Realtime Database.
- Dashboard: connects to Firebase, listens for new or changed alerts, and updates the UI instantly.

## How it Works (Data Flow)

1. The iOS client sends vitals (heart rate, blood oxygen, location, etc.) to the Firebase Realtime Database.
2. The dashboard (`src`) uses the Firebase SDK to subscribe to the relevant database paths and receive updates.
3. A custom hook (`src/hooks/useRealtimeAlerts.js`) processes incoming records and surfaces them to React components.
4. UI components render the list of alerts (`src/components/AlertPanel`), a stats bar, and a map (`src/components/Map/MapContainer.jsx`) using Leaflet.

## Tech Stack

- **Frontend:** React + Vite
- **Realtime Backend / Data:** Firebase Realtime Database (`firebase` package)
- **Mapping:** Leaflet with `react-leaflet`
- **Styling:** Plain CSS files in `src` (see `App.css`, `index.css`)
- **Utilities:** `date-fns`, `react-toastify`, and `@emotion` packages

Key dependencies are listed in `package.json`.

## Key Files

- `src/services/firebase.js` — Firebase initialization (uses Vite env vars).
- `src/hooks/useRealtimeAlerts.js` — Hook that subscribes to the Realtime Database and exposes alerts.
- `src/components/AlertPanel/AlertList.jsx` & `AlertCard.jsx` — UI for listing alerts.
- `src/components/Map/MapContainer.jsx` — Map rendering for alert locations.
- `src/App.jsx`, `src/main.jsx` — App entry and layout.

## Environment & Setup

1. Create a `.env` file at the project root and add your Firebase config using Vite env keys.

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Install dependencies:

```
npm install
```

3. Run development server:

```
npm run dev
```

4. Build for production:

```
npm run build
```

5. Preview production build locally:

```
npm run preview
```

## Firebase Notes

- This project uses the Firebase Realtime Database (see `src/services/firebase.js`).
- Ensure your iOS client writes alerts to predictable paths in the Realtime Database so the dashboard hook can listen for them.
- The file `src/services/firebase.js` reads config from Vite env vars (prefixed with `VITE_`).

## Development Notes

- Map functionality uses Leaflet (`leaflet`, `react-leaflet`); check `src/components/Map/MapContainer.jsx` for tile provider configuration.
- Alerts are surfaced via `src/hooks/useRealtimeAlerts.js`. To simulate incoming data, push test objects into your Realtime Database manually.

## Contributing

- Open issues for bugs or feature requests.
- Create PRs against `main`. Keep changes focused and small.

## License

This repository does not include an explicit license file. Add a `LICENSE` if you plan to open-source it.

---

If you'd like, I can also:
- add a `.env.example` with required keys,
- add a small mock generator to push test alerts to Firebase for local testing, or
- produce a short developer doc for `useRealtimeAlerts.js`.

Tell me which next step you'd like.
