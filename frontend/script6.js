// script6.js

// Geocoding API Request
async function searchLocation() {
    const locationInput = document.getElementById('locationInput').value;
    const apiKey = 'c923e090655f4d2abe5081ab645d0026';
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationInput)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const result = data.features[0].properties;
            const lat = data.features[0].geometry.coordinates[1];
            const lon = data.features[0].geometry.coordinates[0];
            displayLocation(result);
            displayStaticMapWithMarker(lat, lon);
            fetchBoundaries(result);
        } else {
            alert('Location not found.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to display static map with a custom marker icon
function displayStaticMapWithMarker(lat, lon) {
    const apiKey = 'c923e090655f4d2abe5081ab645d0026';

    // Generate a custom marker icon URL
    const markerIconUrl = `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=taxi&iconType=awesome&apiKey=${apiKey}`;

    // Generate Static Map URL with the custom marker
    const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${lon}%2C${lat}&zoom=14&marker=lonlat%3A${lon}%2C${lat}%3Burl%3A${encodeURIComponent(markerIconUrl)}&apiKey=${apiKey}`;

    // Display the map in the map container
    document.getElementById('mapContainer').innerHTML = `<img src="${mapUrl}" alt="Map of ${lat}, ${lon}">`;
}

// Function to fetch boundaries using the Boundaries API
async function fetchBoundaries(result) {
    const apiKey = 'c923e090655f4d2abe5081ab645d0026';
    const id = result.place_id; // Use the place_id from the geocode result to fetch boundaries
    const url = `https://api.geoapify.com/v1/boundaries/consists-of?id=${id}&geometry=geometry_1000&sublevel=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            displayBoundariesOnMap(data.features);
        } else {
            console.log('No boundaries found for the location.');
        }
    } catch (error) {
        console.error('Error fetching boundaries:', error);
    }
}

// Function to display boundaries on the map (for visualization purposes)
function displayBoundariesOnMap(features) {
    const apiKey = 'c923e090655f4d2abe5081ab645d0026';
    const boundaryCoordinates = features.map(feature => feature.geometry.coordinates);

    // Convert boundary coordinates to a format supported by the Static Map API
    const boundaryUrl = boundaryCoordinates.map(coordinateSet => `polygon:lonlat%3A${coordinateSet[0][0][0]}%2C${coordinateSet[0][0][1]}%7C${coordinateSet[0].map(coord => `${coord[0]}%2C${coord[1]}`).join('%7C')}`).join('%2C');

    // Generate the map with boundaries overlay
    const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&geometry=${boundaryUrl}&apiKey=${apiKey}`;

    // Display the map with boundaries
    document.getElementById('mapContainer').innerHTML = `<img src="${mapUrl}" alt="Boundary Map">`;
}

// Autocomplete API Request for location suggestions
async function autocompleteLocation() {
    const locationInput = document.getElementById('locationInput').value;
    const apiKey = 'c923e090655f4d2abe5081ab645d0026';
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationInput)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Display autocomplete suggestions
        if (data.features) {
            const suggestions = data.features.map(feature => feature.properties.formatted);
            const suggestionsContainer = document.getElementById('suggestionsContainer');
            suggestionsContainer.innerHTML = '';  // Clear previous suggestions

            suggestions.forEach(s => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = s;
                suggestionItem.addEventListener('click', () => {
                    document.getElementById('locationInput').value = s;  // Set the clicked suggestion to the input field
                    suggestionsContainer.innerHTML = '';  // Clear suggestions after selection
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listeners
document.getElementById('searchButton').addEventListener('click', searchLocation);
document.getElementById('nearbyButton').addEventListener('click', getRouteMatrix);
document.getElementById('locationInput').addEventListener('input', autocompleteLocation);
