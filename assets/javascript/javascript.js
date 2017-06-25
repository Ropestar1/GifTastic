//VARIABLES
var topics = ['Super Mario', 'Call of Duty', 'Bomberman', 'Megaman'];

//FUNCTION DECLARATIONS
function topicsIterator() {
	$('.topics-styling').empty();

	for (var i = 0; i < topics.length; i++) {
		
		//	HOW DOES THIS JQUERY CALL NOT AFFECT EXISTING BUTTONS?????
		var topicsButton = $('<button>');
		//console.log('initial', topicsButton);
		//add the attributes/ids that need to be attached so button can be used for the search
		topicsButton.attr('type', 'button');
		// console.log('attribute added', topicsButton);
		topicsButton.addClass('btn btn-default topics-buttons');
		// console.log('class added', topicsButton);
        topicsButton.attr('data-name', topics[i]);
        // console.log('data-name added', topicsButton);
        topicsButton.text(topics[i]);
        // console.log('text added', topicsButton);
		$('.topics-styling').append(topicsButton); //INSERT VARIABLE AT END OF THIS	
		// console.log('end of button', topicsButton);
	}	

	$("#add-topic").on("click", function(event) {//may have an issue with teh jquery call
        event.preventDefault();

		// This line will grab the text from the input box
        var userTopicText = $("#topic-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(userTopicText);
        userTopicText = $("#topic-input").val("");

		topicsIterator();
	});
}

//WORK ON API AJAX AND JSON
function displayResults() {
	var queryTerm = $(this).attr('data-name');
	console.log(this);
	var apiKey = 'd16a7ac4a7da4915a463d555380fe185'; //CHANGE THE API KEY
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + queryTerm + '&api_key=' + apiKey + '&limit=10'; //FIX THE LINK AND NAME
	
	$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      //add function to put stuff into the results
      console.log(queryTerm);
      console.log(response);

      // // Creating a div to hold the movie
      // var movieDiv = $('<div class="movie">');

      // // Storing the rating data
      // var rating = response.Rated;

      // // Creating an element to have the rating displayed
      // var pOne = $("<p>").text("Rating: " + rating);

      // // Displaying the rating
      // movieDiv.append(pOne);

      // // Storing the release year
      // var released = response.Released;

      // // Creating an element to hold the release year
      // var pTwo = $("<p>").text("Released: " + released);

      // // Displaying the release year
      // movieDiv.append(pTwo);

      // // Storing the plot
      // var plot = response.Plot;

      // // Creating an element to hold the plot
      // var pThree = $("<p>").text("Plot: " + plot);

      // // Appending the plot
      // movieDiv.append(pThree);

      // // Retrieving the URL for the image
      // var imgURL = response.Poster;

      // // Creating an element to hold the image
      // var image = $("<img>").attr("src", imgURL);

      // // Appending the image
      // movieDiv.append(image);

      // // Putting the entire movie above the previous movies
      // $("#movies-view").prepend(movieDiv);
    });
}

//FUNCTION CALLS
topicsIterator();
$(document).on("click", ".topics-buttons", displayResults);