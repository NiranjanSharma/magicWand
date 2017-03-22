var express = require('express');
var app = express();

// routes
var router = express.Router();
//router.post('/generateJson', generateJson);

// constants
var fs = require('fs');
var Template = require('../models/template1');
var encodingFormat = 'utf8';
var file_path = './junk/file.json';
var imgpath = __dirname + '\\public\\images\\';
var render_status = ['inProcess', 'reading', 'done'];
var uuid = require('uuid-lib');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.toString().split('/')[1]);
  }
});

//Math.floor(100000 + Math.random() * 900000) for refId 

var upload = multer({storage: storage});

module.exports = router;
module.exports.status = status;

router.post('/generateJson', upload.fields([
  {name:'productLogo', maxCount: 1},
  {name:'screen1', maxCount: 1},  {name:'screen2', maxCount: 1},  {name:'screen3', maxCount: 1}]), function(req, res){

  var temp = new Template({
    characterName: req.body.characterName,
    characterProfession: req.body.characterProfession,
    problemStatement: req.body.problemStatement,
    exploredOption1: req.body.exploredOption1,
    exploredOption2: req.body.exploredOption2,
    exploredOption3: req.body.exploredOption3,

    productName: req.body.productName,    
    productLogo: imgpath + req.files.productLogo[0].filename,

    soultionOffered: req.body.soultionOffered,
    keyFeature1: req.body.keyFeature1,
    keyFeature2: req.body.keyFeature2,
    keyFeature3: req.body.keyFeature3,

    screen1Text: req.body.screen1Text,
    screen1: imgpath + req.files.screen1[0].filename,

    screen2Text: req.body.screen2Text,
    screen2: imgpath + req.files.screen2[0].filename,

    screen3Text: req.body.screen3Text,
    screen3: imgpath + req.files.screen3[0].filename,
    
    benefit1: req.body.benefit1,
    benefit2: req.body.benefit2,
    benefit3: req.body.benefit3,
    
    website: req.body.website,
    slogan: req.body.slogan,
    output: req.body.output,
    render_status:'ready',

    ID: uuid.raw()
  });

  //reading file before performing write operation
  var data = fs.readFile(file_path, encodingFormat, function(err, data){

    // check data 
    // if YES, i.e., data is not null/undefined, perform append operation 
    // if NO, i.e., data is null/undefined, perform create file and write the json
    if(data) {

      // check start/end of data are '[' & ']' 
      // if YES, append data to existing content
      // if NO, no operation can be performed
      if(data[0] == '[' && data[data.length-1] == ']') {

        // reading data into a String and acquiring substring based on the position of ']' 
        var file_content = data.toString();
        file_content = file_content.substring(data.length-1);

        // open the file_path with read/write mode
        var file = fs.openSync(file_path,'r+');

        // add ',' to the new content 
        // concatnate the new content to substring
        // assign to a buffer
        var bufferedText = new Buffer(','+JSON.stringify(temp)+file_content);

        // write bufferedText to file
        fs.writeSync(file, bufferedText, 0, bufferedText.length, data.length-1);
        fs.close(file);

        //render status page with status of the request
        res.render('pages/status',{status:render_status[2]});

        //res.send(data); // just for demo

      } else {
        res.send("Data Read Error"); // What shall we do here? 
      }
    } else if(err){
      
      // write the JSON to a file in an array format using stream
      var stream = fs.createWriteStream(file_path);
        stream.once('open', function (fd) {
        stream.write('[' + JSON.stringify(temp) + ']');
        stream.end();
      });

      //render status page with status of the request
        res.render('pages/status',{status:render_status[2]});
    }
  });
});

function status(req, res){
  res.render('pages/status', {status:req.status});
}