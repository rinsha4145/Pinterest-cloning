const axios = require('axios');
const fs = require('fs');

const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your API key
const endpoint = 'https://api.pexels.com/v1/curated';

async function fetchPexelsData() {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        per_page: 50, // Number of results per request
        page: 1,      // Adjust page number as needed
      },
    });

    // Save data to a file for later upload
    fs.writeFileSync('pexels_data.json', JSON.stringify(response.data.photos, null, 2));
    console.log('Data saved to pexels_data.json');
  } catch (error) {
    console.error('Error fetching data from Pexels:', error.message);
  }
}

fetchPexelsData();
