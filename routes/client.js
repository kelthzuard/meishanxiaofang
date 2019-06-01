var express = require('express');
var router = express.Router();
var model = require('../common/model');

router.post('/', function(req, res, next) {
  var phoneNumber = req.query.number;
  var phone = model.phone;
  var location = JSON.stringify(req.body.data)
  console.log(req.body.data);
  phone.update({
    secretNumber: phoneNumber
  }, {$set: {
    location: location
  }}, function(err, doc) {
    if (err) {
        res.sendStatus(500);
    }else {
        phone.findOne({
            secretNumber: phoneNumber
        }, function(err, doc) {
            if(err) {
                res.status(404).send('cant find')
            }else {
                global.io.emit('map', {
                    msg: doc
                });
                res.status(200).send('ok');
            }
        });
    }
  });
});

module.exports = router;