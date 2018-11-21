let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');
let db = mongojs('carapp', ['users']);
let bcrypt = require('bcryptjs');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;


// login GET PAGE
router.get('/login', function(req,res){
  res.render('login');
});


// Register GET PAGE
router.get('/register', function(req,res){
  res.render('register');
});
// Register POST
router.post('/register', function(req,res){
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  // Validation
  req.checkBody('name', "Name field is required").notEmpty();
  req.checkBody('email', "Email field is required").notEmpty();
  req.checkBody('email', "Please use a Valid Email Address").isEmail();
  req.checkBody('username', "Username field is required").notEmpty();
  req.checkBody('password', "Password field is required").notEmpty();
  req.checkBody('confirm_password', "Passwords Do Not Match").equals(req.body.password);

// Check For Errors

let errors = req.validationErrors();
if (errors){
  console.log("Form has errors");
  res.render('register',{
    errors:errors,
    name: name,
    email: email,
    username:username,
    password:password,
    confirm_password:confirm_password
  });
} else {
  let newUser = {
    name: name,
    email: email,
    username:username,
    password:password
  }
}

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      newUser.password = hash;
      db.users.insert(newUser, function(err, doc){
        if(err){
          res.send(err);
        } else {
          console.log('User Added. Good JOB using MONGODB Matt!');
          req.flash('success', "You are registered and can log in");
          res.location('/');
          res.redirect('/');
        }
      });
    })
  });


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.users.findOne({_id: mongojs.OnjectId(id)}, function(err,user){
    done(err,user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done){
    db.users.findOne({username:username}, function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null,false,{message: 'Incorrect Username'});
      }

      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err){
          return done(err);
        }
        if(isMatch){
          return done(null, user);
        } else {
          return done(null,false,{message: 'Incorrect Password'});
        }
      });
    });
  }
));



// Login Post
router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/users/login',
                                                    failureFlash: "Invalid Username or Password"}+
                                                    function(req,res){
                                                      console.log('Auth Successful');
                                                      res.redirect('/');
                                                    }));
module.exports = router;
