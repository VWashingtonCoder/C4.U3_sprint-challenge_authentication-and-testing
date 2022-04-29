const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/users-model');
const router = require('express').Router();
const { BCRYPT_ROUNDS, JWT_SECRET } = require('../../data/dbConfig');
const { validateUserData, validateUniqueName } = require('../middleware/auth-middleware');

router.post('/register', validateUserData, validateUniqueName, (req, res, next) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  user.password = hash;

  User.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(() => res.status(500).json({ message: 'User could not be added.' }));
  
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
