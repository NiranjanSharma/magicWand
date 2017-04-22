/**
 * Created by sanjay on 3/23/2017.
 */

var express = require('express');
var app = express();

var explainer = require('./kafkaProducer');



//var prepare1 = require('./prepare');

var fs = require('fs');

var encodingFormat = 'utf8';

const fse = require('fs-extra')

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

var ejsDir='../output/Preview/'

var jsDir = './public/output/Preview/';


var scenesCount = 15;


      
var imageType = '.png';
      
     


// slideshow route
router.post('/',urlencodedParser,slide);

    function slide(req, res, userData)
    {
     
      var usersRetrievedData = [];

        var userData1 = '';

       var imgdata = [];

      var imageCount =0;
      
      var clientName=req.user.username;

    for(var i=1; i<=scenesCount; i++)
             {
                 if (fileExists.sync(jsDir+clientName+'_'+imageCount+imageType)) {    
                    
                     var fileName =  ejsDir+clientName+'_'+imageCount+imageType;  
                    
                    // console.log("Each image path"+fileName);
    
                     imgdata[i] = {img_responsive: fileName,'img_1_src': fileName,'img_1_text': "Text"+clientName,'img_1_thumb':fileName};   
    
                     imageCount = imageCount + 1;
                 }

            }

  if(req.body.generateForm!='true')
   {

      if(req.body.generateVideo!='true')
       { 
         

          res.render('pages/slideshow', {datas: imgdata,clientName:clientName,imageCount:imageCount,scenesCount:scenesCount,userData:userData,status:false});


       }
      else
      {


                    var file_path1 = './jsonData/'+clientName+'.json';

                    var fileData = fs.readFileSync(file_path1);
                  
                    usersRetrievedData =  JSON.parse(fileData);
                    console.log("USER RETRIEVED DATA"+JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1])); 

                    delete usersRetrievedData[usersRetrievedData.length - 1]["render-status"];

                    usersRetrievedData[usersRetrievedData.length - 1].output=  req.user.username
                    usersRetrievedData[usersRetrievedData.length - 1].module='AVI DV NTSC 48kHz',
                    usersRetrievedData[usersRetrievedData.length - 1].target='template_01',
                    usersRetrievedData[usersRetrievedData.length - 1].render_status='ready'
  
                    userData1 =  JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]);

                    console.log("USER RETRIEVED DATA"+JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]));  
                
                explainer.sendProductExplainerJson("formJson", JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);

                storeLatestClientData(clientName,JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);



                const dir = jsDir+clientName;

                fse.emptydirSync(dir);

                for(var i=0; i<scenesCount; i++) 
                fse.move(jsDir+clientName+'_'+i+imageType, dir+'/'+clientName+'_'+i+imageType, err => {
                  if (err) return console.error(err)

                    console.log('success!')
                })

                res.render('pages/status', {datas: imgdata,clientName:clientName,imageCount:imageCount,scenesCount:scenesCount,status:true});

      }  
    }
    else{

         const file_path2 = './jsonData/'+clientName+'.json';
         var fileData = fs.readFileSync(file_path2);
         var clientData = JSON.parse(fileData);


               const dir = jsDir+clientName;

                fse.emptydirSync(dir);

                for(var i=0; i<scenesCount; i++) 
                fse.move(jsDir+clientName+'_'+i+imageType, dir+'/'+clientName+'_'+i+imageType, err => {
                  if (err) return console.error(err)

                    console.log('success!')
                })

         res.render('pages/template1',{clientData:clientData});
        //require('./prepare').slide(req,res,temp);

    }
  }


function storeLatestClientData (clientName,formJson,res) {

if(formJson)

{

    const file_path = './jsonData/'+clientName+'.json'

    fse.ensureFile(file_path, err => {
      console.log(err) // => null
      // file has now been created, including the directory it is to be placed in
    })

        var data = fs.readFile(file_path, encodingFormat, function(err, data) {

      // write the JSON to a file in an array format using stream
        var stream = fs.createWriteStream(file_path);
        stream.once('open', function (fd) {
            stream.write('[' + formJson.replace(/render_status/g,'render-status') + ']');
            stream.end();
        });

    //}

});

}

}


module.exports = router;

module.exports.slide = slide;

