var fs = require('fs');
module.exports = {
	base64_encode: function (file) {
	    // read binary data
	    var bitmap = fs.readFileSync(file);
		base64EncodedString=bitmap.toString('base64');
		return base64EncodedString;
	    // convert binary data to base64 encoded string
	    //return new Buffer(bitmap).toString('base64');
	},
	base64_decode: function(base64EncodedString) {
		return new Buffer(base64EncodedString, 'base64');
		//var imageBuffer = new Buffer(base64EncodedString, 'base64');
	}
}