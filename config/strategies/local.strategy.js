var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {

	passport.use(new LocalStrategy({
		usernameField: 'email',
		//emailField: 'email',
		passwordField: 'password'
		//uncomment the below if you take email as the input
		
	}, 
	function (email, password, done){
		var url = 'mongodb://localhost:27017/libraryApp';
		mongodb.connect(url, function(err,db){
			var collection = db.collection('users');
			collection.findOne(
				{email: email}, 
				function(err, results) {
					if(results.password == password) {
							var user= results;	
							done(null, user);
					} else{
						done(null, false, {message: 'Invalid username or password'});
					}
					
					
			});
		});
	}));
};
