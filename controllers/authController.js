const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/User');
const {errorHandler} = require('../helpers/dberrorHandler');

exports.test = (req, res) => {
  res.send("desde runta de autenticacion UPDATED");
}

exports.signup = (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "error"
      })
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    })
  })
};

exports.signin = (req, res) => {
  const {email, password} = req.body
  User.findOne({email}, (error,user) => {
    if (error||!user) {
      return res.status(400).json({
        error: "User with that email does not exist"
      });
    }
    // Si se encuentra el usuario, entonces as un hash con el salt de la contraseña
    if(!user.authenticate(password)) {
      return res.status(401).json({error: "Email and/or password don't match"});
    }
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiration date
    res.cookie('t', token, {expire: new Date() + 9999})
    // return response with user and token to front end
    const {_id, name, email, role} = user
    return res.json({token, user: {_id, email, name, role}})
  });
}

