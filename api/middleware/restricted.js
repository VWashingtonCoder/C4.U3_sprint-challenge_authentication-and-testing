const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../users/users-model');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    console.log(token)
    if(!token){
      res.status(401).json({ message: "token required" })
      return
    }
    
    if(err){
      console.log('Error: ', err);
      res.status(401).json({ message: "token invalid" });
      return;
    }

    req.decodedJwt = decodedToken;
    console.log('decoded token', req.decodedJwt);
    next()
  })
};
