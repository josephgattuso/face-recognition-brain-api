const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

// db.select('*')
//   .from('users')
//   .then(data => {
//     console.log(data);
//   });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// GET registered users
app.get('/', (req, res) => {
  res.send(db.users);
});

// POST user auth credentials
app.post('/signin', signin.handleSignin(db, bcrypt));

// POST register a new user
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// GET user profile
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// PUT a new user image entry
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

// Fire up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(` 🚀 app now running on port ${PORT}!`);
});
