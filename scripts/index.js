document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#add-entry")

  addButton.addEventListener("click", () => {
    window.location.href = "/add"
  })

  loadDestinations()
})

async function loadDestinations() {
  const destinations = await getDestinations()

  destinations.forEach((destination) => renderDestination(destination))
}

async function getDestinations() {
  const response = await fetch("http://localhost:3009/destinations")
  const destinations = await response.json()
  return destinations
}

async function deleteDestination(id) {
  const response = await fetch(`http://localhost:3009/destinations/${id}`, {
    method: "DELETE",
  })
  return response.status === 204
}

function renderDestination(destination) {
  const destinationContainer = document.getElementById("destination-container")

  const dividerLine = document.createElement("div")
  dividerLine.classList.add("divider")

  const destinationElement = document.createElement("div")
  destinationElement.classList.add("destination")

  const imageElement = document.createElement("img")
  if (destination.image == "data:application/octet-stream;base64,") {
    imageElement.src = "../default.png"
  } else {
    imageElement.src = destination.image
  }
  imageElement.alt = destination.title

  const contentElement = document.createElement("div")
  contentElement.classList.add("content")

  const prefixElement = document.createElement("div")
  prefixElement.classList.add("prefix")

  const countrySpan = document.createElement("span")
  countrySpan.classList.add("country")
  countrySpan.innerText = destination.country

  const svgData =
    '<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.07866 5.25002C3.15532 5.25002 2.40837 4.50221 2.40837 3.57965C2.40837 2.65757 3.15532 1.90911 4.07866 1.90911C5.00167 1.90911 5.74927 2.65757 5.74927 3.57965C5.74927 4.50221 5.00167 5.25002 4.07866 5.25002ZM3.98394 0C2.04227 0 0.5 1.63678 0.5 3.65569C0.5 6.40791 3.45078 9.25191 3.45078 9.25191C3.84777 9.62783 4.09437 9.65847 4.51646 9.25191C4.51646 9.25191 7.5 6.40791 7.5 3.65569C7.5 1.63678 5.92544 0 3.98394 0Z" fill="#FF5722"/></svg>'
  const svgElement = document.createElement("svg")
  svgElement.innerHTML = svgData
  prefixElement.appendChild(svgElement)

  const googleMapsLink = document.createElement("a")
  googleMapsLink.href = destination.link

  googleMapsLink.classList.add("google-maps")
  googleMapsLink.target = "_blank"
  googleMapsLink.textContent = "View on Google Maps"

  const deleteButton = document.createElement("span")
  deleteButton.classList.add("material-symbols-outlined")
  deleteButton.classList.add("action-icon")
  deleteButton.innerText = "delete"
  deleteButton.addEventListener("click", async () => {
    if (!confirm("Are you sure you want to delete this destination?")) return

    destinationElement.classList.add("pending")
    const result = await deleteDestination(destination._id)
    console.log(result)
    destinationElement.classList.remove("pending")

    if (result) {
      destinationElement.classList.add("hidden")
      dividerLine.classList.add("hidden")
      dividerLine.style.display = "none";
    }
  })

  const editButton = document.createElement("span")
  editButton.classList.add("material-symbols-outlined")
  editButton.classList.add("action-icon")
  editButton.innerText = "edit"
  editButton.dataset.destinationId = destination._id;
  editButton.addEventListener("click", () => {
    const destinationId = editButton.dataset.destinationId;
  const updateUrl = `/update/index.html?id=${destinationId}`;
  console.log("Redirecting to:", updateUrl);
  window.location.href = updateUrl;
  })

  prefixElement.appendChild(countrySpan)
  prefixElement.appendChild(googleMapsLink)
  prefixElement.appendChild(editButton)
  prefixElement.appendChild(deleteButton)

  const titleElement = document.createElement("h2")
  titleElement.classList.add("title")
  titleElement.textContent = destination.title

  const dateSpan = document.createElement("span")
  dateSpan.classList.add("date")
  dateSpan.textContent = `${destination["arrivalDate"]?.split("T")[0]} - ${
    destination["departureDate"]?.split("T")[0]
  }`

  const descriptionElement = document.createElement("p")
  descriptionElement.classList.add("description")
  descriptionElement.textContent = destination.description



  contentElement.appendChild(prefixElement)
  contentElement.appendChild(titleElement)
  contentElement.appendChild(dateSpan)
  contentElement.appendChild(descriptionElement)
  destinationElement.appendChild(imageElement)
  destinationElement.appendChild(contentElement)
  destinationContainer.appendChild(destinationElement)
  destinationContainer.appendChild(dividerLine)
}
