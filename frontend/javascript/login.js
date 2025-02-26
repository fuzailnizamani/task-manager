const userBox = document.getElementById("username");
const passwordBox = document.getElementById("password");
const BASE_URL = "http://localhost:5000"; // Replace with your backend 
const loginButton = document.getElementById('login-button');
let accessToken = null;

// Only run login-related code if on the login page
if (window.location.pathname.includes("login.html")) {
  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      await validateLogin();
    });
  }
}

async function validateLogin() {
  // Check if input fields are not empty
  if (!userBox.value || !passwordBox.value) {
    alert("Username and password are both required.");
    userBox.value = "";
    passwordBox.value = "";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: userBox.value,
        pwd: passwordBox.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    accessToken = data.accessToken; // Assuming the backend returns { accessToken: "..." }

    if (accessToken) {
      // Redirect to the dashboard page
      window.location.href = "taskmanager.html";
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  } finally {
    // Clear input fields
    userBox.value = "";
    passwordBox.value = "";
  }
}

// Export a function to get the current accessToken
function getAccessToken() {
  return accessToken;
}

export { validateLogin, getAccessToken };