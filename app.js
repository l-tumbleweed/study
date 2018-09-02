require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/http_error_handler')

require('./servers/mongodb_connetion');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
// route routs/users.js
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(errorHandler());
/*
app.use((req, res, next) => {
  next(createError(404));
});
*/
// error handler
/*
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
process.on('uncaughtException', (err) => {
  logger.error('uncaght exception', { err });
});

process.on('unhandledReject', (reason, p) => {
  logger.error('unhandledRejection', { reason, p });
});

module.exports = app;
