// auth/index.js
(function (auth) {

	var data = require("../data");
	var hasher = require("./hasher");
	var passport = require("passport");
	var localStrategy = require("passport-local").Strategy;

	function userVerify(username, password, next) {
		data.getUser(username, function(err, user){
			
		});
	}
	
	auth.init = function (app) {
		
		app.get("/register", function (req, res) {
            
            res.render("register", {
                title: "Register for The Board.",
                message: req.flash("registrationError")
            });              
            
        });

        app.post("/register", function (req, res) {
            
            var salt = hasher.createSalt();
            
            var password = req.body.password
            
            var passwordHash = hasher.computeHash(password, salt);
            
        	var user = {
        		name: req.body.name,
        		email: req.body.email,
        		userName: req.body.username,
        		passwordHash: passwordHash,
        		salt: salt
        	};

        	data.addUser(user, function (err) {
        		if (err) {
        			req.flash("registrationError", "Could not save to database.");
        			res.redirect("/register");
        		} else {
        			res.redirect("/login");
        		}
        	})

        });

        app.get("/login", function (req, res) {
            
            res.render("login", {
                title: "Login on The Board.", 
            });              
            
        });

	};

})(module.exports);