//Require packages
var express = require("express")
var exphbs = require("express-handlebars")
var mongoose = require("mongoose")
var axios = require("axios")
var cheerio = require("cheerio")

//Import models
var db = require("./models")

var PORT = 3000;

//Initialize express
var app = express();

//Initialize handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "index" 
    });
);

//Set view engine
app.set("view engine", "handlebars")


//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

