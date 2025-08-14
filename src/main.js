import "./style.css";

const API_URL = import.meta.env.VITE_API_URL;
const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const errorMessage = document.getElementById("errorMessage");

async function fetchUsers() {
  clearUI();
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    showError(`Failed to fetch user data. ${error.message}`);
  }
}

function displayUsers(users) {
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    const nameEl = document.createElement("div");
    nameEl.className = "user-card__name";
    nameEl.textContent = user.name;

    const emailEl = document.createElement("div");
    emailEl.className = "user-card__email";
    emailEl.textContent = user.email;

    const addressEl = document.createElement("div");
    addressEl.className = "user-card__address";
    addressEl.textContent = `${user.address.street}, ${user.address.city}`;

    card.appendChild(nameEl);
    card.appendChild(emailEl);
    card.appendChild(addressEl);

    userContainer.appendChild(card);
  });
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function clearUI() {
  userContainer.innerHTML = "";
  errorMessage.style.display = "none";
}

reloadBtn.addEventListener("click", fetchUsers);

fetchUsers();
