document.addEventListener("DOMContentLoaded", () => {
    const cancelButton = document.querySelector('#cancel')
    const saveButton = document.querySelector('#save')

    cancelButton.addEventListener('click', () => {
        window.location.href = "/"
    })
    
    saveButton.addEventListener('click', saveDestination)
});

function saveDestination() {
    
}