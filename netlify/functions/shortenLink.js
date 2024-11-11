const axios = require('axios');

exports.handler = async function (event, context) {
  console.log('Function invoked with event:', JSON.stringify(event));
  
  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      console.error('Invalid request: URL is missing');
      throw new Error('Invalid request. URL is required.');
    }

    console.log('Sending request to CleanURI API...');
    const response = await axios.post('https://cleanuri.com/api/v1/shorten', { url }, {
      timeout: 8000 // Set a timeout of 8 seconds
    });

    if (!response.data || !response.data.result_url) {
      console.error('CleanURI API response:', response.data);
      throw new Error('CleanURI API did not return a result_url.');
    }

    console.log('Successful response from CleanURI:', response.data);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result_url: response.data.result_url }),
    };
  } catch (error) {
    let errorMessage = 'Failed to shorten the link';

    if (error.response) {
      errorMessage = error.response.data || 'CleanURI API error';
      console.error('Error response from CleanURI:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      errorMessage = 'No response from CleanURI';
    } else {
      console.error('Error setting up request:', error.message);
    }

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