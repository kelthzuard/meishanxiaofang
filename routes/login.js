var express = require('express');
var router = express.Router();
var model = require('../common/model');
var crypto = require('crypto');
var token = require('../util/token')

router.post('/', function(req, res, next) {
  var user = model.user;
  var md5 = crypto.createHash('md5');
  md5.update(req.body.userPassword);
  var secretPassword = md5.digest('hex');
  user.findOne({
    userName: req.body.userName,
    userPassword: secretPassword
  }, function(err, doc) {
    if (!doc) {
      res.status(404).send('not correct');
    }else {
      token.setToken(doc.userName)
      .then(token => {
        res.header("Access-Control-Expose-Headers","Authorization");
        res.header('authorization', token)
        res.status(200).send('success login');
      })
    }
  })
});

module.exports = router;