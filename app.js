let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let sassMiddleware = require('node-sass-middleware');
let expressSanitizer = require('express-sanitizer');
let index = require('./routes/index');
let session = require('express-session');
let loginValidation = require('./modules/login/loginValidation');
let empTools = require('./routes/employeeTools');
let api = require('./routes/api');
let userTools = require('./routes/userTools');
let adminTools = require('./routes/adminTools');
let passwords = require('./routes/passwords');
let adminValidation = require('./modules/admin/adminValidation');
let minify = require('express-minify');
let compression = require('compression');
let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(compression());
app.use(minify({cache: path.join(__dirname, 'cache')}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {secret: 'dHwSHOKF3scpzz83',
     cookie: { maxAge: 86400000 },
     saveUninitialized: true,
     resave: true
}));

app.use('/', index);
app.use('/passwords', passwords);
app.use(loginValidation);
app.use('/empTools', empTools);
app.use('/api', api);
app.use('/userTools', userTools);
app.use(adminValidation);
app.use('/adminTools', adminTools);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  let user = req.session.user;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    user: user
  });
});

app.listen(3000,'0.0.0.0', function(){
  console.log("Listening to port: " + 3000)
})
//module.exports = app;
