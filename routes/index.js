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
     name: "Toyata Camry",
     price: 2500
   }
 ]);

 router.get('/', function(req,res){
  res.render('purchase');


 });



});




module.exports = router;
