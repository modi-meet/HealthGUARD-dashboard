import { useState, useEffect, useRef } from 'react';
import { ref, onValue, update, set } from 'firebase/database';
import { database } from '../services/firebase';
import { toast } from 'react-toastify';

export const useRealtimeAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const knownAlertIdsRef = useRef(new Set());
    const isFirstLoadRef = useRef(true);

    useEffect(() => {
        const alertsRef = ref(database, 'emergencies');

        const unsubscribe = onValue(alertsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const alertsArray = Object.entries(data).map(([id, alert]) => ({
                    id,
                    ...alert,
                    timestampDate: new Date(alert.timestamp * 1000)
                }));

                alertsArray.sort((a, b) => b.timestamp - a.timestamp);

                if (isFirstLoadRef.current) {
                    // First load: just populate known IDs, don't notify
                    alertsArray.forEach(a => knownAlertIdsRef.current.add(a.id));
                    isFirstLoadRef.current = false;
                } else {
                    // Subsequent updates: check for new critical alerts
                    const newCriticalAlerts = alertsArray.filter(
                        a => a.severity === 'critical' &&
                            !knownAlertIdsRef.current.has(a.id)
                    );

                    if (newCriticalAlerts.length > 0) {
                        toast.error(`🚨 New Critical Alert!`, { autoClose: 10000 });
                        playAlertSound();
                    }

                    // Update known IDs
                    alertsArray.forEach(a => knownAlertIdsRef.current.add(a.id));
                }

                setAlerts(alertsArray);
            } else {
                setAlerts([]);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firebase error:", err);
            setError(err);
            setLoading(false);
            toast.error("Failed to connect to Firebase");
        });

        return () => unsubscribe();
    }, []);

    return { alerts, loading, error, acknowledgeAlert, resolveAlert, simulateAlert };
};

const acknowledgeAlert = async (alertId) => {
    try {
        const alertRef = ref(database, `emergencies/${alertId}`);
        await update(alertRef, { status: 'acknowledged' });
        toast.success('Alert acknowledged');
    } catch (e) {
        console.error(e);
        toast.error('Failed to acknowledge alert');
    }
};

const resolveAlert = async (alertId) => {
    try {
        const alertRef = ref(database, `emergencies/${alertId}`);
        await update(alertRef, { status: 'resolved' });
        toast.success('Alert resolved');
    } catch (e) {
        console.error(e);
        toast.error('Failed to resolve alert');
    }
};

const simulateAlert = () => {
    const NAMES = ["Sarah Connor", "John Smith", "Emily Davis", "Michael Brown", "Jessica Wilson", "David Miller", "Robert Johnson", "Maria Garcia"];
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const id = `alert_${Date.now()}`;

    const testAlert = {
        userId: randomName,
        timestamp: Date.now() / 1000,
        severity: 'critical',
        status: 'active',
        location: {
            latitude: 12.9716 + (Math.random() - 0.5) * 0.1,
            longitude: 77.5946 + (Math.random() - 0.5) * 0.1
        },
        vitals: {
            heartRate: 150 + Math.floor(Math.random() * 30),
            spO2: 80 + Math.floor(Math.random() * 15),
            bloodPressure: `${140 + Math.floor(Math.random() * 40)}/${90 + Math.floor(Math.random() * 20)}`
        },
        droneDispatched: true,
        droneETA: Math.floor(Math.random() * 15) + 1
    };

    set(ref(database, `emergencies/${id}`), testAlert).catch(err => {
        console.error("Simulation failed", err);
        toast.error("Simulation failed: Check Firebase config");
    });
};

function playAlertSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.error("Audio play failed", e);
    }
}
