const User = require('../models/user');

exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;
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

  user.save();

  res.send(function(err){
    if (err) { return next(err) }
    res.json(user);
  });
}
