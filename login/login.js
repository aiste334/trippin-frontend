const loginBtn = document.getElementById('login-btn');

const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");

async function login(){
    console.log("test")
    const body = {
        username: loginUsernameInput.value,
        password: loginPasswordInput.value
    }
    console.log(body)
    fetch("http://localhost:3009/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status === 201) {
            alert("Logged in successfully!")
            window.location.href = "/"
          } else {
            alert("Failed to log in.")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          alert("An error occurred while logging in.")
        })
}

loginBtn.addEventListener('click', login);
