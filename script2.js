//const destinationContainer = document.getElementById("destination-container");



const destinationsData = [
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/330px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
        country: "Country 1",
        googleMapsLink: "https://www.google.com/maps",
        title: "Destination 1",
        date: "DD mmm, YYYY - DD mmm, YYYY",
        description: "Description 1",
    },
    {
        imageUrl: "https://example.com/destination2.jpg",
        country: "Country 2",
        googleMapsLink: "https://www.google.com/maps",
        title: "Destination 2",
        date: "DD mmm, YYYY - DD mmm, YYYY",
        description: "Description 2",
    },
    // Add more destination objects as needed
];

// Function to create a new destination element
function createDestinationElement(destination) {
    const destinationDiv = document.createElement("div");
    destinationDiv.className = "destination";

    const image = document.createElement("img");
    image.src = destination.imageUrl;
    image.alt = "";

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    const prefixDiv = document.createElement("div");
    prefixDiv.className = "prefix";

    const countrySpan = document.createElement("span");
    countrySpan.className = "country";

    const countrySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    countrySvg.setAttribute("width", "7");
    countrySvg.setAttribute("height", "10");
    countrySvg.setAttribute("viewBox", "0 0 7 10");
    countrySvg.setAttribute("fill", "none");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("clip-rule", "evenodd");
    path.setAttribute("d", "M3.57866 5.25002C2.65532 5.25002 1.90837 4.50221 1.90837 3.57965C1.90837 2.65757 2.65532 1.90911 3.57866 1.90911C4.50167 1.90911 5.24927 2.65757 5.24927 3.57965C5.24927 4.50221 4.50167 5.25002 3.57866 5.25002ZM3.48394 0C1.54227 0 0 1.63678 0 3.65569C0 6.40791 2.95078 9.25191 2.95078 9.25191C3.34777 9.62783 3.59437 9.65847 4.01646 9.25191C4.01646 9.25191 7 6.40791 7 3.65569C7 1.63678 5.42544 0 3.48394 0Z");
    path.setAttribute("fill", "#FF5722");

    const countryText = document.createTextNode(destination.country);
    
    const googleMapsLink = document.createElement("a");
    googleMapsLink.href = destination.googleMapsLink;
    googleMapsLink.className = "google-maps";
    googleMapsLink.textContent = "View on Google Maps";

    const h2 = document.createElement("h2");
    h2.className = "title";
    h2.textContent = destination.title;

    const dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.textContent = destination.date;

    const descriptionP = document.createElement("p");
    descriptionP.className = "description";
    descriptionP.textContent = destination.description;

    // Append all elements to their parent containers
    countrySpan.appendChild(countrySvg);
    countrySpan.appendChild(countryText);
    prefixDiv.appendChild(countrySpan);
    prefixDiv.appendChild(googleMapsLink);
    contentDiv.appendChild(prefixDiv);
    contentDiv.appendChild(h2);
    contentDiv.appendChild(dateSpan);
    contentDiv.appendChild(descriptionP);
    destinationDiv.appendChild(image);
    destinationDiv.appendChild(contentDiv);

    return destinationDiv;
}

// Get the container where you want to append the destination elements
const destinationContainer = document.getElementById("destination-container");

// Loop through the destination data and create elements for each destination
destinationsData.forEach(destination => {
    const destinationElement = createDestinationElement(destination);
    destinationContainer.appendChild(destinationElement);
});