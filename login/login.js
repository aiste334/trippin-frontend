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
        .then((response) => response.json())
        .then(data => {
          if(data.token){
            document.cookie = `access_token=${data.token}; path=/;`
            window.location.href="/"
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          alert("An error occurred while logging in.")
        })
}

loginBtn.addEventListener('click', login);
