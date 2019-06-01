var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile('/index.html');
});

router.post('/', function(req, res, next) {
  console.log(req.body.data);
  global.io.emit('map', {msg:req.body.data});
  res.sendStatus(200);
});


module.exports = router;
