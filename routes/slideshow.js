/**
 * Created by sanjay on 3/23/2017.
 */

var express = require('express');
var app = express();

var explainer = require('./kafkaProducer');

var fs = require('fs');

var encodingFormat = 'utf8';

var fs1 = require('fs-extra')

var file_path = 'D:/ANIL_PRODUCTS/SimpleWebApp/SimpleWebApp/jsonData/productExplainer.json';  

const fileExists = require('file-exists');
// routes
var router = express.Router();
var Template = require('../models/template1');

 

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './routes/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.toString().split('/')[1]);
  }
});

var upload = multer({storage: storage});

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });




// slideshow route
router.post('/',urlencodedParser,slide);

    function slide(req, res, userData)
    {
     
      var usersRetrievedData = [];

        var userData1 = '';

       var ejsDir='../output/Preview/'

       var jsDir = './public/output/Preview/';
    
       var scenesCount = 14;

      var clientName=req.user.username;
      
      var imageType = '.png';
      
      var imgdata = [];

      var imageCount =0;


    for(var i=1; i<=scenesCount; i++)
             {
                 if (fileExists.sync(jsDir+clientName+'_'+imageCount+imageType)) {    
                    
                     var fileName =  ejsDir+clientName+'_'+imageCount+imageType;  
                    
                    // console.log("Each image path"+fileName);
    
                     imgdata[i] = {img_responsive: fileName,'img_1_src': fileName,'img_1_text': "Text"+clientName,'img_1_thumb':fileName};   
    
                     imageCount = imageCount + 1;
                 }

            }


      if(req.body.generateVideo!='true')
       { 
          
          res.render('pages/slideshow', {datas: imgdata,clientName:clientName,imageCount:imageCount,scenesCount:scenesCount,userData:userData,status:false});
       }
      else
      {

                    var fileData = fs.readFileSync(file_path);
                  
                    usersRetrievedData =  JSON.parse(fileData);


                    delete usersRetrievedData[usersRetrievedData.length - 1]["render-status"];

                    usersRetrievedData[usersRetrievedData.length - 1].output=  req.user.username
                    usersRetrievedData[usersRetrievedData.length - 1].module='AVI DV NTSC 48kHz',
                    usersRetrievedData[usersRetrievedData.length - 1].target='template_01',
                    usersRetrievedData[usersRetrievedData.length - 1].render_status='ready'
  
                    userData1 =  JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]);

                    console.log("USER RETRIEVED DATA"+JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]));  
                
                explainer.sendProductExplainerJson("formJson", JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);

                res.render('pages/slideshow', {datas: imgdata,clientName:clientName,imageCount:imageCount,scenesCount:scenesCount,status:true});

      }  
    }

module.exports = router;
module.exports.slide = slide;