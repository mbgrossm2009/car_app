let express = require('express');
const ejsLint = require('ejs-lint');
let router = express.Router();


router.get('/', function(req,res){
 res.render('index', cars = [
   {
     name: "Ford Mustang",
     price: 25000
   },
   {
     name: "Toyota Camry",
     price: 2500
   },
   {
     name: "Ford Escape",
     price: 50000
   },
   {
     name: "Toyota CRV",
     price: 34200
   },
   {
     name: "Corvette",
     price: 100000
   },
   {
     name: "Subaru Forestor",
     price: 89999
   }

 ]);

 router.get('/', function(req,res){
  res.render('purchase');


 });

});







module.exports = router;
