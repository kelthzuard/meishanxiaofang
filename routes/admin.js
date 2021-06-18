var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var model = require('../common/model');
var util = require("../util/util.js");



router.get('/', function(req, res, next) {
  res.send('adminget');
});

router.post('/', function(req, res, next) {
  var content = req.body.data.phoneNumber.substring(0,11);
  content = util.transformNumbers(content);
  //var md5 = crypto.createHash('md5');
  //md5.update(content);
  //var secretNum = md5.digest('hex');
  var phone = model.phone;
  phone.create({
      phoneNumber:req.body.data.phoneNumber,
      secretNumber:content,
      desc: req.body.data.desc,
      location: 'unknow',
      user: req.user.name
  },function(err,doc){
      if(err){
          res.sendStatus(500);
      }else{
        util.sendMsg(req.body.data.phoneNumber, doc.secretNumber, function(result) {
          res.status(200).send('success');
          console.log(result);
        }, function (ex) {
          res.status(404).send('fail send msg');
          console.log(ex);
        })
      }
  });
});

router.get('/getList', function(req, res ,next) {
  var phone = model.phone;
  phone.find({user: req.user.name},function(err,doc){
    if (err) {
      res.sendStatus(404);
    }else {
      res.status(200).send(doc);
    }
  });
});

router.post('/delete', function(req, res, next) {
  var phone = model.phone;
  phone.findOneAndDelete({
    phoneNumber: req.body.phoneNumber
  }, function (err, doc) {
    if (err) {
      res.status(403).send('delete failed');
    }else {
      res.status(200).send('succssful delete');
    }
  });
});

router.post('/resendMsg', function(req, res, next) {
  util.sendMsg(req.body.phoneNumber, req.body.secretNumber, function(result) {
    res.status(200).send('success');
  }, function (ex) {
    res.status(404).send('fail send msg');
  })
});


module.exports = router;
