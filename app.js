let express = require("express");
let path = require("path");
let expressValidator = require("express-validator");
let session = require("express-session");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let bodyParser = require("body-parser");
let flash = require("connect-flash");
let port = 3000;
let routes = require("./routes/index");
let users = require("./routes/users");
let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    saveUninitalized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// routes
app.use("/", routes);
app.use("/users", users);
app.listen(port);
console.log("Server started on port " + port);

// app.set('view engine', 'pug');
// app.set('view engine', 'ejs');
// app.set('views', (path.join(__dirname, 'views')));
//
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.get('/', function(req,res){
//   res.render('index',{
//     title: 'Welcome to Index.html'
//   });
// });
//
// app.get('/about', function(req, res){
//   res.send('About Page');
// });
//
// app.listen(port);
// console.log("Server Started on Port "+port);
//
// module.exports = app;
