import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { ref, set, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const welcomeUsernameSpan = document.getElementById("welcome-username");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const settingsButton = document.getElementById("settings-button");
const closeModalButton = document.getElementById("close-modal");
const settingsModal = document.getElementById("settings-modal");
const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");
const logoutButton = document.getElementById("logout-button");
const cooldownText = document.getElementById("cooldown-text");

// DOM Elements

// Event listener to open the modal when the settings button is clicked
settingsButton.addEventListener('click', () => {
  settingsModal.classList.add('active');
});

// Event listener to close the modal when the close button is clicked
closeModalButton.addEventListener('click', () => {
  settingsModal.classList.remove('active');
});

// Optional: Prevent modal from being open by default on login
window.addEventListener('load', () => {
  settingsModal.classList.remove('active'); // Ensures the modal stays hidden on load
});


document.getElementById("settings-button").addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

// Handle Auth State
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const uid = user.uid;
  const usernameRef = ref(db, `users/${uid}`);
  const snapshot = await get(usernameRef);

  if (snapshot.exists()) {
    const { username, lastUpdate } = snapshot.val();
    welcomeUsernameSpan.textContent = username;

    if (lastUpdate && new Date() - new Date(lastUpdate) < 7 * 24 * 60 * 60 * 1000) {
      usernameInput.disabled = true;
      cooldownText.textContent = "You can change your username every 7 days.";
    }
  }
});

// Toggle Settings Modal
settingsButton.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
});

// Update Username
usernameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  const uid = user.uid;
  const newUsername = usernameInput.value.trim();

  if (!newUsername) return alert("Username cannot be empty!");

  await set(ref(db, `users/${uid}`), {
    username: newUsername,
    lastUpdate: new Date().toISOString(),
  });

  alert("Username updated!");
  settingsModal.classList.add("hidden");
  welcomeUsernameSpan.textContent = newUsername;
});

// Search Users
searchButton.addEventListener("click", async () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  if (!searchQuery) return;

  const userQuery = query(ref(db, "users"), orderByChild("username"), equalTo(searchQuery));
  const snapshot = await get(userQuery);

  searchResults.innerHTML = "";
  snapshot.forEach((userSnap) => {
    const { username } = userSnap.val();
    const li = document.createElement("li");
    li.textContent = username;
    searchResults.appendChild(li);
  });
});

// Logout
logoutButton.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
