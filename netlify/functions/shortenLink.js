const axios = require('axios');

exports.handler = async function (event, context) {
  const { url } = JSON.parse(event.body);

  try {
    const response = await axios.post('https://cleanuri.com/api/v1/shorten', { url });
    return {
      statusCode: 200,
      body: JSON.stringify({ result_url: response.data.result_url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to shorten the link' }),
    };
  }
};