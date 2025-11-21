import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// User will replace these with their actual values
// For development/demo purposes, we will handle the case where config is missing gracefully in the app
const firebaseConfig = {
  apiKey: "AIzaSyDwakVvvFiSTa_FL9XNJnVYdyRWkD1Zf3A",
  authDomain: "heathguard-bmsit.firebaseapp.com",
  databaseURL: "https://heathguard-bmsit-default-rtdb.firebaseio.com",
  projectId: "heathguard-bmsit",
  storageBucket: "heathguard-bmsit.firebasestorage.app",
  messagingSenderId: "552767264006",
  appId: "1:552767264006:web:d229f509d4b1e00fe97a87"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
