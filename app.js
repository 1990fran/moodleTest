var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moodle_client = require("moodle-client");

moodle_client.init({
    wwwroot: "https://cognosonline-sandbox.mrooms.net/",
    token: "b541ec3e8913b03d2aeab9fca72ceeb6"
    // funka wwwroot: "https://campus.edem.es/",
    //token: "8996c20169265c969db451e3d646738d"
    //wwwroot: "https://campus.edem.es/",
    //token: "8996c20169265c969db451e3d646738d"
}).then(function(client) {
    return do_something(client);

}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function do_something(client) {
    return client.call({
        wsfunction: "mod_quiz_get_quizzes_by_courses",

    }).then(function(info) {
        console.log("info: "+JSON.stringify(info));
        return;
    });
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
