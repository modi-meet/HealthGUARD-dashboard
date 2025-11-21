import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { theme } from '../../config/theme';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock hospital data
const hospitals = [
    { id: 1, name: 'Manipal Hospital', lat: 12.9592, lng: 77.6482, drones: 2 },
    { id: 2, name: 'Apollo Hospital', lat: 12.9345, lng: 77.6101, drones: 1 },
    { id: 3, name: 'Aster CMI Hospital', lat: 13.0569, lng: 77.5918, drones: 3 }
];

// Custom Icons - Apple Maps Style
const createCriticalIcon = () => L.divIcon({
    className: 'critical-marker',
    html: `<div style="
    background: ${theme.colors.critical}; 
    width: 24px; height: 24px; 
    border-radius: 50%; 
    box-shadow: 0 0 20px ${theme.colors.critical}, 0 0 0 4px rgba(255, 69, 58, 0.3); 
    border: 3px solid white;">
  </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const createNormalIcon = () => L.divIcon({
    className: 'normal-marker',
    html: `<div style="
    background: ${theme.colors.primary}; 
    width: 18px; height: 18px; 
    border-radius: 50%; 
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
  </div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
});

const createHospitalIcon = () => L.divIcon({
    className: 'hospital-marker',
    html: `<div style="
    background: white; 
    width: 28px; height: 28px; 
    border-radius: 8px; 
    display: flex; align-items: center; justify-content: center; 
    font-weight: 800; color: ${theme.colors.critical};
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    font-family: -apple-system;">
    H
  </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});

const createUserLocationIcon = () => L.divIcon({
    className: 'user-location-marker',
    html: `<div style="
      background: #007AFF; 
      width: 20px; height: 20px; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 0 15px rgba(0, 122, 255, 0.5);">
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Component to handle map centering and user location
const MapController = ({ center, userLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, 14, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        }
    }, [center, map]);

    return null;
};

const HealthMap = ({ alerts }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default Bengaluru

    // Get User Location via GPS
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    // If no alerts, center on user
                    if (alerts.length === 0) {
                        setMapCenter([latitude, longitude]);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, [alerts.length]);

    // Update center if there's a critical alert
    useEffect(() => {
        const latestCritical = alerts.find(a => a.severity === 'critical' && a.status === 'active');
        if (latestCritical) {
            setMapCenter([latestCritical.location.latitude, latestCritical.location.longitude]);
        } else if (alerts.length > 0) {
            // Center on latest alert if no critical ones
            setMapCenter([alerts[0].location.latitude, alerts[0].location.longitude]);
        }
    }, [alerts]);

    // Find nearest hospital for the latest critical alert
    const activeCriticalAlert = alerts.find(a => a.severity === 'critical' && a.status === 'active');

    const routeLine = useMemo(() => {
        if (!activeCriticalAlert) return null;

        let nearest = hospitals[0];
        let minDist = Infinity;

        hospitals.forEach(h => {
            const d = Math.sqrt(
                Math.pow(h.lat - activeCriticalAlert.location.latitude, 2) +
                Math.pow(h.lng - activeCriticalAlert.location.longitude, 2)
            );
            if (d < minDist) {
                minDist = d;
                nearest = h;
            }
        });

        return [
            [activeCriticalAlert.location.latitude, activeCriticalAlert.location.longitude],
            [nearest.lat, nearest.lng]
        ];
    }, [activeCriticalAlert]);

    return (
        <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%', background: '#000000' }}
            zoomControl={false} // We'll add custom controls if needed, or keep it clean
        >
            {/* Dark Matter Tiles for Apple-like dark mode look */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap &copy; CARTO'
            />

            <MapController center={mapCenter} userLocation={userLocation} />

            {/* User Location Marker */}
            {userLocation && (
                <>
                    <Marker position={userLocation} icon={createUserLocationIcon()}>
                        <Popup>You are here</Popup>
                    </Marker>
                    <Circle
                        center={userLocation}
                        radius={500}
                        pathOptions={{ color: '#007AFF', fillColor: '#007AFF', fillOpacity: 0.1, weight: 1 }}
                    />
                </>
            )}

            {/* Hospital Markers */}
            {hospitals.map(h => (
                <Marker key={`h-${h.id}`} position={[h.lat, h.lng]} icon={createHospitalIcon()}>
                    <Popup className="apple-popup">
                        <strong>{h.name}</strong><br />
                        Drones available: {h.drones}
                    </Popup>
                </Marker>
            ))}

            {/* Alert Markers */}
            {alerts.map(alert => (
                <Marker
                    key={alert.id}
                    position={[alert.location.latitude, alert.location.longitude]}
                    icon={alert.severity === 'critical' ? createCriticalIcon() : createNormalIcon()}
                >
                    <Popup className="apple-popup">
                        <div style={{ fontFamily: '-apple-system' }}>
                            <strong style={{ color: alert.severity === 'critical' ? theme.colors.critical : 'black' }}>
                                {alert.severity.toUpperCase()}
                            </strong><br />
                            HR: {alert.vitals.heartRate}
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Route Line */}
            {routeLine && (
                <Polyline
                    positions={routeLine}
                    color={theme.colors.primary}
                    dashArray="8, 8"
                    weight={3}
                    opacity={0.8}
                />
            )}
        </MapContainer>
    );
};

export default HealthMap;
