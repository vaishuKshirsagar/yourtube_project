// reverseGeocode.js

import axios from 'axios';

async function reverseGeocode(latitude, longitude, apiKey) {
    // const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
        const response = await axios.get(apiUrl);
        const addressComponents = response.data.results[0].address_components;

        // Extract relevant address components (e.g., city, state)
        const city = addressComponents.find(component => component.types.includes('locality'))?.long_name;
        const state = addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.long_name;

        return { city, state };
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }
}

export default reverseGeocode;
