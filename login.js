// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCo-MFvDseBprJmw8-c07UlIngJSK7lU5A",
    authDomain: "mentorhive-afa8e.firebaseapp.com",
    projectId: "mentorhive-afa8e",
    storageBucket: "mentorhive-afa8e.firebasestorage.app",
    messagingSenderId: "423656256820",
    appId: "1:423656256820:web:3ff4d9274739ea6e0fa161"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Functionality
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const submitButton = document.getElementById("submit-button");

  // Basic input validation
  if (!email || !password) {
    alert("Please enter both an email and a password.");
    return;
  }

  // Disable the submit button to prevent multiple clicks
  submitButton.disabled = true;
  submitButton.textContent = "Logging In...";

  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Success feedback
    console.log("User logged in successfully:", user);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        window.location.href = "hub.html"; // Redirect to hub
      } catch (error) {
        console.error("Login error:", error);
        alert("Failed to log in: " + error.message);
      }
      
  } catch (error) {
    console.error("Error during login:", error.code, error.message);

    // User-friendly error messages
    let errorMessage;
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email address.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        break;
      default:
        errorMessage = "An unexpected error occurred. Please try again.";
    }

    alert(errorMessage);
  } finally {
    // Reset the button state
    submitButton.disabled = false;
    submitButton.textContent = "Log In";
  }
});