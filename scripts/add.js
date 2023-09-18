document.addEventListener("DOMContentLoaded", () => {
    const cancelButton = document.querySelector('#cancel')
    const saveButton = document.querySelector('#save')

    cancelButton.addEventListener('click', () => {
        window.location.href = "/"
    })
    
    saveButton.addEventListener('click', saveDestination);
});

function saveDestination() {
    console.log("FUCK")
    const form = document.getElementById("destination-form");
    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    fetch("http://localhost:3009/destination", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataObject)
    })
    .then(response => {
        if (response.status === 201) {
            alert("Destination created successfully!");
        } else {
            alert("Failed to create destination.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while creating the destination.");
    });
}
