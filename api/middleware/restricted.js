const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../users/users-model');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  
  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    if(err){
      console.log('Error: ', err);
      res.status(401).json({ message: "token required" });
    }

    const user = await User.findById(decodedToken.subject);
    if(decodedToken.iat < user.logged_out_time){
      res.status(401).json({ message: "token invalid" })
    }

    req.decodedJwt = decodedToken;
    console.log('decoded token', req.decodedJwt);
    next()
  })
  
};
