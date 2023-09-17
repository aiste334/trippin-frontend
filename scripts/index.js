document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#add-entry")

  addButton.addEventListener("click", () => {
    window.location.href = "/add"
  })

  loadDestinations()
})

async function loadDestinations() {
  // GET from API
  const destinations = await getDestinations()

  // Create DOM elements
  destinations.forEach((destination) => renderDestination(destination))
}

async function getDestinations() {
  const response = await fetch("http://localhost:3009/destinations")
  const destinations = await response.json()
  console.log(destinations)
  return destinations
}

function renderDestination(destination) {}
