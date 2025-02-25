const userBox = document.getElementById("user-box");
const passwordBox = document.getElementById("password-box");
const loginButton = document.querySelector(".button");
const BASE_URL = "http://localhost:5000"; // Replace with your backend URLlet 
let accessToken;


login = async () => {
  if (userBox.value === "" || passwordBox.value === "") {
    userBox.value = "";
    passwordBox.value = "";
    alert("username and password both required ");
    return;
  }

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { 'Content-Type': "application/json" },
    credentials: "include",
    body: JSON.stringify({
      username: userBox.value,
      pwd: passwordBox.value
    }),
  });

  accessToken = await response.json();
  console.log(accessToken);
  userBox.value = "";
  passwordBox.value = "";
}


loginButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent li click event from firing
  login();
});