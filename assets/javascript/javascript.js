//VARIABLES
var topics = ['Super Mario', 'Call of Duty', 'Bomberman', 'Megaman', 'Sonic the Hedgehog', 'Castlevania', 'Street Fighter', 'Devil May Cry', 'God of War'];

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

	$("#add-topic").click(function(event) {
        event.preventDefault();

		// This line will grab the text from the input box
        var userTopicText = $("#topic-input").val().trim();

        // The movie from the textbox is then added to our array
        if (topics.indexOf(userTopicText) === -1 && userTopicText != '') {
        	topics.push(userTopicText); //	WHY ARE DUPLICATES BEING CREATED???
        	userTopicText = $('#topic-input').val('');
    	}

		topicsIterator();
	});

	$('.topics-buttons').click(displayResults);
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
		$('#results').empty();

		// console.log(queryTerm);
		console.log(response);
		// console.log(response.data.length);
		for (var i = 0; i < response.data.length; i++) {
        	console.log(response.data.length);
        	// Creating a div to hold the movie
	    	var topicDiv = $('<div class="col-md-4 topic-result">');
	    	var gifImage = $('<img class="img-responsive">');

	    	var rating = response.data[i].rating;
	    	//console.log('Rating: ', rating);

			var ratingDisplay = $("<p>").text("Rating: " + rating);

			topicDiv.append(ratingDisplay);

			var gifImageURL = response.data[i].images.downsized_still.url;

			var animateURL = response.data[i].images.downsized_medium.url;

			function gifGeneratorURLs () {
				gifImage.attr('src', gifImageURL);
				gifImage.attr('data-image-still', gifImageURL);
			 	gifImage.attr('data-image-animate', animateURL);
			 	gifImage.attr('data-state', 'still');
				gifImage.addClass('gif');
			}
			
			gifGeneratorURLs();
			
			topicDiv.append(gifImage);
			
			$("#results").append(topicDiv);
		}
    });
}

// $(document).ready(function() {
	// $('.gif').on('click', function() {
	function gifSwap() {
		//console.log('click working');
		var state = $(this).attr('data-state');
		var animate = $(this).attr('data-image-animate');
		var still = $(this).attr('src', $(this).attr('data-image-still'));
		
		console.log(this);

		if (state === 'still') {
			$(this).attr('src', animate );
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
		}
	}
// 	})
// })

//FUNCTION CALLS
topicsIterator();
$(document).on('click', '.gif', gifSwap);
