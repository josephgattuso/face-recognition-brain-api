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
    host: '127.0.0.1',
    user: 'jgattus',
    password: '',
    database: 'smart-brain',
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'Gizmo',
      email: 'gizmo@email.com',
      password: 'treats',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Rufus',
      email: 'rufus@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987',
      hash: '',
    },
  ],
};

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

// Initialize the app.
const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;
  console.log(' 🚀 app now running on port', port);
});
