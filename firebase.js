import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCo-MFvDseBprJmw8-c07UlIngJSK7lU5A",
    authDomain: "mentorhive-afa8e.firebaseapp.com",
    databaseURL: "https://mentorhive-afa8e-default-rtdb.firebaseio.com",
    projectId: "mentorhive-afa8e",
    storageBucket: "mentorhive-afa8e.firebasestorage.app",
    messagingSenderId: "423656256820",
    appId: "1:423656256820:web:3ff4d9274739ea6e0fa161"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
