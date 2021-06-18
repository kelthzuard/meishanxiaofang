var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var model = require('./common/model');
var crypto = require('crypto');
var expressJWT = require('express-jwt');
var socketUse = require('./util/socketUse')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var clientRouter = require('./routes/client');
var loginRouter = require('./routes/login');

var app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/fire');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connnection successful')
});

// var user = model.user;
// var md5 = crypto.createHash('md5');
// md5.update('firelocater@001');
// var secretPassword = md5.digest('hex');
// user.create({
//   userName: '1',
//   userPassword: secretPassword
// }, function (err, doc) {
//   if (err) {
//     console.log(err);
//   }else {
//     console.log(doc);
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressJWT({
  secret: 'mes_qdhd_mobile_xhykjyxgs',
  algorithms: ["HS256"]
}).unless({
  path: ['/', '/login', '/client']//除了这个地址，其他的URL都需要验证
}));

// app.use(function (req, res, next) {
//   if (req.method == 'OPTIONS') return next()
//   var token = req.headers['authorization'];
//   console.log(token)
//   if (token == undefined) {
//     return next(createError(401))
//   } else {
//     vertoken.verToken(token).then((data) => {
//       req.data = data;
//       return next();
//     }).catch((error) => {
//       return next(createError(401))
//     })
//   }
//   next(createError(404));
// });

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  if (err.status) {
    return next(err)
  }
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);

  
  //res.render('error');
});

app.ready=function(server){
  socketUse.socketOn(server)
};

module.exports = app;
