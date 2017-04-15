/**
 * Created by sanjay on 3/23/2017.
 */

var express = require('express');
var app = express();

var fs = require('fs');

var fs1 = require('fs-extra')

const fileExists = require('file-exists');
// routes
var router = express.Router();


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// slideshow route
router.get('/',urlencodedParser,slide);

    function slide(req, res)
    {
    
      var ejsDir='../output/Preview/'

      var jsDir = './public/output/Preview/';
   
      var scenesCount = 14;
      //console.log('req.user.username: '+req.user.username);
      //var clientName=req.user._id;
      var clientName=req.user.username;
      console.log('clientName: '+req.user.username);

      var imageType = '.png';
      
      var imgdata = [];

      var imageCount =0;



             for(var i=1; i<=scenesCount; i++)
             {
                 if (fileExists.sync(jsDir+clientName+'_'+imageCount+imageType)) {    
                     
                     var fileName =  ejsDir+clientName+'_'+imageCount+imageType;  
                     console.log("Each image path"+fileName);
    
                     imgdata[i] = {img_responsive: fileName,'img_1_src': fileName,'img_1_text': "Text"+clientName,'img_1_thumb':fileName};   
    
                     imageCount = imageCount + 1;
                 }

            } 

      res.render('pages/slideshow', {datas: imgdata,clientName:clientName,imageCount:imageCount});
    };
//

router.get('/',urlencodedParser,

    function (req, res)
    {
    
      var ejsDir='../output/Preview/'

      var jsDir = './public/output/Preview/';
   
      var scenesCount = 14;
      //console.log('req.user.username: '+req.user.username);
      //var clientName=req.user._id;
      var clientName=req.user.username;
      console.log('clientName: '+req.user.username);
 

      var imageType = '.png';
      
      var imgdata = [];

      var imageCount =0;

             

             for(var i=1; i<=scenesCount; i++)
             {
                 if (fileExists.sync(jsDir+clientName+'_'+imageCount+imageType)) {    
                    
                     var fileName =  ejsDir+clientName+'_'+imageCount+imageType;  
                    
                     console.log("Each image path"+fileName);
    
                     imgdata[i] = {img_responsive: fileName,'img_1_src': fileName,'img_1_text': "Text"+clientName,'img_1_thumb':fileName};   
    
                     imageCount = imageCount + 1;
                 }

            } 

      res.render('pages/slideshow', {datas: imgdata,clientName:clientName,imageCount:imageCount});
    });


module.exports = router;
module.exports.slide = slide;