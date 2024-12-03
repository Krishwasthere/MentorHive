// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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

// Sign-Up Functionality
document.getElementById("signup-form").addEventListener("submit", async (event) => {
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
    submitButton.textContent = "Creating Account...";

    try {
        // Create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);
        alert(`Sign-up successful! A verification email has been sent to ${email}. Please verify your email before logging in.`);

        // Optional: Redirect to login page after signup
        // window.location.href = "/login.html";

    } catch (error) {
        console.error("Error during sign-up:", error.code, error.message);

        // User-friendly error messages
        let errorMessage;
        switch (error.code) {
            case "auth/email-already-in-use":
                errorMessage = "This email is already in use. Try logging in instead.";
                break;
            case "auth/weak-password":
                errorMessage = "Password must be at least 6 characters.";
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
        submitButton.textContent = "Sign Up";
    }
});
document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const submitButton = document.getElementById("submit-button");

    if (!email || !password) {
        alert("Please enter both an email and a password.");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating Account...";

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store phone number (if provided)
        if (phone) {
            // Assuming you're using Firebase Realtime Database or Firestore
            const userId = user.uid;
            await firebase.database().ref('users/' + userId).set({
                email: email,
                phone: phone
            });
        }

        await sendEmailVerification(user);
        alert(`Sign-up successful! A verification email has been sent to ${email}.`);

    } catch (error) {
        console.error("Error during sign-up:", error.code, error.message);
        alert("Sign-up failed: " + error.message);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Sign Up";
    }
});
