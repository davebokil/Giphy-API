// THE TV SHOW GIF GENERATOR!
// DAVE BOKIL 2017
// RUTGERS HOMEWORK 6
// ------------------------------------------------------------------------------------------

$(document).ready(function() {
    
    // VARIABLES
    // ------------------------------------------------------------------------------------------
    var shows = ["Game of Thrones", "Breaking Bad", "Mad Men", "The Sopranos", "Stranger Things"]
    
    // FUNCTIONS
    // ------------------------------------------------------------------------------------------

    // Function to create buttons based on the initial array
    function createButtons() {
        for (var i = 0; i < shows.length; i++) {
        var a = $("<button>");
            a.attr("data-search", shows[i]);
            a.addClass("btn btn-default");
            a.addClass("searchButtons");
            a.text(shows[i]);
            $("#tvButtons").append(a);
        }
    }

    // Function to create new buttons based on user input
    function addSearchTerms(e) {
        e.preventDefault();
        var userTerm = $("#tvshowInput").val().trim();
        shows.push(userTerm)
        var a = $("<button>");
            a.attr("data-search", userTerm);
            a.addClass("btn btn-default");
            a.addClass("searchButtons");
            a.text(userTerm);
            $("#tvButtons").append(a);
            console.log(shows)
    }

    // Function to handle results when button is clicked
    function displayResults(e) {
        $("#gifs-appear-here").empty();
        e.preventDefault();
        // "this" refers to the button that was clicked
        var tvShow = $(this).attr("data-search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL)
        // Performing AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back...
        .done(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Build the image with all the correct attributes in place
                var theImage = $("<img>");
                var stillImage = results[i].images.fixed_height_still.url
                var AnimatedImage = results[i].images.fixed_height.url
                theImage.attr("src", stillImage)
                theImage.attr("data-still", stillImage)
                theImage.attr("data-animate", AnimatedImage)
                theImage.attr("data-state", "still")
                theImage.addClass("gif")
                $("#gifs-appear-here").prepend(theImage);
                console.log(theImage)      
            }
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                      if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                      } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                      }
            })
        });
    }

    // ACTIONS
    // ------------------------------------------------------------------------------------------

    // On page load, run createButtons
    createButtons();

    // when user clicks on addbutton, run addSearchTerms
    $('#addButton').click(addSearchTerms);

    // when user clicks on anything with a class of searchButtons, run displayResults
    $(document).on('click', '.searchButtons', displayResults);
})



// // Notes::
// // ------------------------------------------------------------------------------------------
// // img tag with all necessary data attributes:
// <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
// data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
// data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" 
// data-state="still" 
// class="gif">


