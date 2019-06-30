//Grab articles
$.getJSON("/", function(data) {
    for(var i = 0; i < data.length; i++) {
        //Display title and summary with link as an href
        $("#articles").append("<p data-id='" + data[i]._id + "' target='_blank' href='" + data[i].link +"'>" + data[i].title + "<br />" + data[i].summary + "</p>")
    }
})