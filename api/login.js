// api/login.js
module.exports = async (res) => {
    const email = process.env.EMAIL;
    const userPassword = process.env.USER_PASSWORD;
  
    const url = 'https://ify.epayco.co/login/mail';
    const basicAuth = 'Basic ' + Buffer.from(email + ':' + userPassword).toString('base64');
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: userPassword,
      })
    });
  
    const data = await response.json();
  
    res.status(200).json(data);
  };