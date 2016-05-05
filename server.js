/// <reference path="typings/tsd.d.ts" />

var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");
// var ejsEngine = require("ejs-locals");

//Setup View Engine
// app.set("view engine", "jade");
// app.engine("ejs", ejsEngine); // support master page
// app.set("view engine", "ejs"); // ejs view engine
app.set("view engine", "vash");

//Set the public static folder
app.use(express.static(__dirname + "/public"));

//Map the route
controllers.init(app);

// app.get("/", function (req, res) {
//     // res.send("<html><body><h1>Express</h1></body></html>");
//     // res.render("jade/index", {title: "Express + Jade"});
//     // res.render("ejs/index", {title: "Express + EJS"});
//     res.render("index", {title: "Express + Vash"});
// })

var server = http.createServer(app);

server.listen(3000)