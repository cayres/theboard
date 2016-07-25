// auth/index.js
(function (auth) {

	var data = require("../data");
	
	auth.init = function (app) {
		
		app.get("/register", function (req, res) {
            
            res.render("register", {
                title: "Register for The Board.",
                message: req.flash("registrationError")
            });              
            
        });

        app.post("/register", function (req, res) {
        	var user = {
        		name: req.body.name,
        		email: req.body.email,
        		userName: req.body.userName,
        		passwordHash: "",
        		salt: ""
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