//Function to upload data onto page
function articleRender(data) {
    for(var i = 0; i < data.length; i++) {
        //Display title and summary with link as an href
        $("#articles").append("<p data-id='" + data[i]._id + "' target='_blank' href='" + data[i].link +"'>" + data[i].title + "<br />" + data[i].summary + "</p>")
    }
}

//Grab articles
$.getJSON("/", function(data) {
    for(var i = 0; i < data.length; i++) {
        //Display title and summary with link as an href
        $("#articles").append("<p data-id='" + data[i]._id + "' target='_blank' href='" + data[i].link +"'>" + data[i].title + "<br />" + data[i].summary + "</p>")
    }
})

//On clicking scrape button, use ajax call for "/scrape" route
$("#scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(data) {
        console.log(data);
        articleRender(data); 
    })
})

//Clicking saved button will fire ajax call to /saved route to query database for saved articles
$("#saved").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/saved"
    })
    .then(function(data) {
        console.log(data)
    })
})