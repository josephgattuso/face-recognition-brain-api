const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

/*
/ -> res = this is working
/signin -> POST = success/fail
/register -> POST = user
/profile/:userId -> GET = user
/image -> PUT => user 
*/


app.get('/', (req, res) => {
  res.send('this is working');
});


// Initialize the app.
const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;
  console.log(' 🚀 app now running on port', port);
});
