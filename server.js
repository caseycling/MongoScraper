//Require packages
var express = require("express")
var exphbs = require("express-handlebars")
var mongoose = require("mongoose")
var axios = require("axios")
var cheerio = require("cheerio")
var path = require("path")

//Import models
var db = require("./models")

var PORT = 3000;

//Initialize express
var app = express();

//Initialize handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main" 
    })
);

//Set view engine
app.set("view engine", "handlebars")



//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//Connect to Mongo
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });

// Use express.static to serve the public folder as a static directory
app.use(express.static("views"));

//Routes

//GET route for displaying unsaved articles in root route
app.get("/", function(req, res) {
    db.Article.find({ saved: false})
    .then(function(data, err) {
        var hbsObject = {
            articles: data
        }
        console.log(hbsObject)
        res.render("index", hbsObject)
       
    })
    .catch(function(err) {
        res.json(err)
    })
})

//GET route for scrapping
app.get("/scrape", function(req, res) {
    //Grab body of html with axios
    axios.get("http://www.nytimes.com").then(function(response) {
        
        var $ = cheerio.load(response.data)

        $("section[data-block-tracking-id='Top Stories'] article").each(function(i, element) {
            //Empty object to save results
            var result ={}

            //Object properties with values scraped from website
            result.title = $(this).find("a").find("h2").text().replace("<span>","").replace("</span>", "");
            result.summary = $(this).find("a").children("ul").html().replace("<li>","").replace("</li>","").replace("<li>","").replace("</li>","");
            result.href = $(this).find("a").attr("href")
            result.saved = false;

            //Create new article using result object
            db.Article.create(result)
            .then(function(dbArticle) {
                // View result in console
                console.log(dbArticle)
                hbsObj = {
                    articles: dbArticle
                }

                // location.reload();
                // Render results to index
                
            })
            .catch(function(err) {
                console.log(err)
            })
        })
    })
})

//Get route to display saved articles
app.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
    .then(function(data, err) {
        hbsObj = {
            articles: data
        }
        res.render("saved", hbsObj)
    })
    .catch(function(err) {
        console.log(err)
    })
})
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  