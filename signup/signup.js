const signupBtn = document.getElementById('signup-btn');

const registerUsernameInput = document.getElementById("signup-username");
const registerPasswordInput = document.getElementById("signup-password");

async function register(){
    const body = {
        username: registerUsernameInput.value,
        password: registerPasswordInput.value
    }

    fetch("http://localhost:3009/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
        if (response.status === 201) {
            alert("Signed up successfully!")
            window.location.href = "/"
        } else {
            alert("Failed to sign up.")
        }
        })
        .catch((error) => {
        console.error("Error:", error)
        alert("An error occurred while registering.")
        })
}

signupBtn.addEventListener('click', register);
