var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var passport =require('passport');
var session = require('express-session');

//session and cookie management middleware

app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./config/passport')(app);

// data/body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:100000}));

// routing
var routes = require('./routes/index'); 
var authRouter = require('./routes/authRoutes')();


var router = express.Router();
// define default control to check routes
//console.log(authRouter);
app.use('/auth', authRouter);
app.use('/',routes);

// set view engine to ejs
app.set('view engine', 'ejs');

// static directory for css
app.use(express.static(path.join(__dirname + '/public')));

// Default route
app.get('/', function(req, res) {
if(!req.user)
{
  	res.render('pages/index',{userLoggedIn:''});
}
else
{
	res.render('pages/home',{userLoggedIn:'true'});
}

});


// About route
app.get('/about', function(req, res){
  res.render('pages/about');
});

// Status route
app.get('/status', function(req, res){
  var status = 'Your request is InProcess';
  res.render('pages/status', {status:status});
});

// Template route
app.get('/createObj', function(req, res) {

if(!req.user)
{
	res.render('pages/index',{userLoggedIn:'false'});
}
else{
	res.render('pages/template',{userLoggedIn:'true'});
}	
  
});


app.use('/prepareObject', require('./routes/prepare'));

app.use('/slideshow', require('./routes/slideshow'));

// server creation
var server = app.listen(3000, function(){

  var host = 'localhost';
  var port = server.address().port;

  console.log('Listening at http://%s:%s',host,port);
});
