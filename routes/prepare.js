var express = require('express');
var explainer = require('./kafkaProducer');
var passport = require('passport');

// routes
var router = express.Router();
//router.post('/generateJson', generateJson);

// constants
var fs = require('fs');
const fse = require('fs-extra')
var Template = require('../models/template1');
var encodingFormat = 'utf8';
var file_path = './jsonData/productExplainer.json';
var bot_server_path = 'D:/ANIL_PRODUCTS/Product_Files/';
var main_directory = 'Main';
var copy_directory = bot_server_path + main_directory;

var imgpath = __dirname + '\\images\\';
var render_status = ['inProcess', 'reading', 'done'];
var uuid = require('uuid-lib');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './routes/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.toString().split('/')[1]);
  }
});

//Math.floor(100000 + Math.random() * 900000) for refId 

var upload = multer({storage: storage});


router.all('/',function(req,res,next){ 
    if(req.method!='POST') {
      res.redirect("/slideshow");
    } else {
      next();  
    } 
  });
  


router.post('/', upload.fields([
  {name:'productLogo', maxCount: 1},
  {name:'screen1', maxCount: 1},  {name:'screen2', maxCount: 1},  {name:'screen3', maxCount: 1}]), 

function(req, res) {

  var temp = new Template({
    characterName: req.body.characterName,
    characterProfession: req.body.characterProfession,
    problemStatement: req.body.problemStatement,
    exploredOption1: req.body.exploredOption1,
    exploredOption2: req.body.exploredOption2,
    exploredOption3: req.body.exploredOption3,

    productName: req.body.productName,    
    productLogo: req.files.productLogo[0].filename,

    soultionOffered: req.body.soultionOffered,
    keyFeature1: req.body.keyFeature1,
    keyFeature2: req.body.keyFeature2,
    keyFeature3: req.body.keyFeature3,

    screen1Text: req.body.screen1Text,
    screen1: req.files.screen1[0].filename,

    screen2Text: req.body.screen2Text,
    screen2: req.files.screen2[0].filename,

    screen3Text: req.body.screen3Text,
    screen3: req.files.screen3[0].filename,
    
    benefit1: req.body.benefit1,
    benefit2: req.body.benefit2,
    benefit3: req.body.benefit3,
    
    website: req.body.website,
    slogan: req.body.slogan,
    output:  req.user.username+'_[#]',
    module:'',
    target:'',
    render_status:'ready',

    ID: uuid.raw()
  });

//console.log("req.user: " + req.user);
explainer.sendProductExplainerJson("formJson",JSON.stringify(temp),0);

storeLatestClientData(req.user.username,JSON.stringify(temp),0);

require('./slideshow').slide(req,res,temp);


});





function storeLatestClientData (clientName,formJson,res) {

if(formJson)

{

    const file_path = './jsonData/'+clientName+'.json'

    fse.ensureFile(file_path, err => {
      console.log(err) // => null
      // file has now been created, including the directory it is to be placed in
    })

       var data = fs.readFile(file_path, encodingFormat, function(err, data) {

        var stream = fs.createWriteStream(file_path);
        stream.once('open', function (fd) {
            stream.write('[' + formJson.replace(/render_status/g,'render-status') + ']');
            stream.end();
        });


});

}

}



module.exports.storeLatestClientData = storeLatestClientData;

module.exports = router;