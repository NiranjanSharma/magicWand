var express = require('express');
var app = express();
var path = require('path');

// data/body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:100000}));

// routing
var routes = require('./routes/index'); 

// define default control to check routes
app.use('/',routes);

// set view engine to ejs
app.set('view engine', 'ejs');

// static directory for css
app.use(express.static(path.join(__dirname + '/public')));

// Default route
app.get('/', function(req, res){
  res.render('pages/index');
});

// About route
app.get('/about', function(req, res){
  res.render('pages/about');
});

// Status route
app.get('/status', function(req, res){
	console.log(req.status);
	var status = "Your request is InProcess";
	res.render('pages/status', {status:status});
});

// Template route
app.get('/createObj', function(req, res){
  res.render('pages/template');
});

// server creation
var server = app.listen(3000, function(){

  var host = 'localhost';
  var port = server.address().port;

  console.log("Listening at http://%s:%s",host,port);
});
