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
		$('#results').empty();

		// console.log(queryTerm);
		// console.log(response);
		// console.log(response.data.length);
		
		for (var i = 0; i < response.data.length; i++) {
        	// console.log(response.data.length);
        	// Creating a div to hold the movie
	    	var topicDiv = $('<div class="topic-result">');

	    	// Storing the rating data
	    	var rating = response.data[i].rating;
	    	console.log('Rating: ', rating);

			// Creating an element to have the rating displayed
			var ratingDisplay = $("<p>").text("Rating: " + rating);

			// Displaying the rating
			topicDiv.append(ratingDisplay);

			// Storing the release year
			var stillImageURL = response.data[i].images.downsized_still.url;

			// Creating an element to hold the image
			var stillImage = $("<img>").attr("src", stillImageURL);

			// Appending the image
			topicDiv.append(stillImage);

			// Putting the entire movie above the previous movies
			$("#results").append(topicDiv);
		}



		//add the gif swap click here!!!!!!

    });
}

//FUNCTION CALLS
topicsIterator();
$(document).on("click", ".topics-buttons", displayResults);