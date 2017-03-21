var shows = ["Game of Thrones", "Breaking Bad", "Mad Men", "The Sopranos", "The Wire"]

// Dynamically Create buttons for the initial titles in the array
function renderButtons() {
    $("#tvButtons").empty();
    for (var i = 0; i < shows.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-default");
        a.attr("data-name", shows[i]);
        a.text(shows[i]);
        $("#tvButtons").append(a);
    }
}

$("#addButton").on("click", function(event){
    event.preventDefault();
	var showrequest = $("#tvshowInput").val().trim();
	shows.push(showrequest);
	renderButtons()
	console.log(showrequest)

});

renderButtons()

// AJAX Call

var movie = $(this).attr("data-name");
console.log(movie)
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
$.ajax({
          url: queryURL,
          method: "GET"
        })