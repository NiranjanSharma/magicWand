var fs = require('fs');
module.exports = {
	createImageFromBuffer: function(imageBuffer,imagePath){
		fs.writeFile(imagePath, imageBuffer, function(err) { 
            if(err) {
                return console.log(err);
            }
            console.log("The image was created and saved at: " + imagePath); 
        });		
	}

};