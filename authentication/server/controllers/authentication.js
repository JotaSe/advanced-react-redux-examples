const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next){
  console.log('asdasdasd');
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({token: tokenForUser(req.user)});

}
exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password){
    return res.status(422).send({error: 'You must provide email and password'});
  }
  // See if a user with the given email exists
  User.findOne({email: email}, function(err, existingUser) {
    // If a user with emaild doest exist, return a error
    if (err) { return next(err); }

    // If a user with email does NOT exist, create and save user record
    if(existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }
  });

  // Respond to request indicating the user was created
  const user = new User({
    email: email,
    password: password
  });

  user.save(function(err){
    if (err) { return next(err) }
    res.json({token: tokenForUser(user)});
  });
}

