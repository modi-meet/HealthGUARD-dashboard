# Firebase Setup Guide

To connect the HealthGuard Dashboard to a real backend, follow these steps:

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"** and follow the setup wizard.
3. Disable Google Analytics (optional) for simpler setup.

## 2. Enable Realtime Database
1. In the left sidebar, select **Build** > **Realtime Database**.
2. Click **Create Database**.
3. Select a location (e.g., United States).
4. Start in **Test Mode** (allows read/write access for 30 days).

## 3. Set Database Rules
Go to the **Rules** tab in Realtime Database and paste the following:

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "emergencies": {
      ".indexOn": ["timestamp", "status"]
    }
  }
}
```
*Note: In a production app, you should restrict write access.*

## 4. Get Configuration Keys
1. Click the **Settings (gear icon)** > **Project settings**.
2. Scroll down to "Your apps" and click the **Web (</>)** icon.
3. Register the app (e.g., "HealthGuard Web").
4. Copy the `firebaseConfig` object.

## 5. Update Code
Open `src/services/firebase.js` and replace the placeholder config with your keys:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456..."
};
```

## 6. Data Structure
The app expects data in the following format under the `/emergencies` node:

```json
{
  "emergencies": {
    "alert_id_1": {
      "userId": "device_123",
      "timestamp": 1700000000,
      "severity": "critical",
      "status": "active",
      "location": {
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      "vitals": {
        "heartRate": 120,
        "spO2": 95,
        "bloodPressure": "120/80"
      },
      "droneDispatched": false
    }
  }
}
```
