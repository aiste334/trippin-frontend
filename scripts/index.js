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

function renderDestination(destination) {
  console.log(destination)
  const destinationContainer = document.getElementById("destination-container")

  const destinationElement = document.createElement("div")
  destinationElement.classList.add("destination")

  const imageElement = document.createElement("img")
  imageElement.src = destination.image
  imageElement.alt = destination.title

  const contentElement = document.createElement("div")
  contentElement.classList.add("content")

  const prefixElement = document.createElement("div")
  prefixElement.classList.add("prefix")

  const countrySpan = document.createElement("span")
  countrySpan.classList.add("country")
  countrySpan.value = destination.country

  const googleMapsLink = document.createElement("a")
  googleMapsLink.href = destination.mapLink
  googleMapsLink.classList.add("google-maps")
  googleMapsLink.textContent = "View on Google Maps"

  prefixElement.appendChild(countrySpan)
  prefixElement.appendChild(googleMapsLink)

  const titleElement = document.createElement("h2")
  titleElement.classList.add("title")
  titleElement.textContent = destination.title

  const dateSpan = document.createElement("span")
  dateSpan.classList.add("date")
  dateSpan.textContent = `${destination["arrival-date"]} - ${destination["departure-date"]}`

  const descriptionElement = document.createElement("p")
  descriptionElement.classList.add("description")
  descriptionElement.textContent = destination.description

  const divider = document.createElement("div")
  descriptionElement.classList.add("divider")

  contentElement.appendChild(prefixElement)
  contentElement.appendChild(titleElement)
  contentElement.appendChild(dateSpan)
  contentElement.appendChild(descriptionElement)
  destinationElement.appendChild(imageElement)
  destinationElement.appendChild(contentElement)
  prefixElement.appendChild(divider)

  destinationContainer.appendChild(destinationElement)
}
