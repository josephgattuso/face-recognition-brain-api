const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
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
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// POST register a new user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

// GET user profile
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('💩 not found');
  }
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
