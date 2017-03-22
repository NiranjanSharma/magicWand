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

// SlideShow route
app.get('/slideshow', function(req, res){

  var imgdata = {

    img_1_responsive: "img/1-375.jpg 375, img/1-480.jpg 480, img/1.jpg 800",
    img_1_src: "img/1-1600.jpg",
    img_1_text: "Text Sample",
    img_1_thumb: "img/thumb-1.jpg",

    img_2_responsive: "img/2-375.jpg 375, img/2-480.jpg 480, img/2.jpg 800",
    img_2_src: "img/2-1600.jpg",
    img_2_text: "Text Sample",
    img_2_thumb: "img/thumb-2.jpg",

    img_3_responsive: "img/13-375.jpg 375, img/13-480.jpg 480, img/13.jpg 800",
    img_3_src: "img/13-1600.jpg",
    img_3_text: "Text Sample",
    img_3_thumb: "img/thumb-13.jpg",

    img_4_responsive: "img/4-375.jpg 375, img/4-480.jpg 480, img/4.jpg 800",
    img_4_src: "img/4-1600.jpg",
    img_4_text: "Text Sample",
    img_4_thumb: "img/thumb-4.jpg",

  }

  res.render('pages/slideshow', {data: imgdata});
});

// server creation
var server = app.listen(3000, function(){

  var host = 'localhost';
  var port = server.address().port;

  console.log("Listening at http://%s:%s",host,port);
});
