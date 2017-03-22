 var shows = ["Game of Thrones", "Breaking Bad", "Mad Men", "The Sopranos", "The Wire"]


function renderButtons() {
    $("#gifs-appear-here").empty();
    for (var i = 0; i < shows.length; i++) {
        var a = $("<button>");
        a.addClass("button btn btn-default gifButton");
        a.attr("data-person", shows[i]);
        a.text(shows[i]);
        $("#gifs-appear-here").append(a);
console.log(a)
    }
}
        console.log(shows)

        console.log(shows.length)

renderButtons()

// $("#addButton").on("click", function(event){
//     event.preventDefault();
//     var showrequest = $("#tvshowInput").val().trim();
//     shows.push(showrequest);
//     // renderButtons()
// });

    // Event listener for all button elements
    $(".gifButton").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-person");
      console.log(person)

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
      
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              // var gifDiv = $("<div class='item'>");

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Prepending the results to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(personImage);
            }
          }
        });
    });

