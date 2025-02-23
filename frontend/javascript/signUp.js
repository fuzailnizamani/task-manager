const userBox = document.getElementById("user-box");
const passwordBox = document.getElementById("password-box");
const linkButton = document.querySelector(".link-button");

console.log(typeof userBox);
console.log(typeof passwordBox);
console.log(typeof linkButton);

addPasswordAndUsername = async () => {
  if (userBox.value === "" || passwordBox.value === "") {
    alert("username and password both required ");
    return;
  }
}


linkButton.addEventListener("click", () => addPasswordAndUsername());

addPasswordAndUsername();