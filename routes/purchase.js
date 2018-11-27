let express = require('express');
const ejsLint = require('ejs-lint');
let router = express.Router();

 router.get('/', function(req,res){
  res.render('purchase');
 });
module.exports = router;
