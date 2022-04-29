const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/users-model');
const router = require('express').Router();
const { BCRYPT_ROUNDS, JWT_SECRET } = require('../../config/index');
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

router.post('/login', validateUserData, (req, res, next) => {
  const { username, password } = req.body;
  console.log(JWT_SECRET)
  User.findBy({ username })
    .then(user => {
      console.log(user)
      if(user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({
          message: `welcome, ${username}`,
          token: generateToken(user) 
        });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
        return;
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'could not login user' })
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
