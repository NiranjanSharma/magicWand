var express = require('express');
var mongodb = require('mongodb').MongoClient;
var authRouter = express.Router();
var passport = require('passport');



var router = function() {
authRouter.route('/signUp')
		.post(function(req,res){
			console.log(req.body);
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function(err,db){
				var collection = db.collection('users');
				var user = {
						username: req.body.userName,
						password: req.body.password,
						email: req.body.email
				};
				//res.redirect('/createObj');

				collection.insert(user, function(err, results){
					req.login(results.ops[0], function() {
						res.redirect('/auth/profile');
						//res.redirect('/createObj');
					});
				});
			});
			
		});
authRouter.route('/signIn')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
		}), function(req, res){
			//console.log("authenticating the user: "+req.user);
				res.redirect('/auth/profile');
		});

authRouter.route('/profile')
		.all(function(req, res, next){
				if(!req.user){
					res.redirect('/');
				} 
				console.log('req.user._id ' + req.user._id);
				next();
			})
			.get(function(req, res){
					//res.json(req.user);
					res.redirect('/createObj');
					 //res.render('pages/template',{clientData:[]});
			});
	return authRouter;
};
module.exports = router;