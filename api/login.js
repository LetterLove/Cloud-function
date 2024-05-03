// api/login.js
const axios = require('axios');

module.exports = async (req, res) => {
  const email = process.env.EMAIL;
  const userPassword = process.env.USER_PASSWORD;

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
