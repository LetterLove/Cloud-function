// api/login.js
const axios = require('axios');

module.exports = async (req, res) => {

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://letterlove.github.io/Demostracion/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const email = process.env.email;
  const userPassword = process.env.userPassword;

  const auth = Buffer.from(`${email}:${userPassword}`).toString('base64');

  try {
    const response = await axios.post('https://apify.epayco.co/login/mail', {}, {
      headers: { Authorization: `Basic ${auth}` },
    });

    // Send only the necessary data to the client
    res.status(200).send({ token: response.data.token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
