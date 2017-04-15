/**
 * Created by sanjay on 3/23/2017.
 */

var express = require('express');
var app = express();

// routes
var router = express.Router();
var Timer = require('timer.js');


// slideshow route
router.get('/',slide);






    function slide(req, res, clientName)
    {

    

    var timer = new Timer({
    tick : 1,
    ontick : function (sec) {
        console.log('interval', sec);
    },
    onstart : function() {
        console.log('timer started');
    },
     onstop  : function() { console.log('timer stop'); 
   }
});

// defining options using on
timer.on('end', function () {
    console.log('timer ended');
    this.start(4).off('end');
});
     /* var dir='../output/Preview/';

      var filePrefix = 'cli_test_'+clientName+'_'; 

      var imageType = '.png';

      //var sequnceCode = '0000'       
      
      var imgdata = [];

             for(var i=0; i<14; i++)
             {

             console.log("Each image path"+dir+filePrefix+i+imageType);
             imgdata[i] = {'img_1_responsive': dir+filePrefix+i+imageType,'img_1_src': dir+filePrefix+i+imageType,'img_1_text': "Text"+clientName,'img_1_thumb':dir+filePrefix+i+imageType};   
             } */


/*
            req.session.characterName=req.body.characterName,
            req.session.characterProfession=req.body.characterProfession,
            req.session.problemStatement=req.body.problemStatement,
            req.session.exploredOption1=req.body.exploredOption1,
            req.session.exploredOption2=req.body.exploredOption2,
            req.session.exploredOption3=req.body.exploredOption3,

           req.session.productName=req.body.productName,    
    req.session.productLogo=req.files.productLogo[0].filename,

    req.session.soultionOffered= req.body.soultionOffered,
    req.session.keyFeature1= req.body.keyFeature1,
    req.session.keyFeature2= req.body.keyFeature2,
    req.session.keyFeature3= req.body.keyFeature3,

    req.session.screen1Text= req.body.screen1Text,
    req.session.screen1= req.files.screen1[0].filename,

    req.session.screen2Text= req.body.screen2Text,
    req.session.screen2= req.files.screen2[0].filename,

    req.session.screen3Text= req.body.screen3Text,
    req.session.screen3= req.files.screen3[0].filename,
    
    req.session.benefit1= req.body.benefit1,
    req.session.benefit2= req.body.benefit2,
    req.session.benefit3= req.body.benefit3,
    
   req.session.website= req.body.website,
    req.session.slogan= req.body.slogan,
   req.session.output= req.body.output+'_[#]'
*/

     

        //console.log("Image DATA"+imgdata[0]['img_1_responsive']);
   



console.log('OUTPUT');
      res.render('pages/timer');
};



module.exports = router;
module.exports.slide = slide;