// Initialize the map centered in the U.S.
const map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 sets of random coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) }
];

// Add markers and fetch locality data for each
coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lon]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}`).openPopup();

    // Fetch locality data from API
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Locality not found";
            document.getElementById(`marker${index + 1}`).querySelector('span').textContent = 
                `Lat: ${coord.lat}, Lng: ${coord.lon} - Locality: ${locality}`;
        })
        .catch(error => console.error('Error fetching locality:', error));
});
