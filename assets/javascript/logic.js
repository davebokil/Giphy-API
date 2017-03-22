// TV SHOW GIF LOCATER
// DAVE BOKIL 2017
// RUTGERS WEEK 7


// jquery wrapper
// $(document).ready(function() {


  // Initial array of buttons
  var shows = ["Game of Thrones", "Breaking Bad", "Mad Men", "The Sopranos", "Stranger Things"]

  // Function to render buttons on to the page
  function renderButtons() {
      // empty the div first
      $("#gifs-appear-here").empty();
      // render buttons based on the length of the shows array
      for (var i = 0; i < shows.length; i++) {
          var a = $("<button>");
          a.addClass("button btn btn-default gifButton");
          a.attr("data-person", shows[i]);
          a.text(shows[i]);
          $("#tvButtons").append(a);
      }
  }

  renderButtons()

  // Event listener for all button with gifButton class
  $(".gifButton").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var tvShow = $(this).attr("data-person");
      console.log(tvShow)

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing AJAX GET request
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


                      // Creating an image tag
                      var personImage = $("<img>");

                      // Giving the image tag an src attribute of a proprty pulled off the
                      // result item
                      personImage.attr("src", results[i].images.fixed_height.url);

                      // Prepending the results to the "#gifs-appear-here" div in the HTML
                      $("#gifs-appear-here").prepend(personImage);

              }
          });
  });



// }

            






