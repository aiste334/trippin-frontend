document.addEventListener("DOMContentLoaded", () => {
  const cancelButton = document.querySelector("#cancel")
  const saveButton = document.querySelector("#save")

  cancelButton.addEventListener("click", () => {
    window.location.href = "/"
  })

  saveButton.addEventListener("click", saveDestination)
})

async function saveDestination(e) {
  e.preventDefault()
  const form = document.getElementById("destination-form")
  const fd = new FormData(form)

  console.log(await fileToBase64(fd.get("image")))

  const formDataObject = {
    country: fd.get("country"),
    title: fd.get("title"),
    link: fd.get("link"),
    arrivalDate: fd.get("arrival-date"),
    departureDate: fd.get("departure-date"),
    image: await fileToBase64(fd.get("image")),
    description: fd.get("description"),
  }

  fetch("http://localhost:3009/destination", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => {
      if (response.status === 201) {
        // alert("Destination created successfully!")
        // window.location.href = "/"
      } else {
        alert("Failed to create destination.")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("An error occurred while creating the destination.")
    })
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = () => {
      reject(new Error("Error reading the file."))
    }

    reader.readAsDataURL(file)
  })
}
