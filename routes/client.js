var express = require('express');
var router = express.Router();
var model = require('../common/model');
var socketUse = require('../util/socketUse')

router.post('/', function(req, res, next) {
  var phoneNumber = req.body.number;
  console.log(phoneNumber)
  var phone = model.phone;
  var location = JSON.stringify(req.body.result)
  phone.update({
    phoneNumber: phoneNumber
  }, {$set: {
    location: location
  }}, function(err, doc) {
    if (err) {
        res.sendStatus(500);
    }else {
        phone.findOne({
            phoneNumber: phoneNumber
        }, function(err, doc) {
            if(err) {
                res.status(404).send('cant find')
            }else {
                console.log(doc)
                socketUse.socketEvent.emit('location', doc)
                res.status(200).send('ok');
            }
        });
    }
  });
});

module.exports = router;
