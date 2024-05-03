// api/login.js
const axios = require('axios');

module.exports = async (req, res) => {

  const allowedOrigins = ['http://www.website1.com'];
  const { origin } = req.headers;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

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
