const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request. URL is required.' }),
      };
    }

    const response = await axios.post('https://cleanuri.com/api/v1/shorten', { url });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result_url: response.data.result_url }),
    };
  } catch (error) {
    let errorMessage = 'Failed to shorten the link';

    // Check if error is a network or server issue
    if (error.response) {
      errorMessage = error.response.data || 'CleanURI API error';
      console.error('Error response from CleanURI:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      errorMessage = 'No response from CleanURI';
    } else {
      console.error('Error setting up request:', error.message);
    }

    // Log the entire error for debugging purposes
    console.error('Detailed error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
