function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.8566, lng: 2.3522 },
        zoom: 13,
    });

    const places = [
        { name: 'Eiffel Tower', location: { lat: 48.8584, lng: 2.2945 } },
        { name: 'Statue of Liberty', location: { lat: 40.6892, lng: -74.0445 } },
        { name: 'Great Wall of China', location: { lat: 40.4319, lng: 116.5704 } },
        { name: 'Colosseum', location: { lat: 41.8902, lng: 12.4922 } },
        { name: 'Machu Picchu', location: { lat: -13.1631, lng: -72.5450 } },
    ];

    places.forEach(place => {
        new google.maps.Marker({
            position: place.location,
            map: map,
            title: place.name,
        });
    });
}

document.addEventListener('DOMContentLoaded', initMap);
