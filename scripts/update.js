document.addEventListener("DOMContentLoaded", () => {
  const cancelButton = document.querySelector("#cancel")
  const updateButton = document.querySelector("#save")

  cancelButton.addEventListener("click", () => {
    window.location.href = "/"
  })

  updateButton.addEventListener("click", updateDestination)
  loadDestination() // Load the destination data when the form loads
})

async function updateDestination(e) {
  e.preventDefault()
  const form = document.getElementById("destination-form")
  const fd = new FormData(form)
  const destinationId = getDestinationIdFromURL()

  const imageBase64 = await fileToBase64(fd.get("image"))

  const formDataObject = {
    country: fd.get("country"),
    title: fd.get("title"),
    link: fd.get("link"),
    arrivalDate: fd.get("arrival-date"),
    departureDate: fd.get("departure-date"),
    image: imageBase64,
    description: fd.get("description"),
  }

  fetch(`http://localhost:3009/destinations/${destinationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Destination updated successfully!")
        window.location.href = "/"
      } else {
        alert("Failed to update destination.")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("An error occurred while updating the destination.")
    })
}

function resetFields() {
  // Add code to reset form fields if needed.
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
function getDestinationIdFromURL() {
  const url = window.location.href
  const idIndex = url.lastIndexOf("=")

  if (idIndex !== -1) {
    const destinationId = url.slice(idIndex + 1)
    console.log("destination id extracted " + destinationId)
    return destinationId
  } else {
    console.log(`Invalid or missing Destination ID in URL`)
    return null
  }
}

async function loadDestination() {
  const destinationId = getDestinationIdFromURL()

  if (destinationId) {
    try {
      const response = await fetch(
        `http://localhost:3009/destinations/${destinationId}`
      )
      if (response.status === 200) {
        const destinationData = await response.json()

        console.log(destinationData.arrivalDate)

        // Populate form fields with destination data
        const form = document.getElementById("destination-form")
        form.elements.country.value = destinationData.country || ""
        form.elements.title.value = destinationData.title || ""
        form.elements.link.value = destinationData.link || ""
        form.elements["arrival-date"].value =
          destinationData.arrivalDate?.split("T")[0] || ""
        form.elements["departure-date"].value =
          destinationData.departureDate?.split("T")[0] || ""
        form.elements.description.value = destinationData.description || ""
      } else {
        console.error("Failed to fetch destination data.")
      }
    } catch (error) {
      console.error("Error loading destination:", error)
    }
  }
}
