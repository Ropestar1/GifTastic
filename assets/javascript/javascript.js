//VARIABLES
var topics = ['Super Mario', 'Call of Duty', 'Bomberman', 'Megaman'];

//FUNCTION DECLARATIONS
function topicsIterator() {
	$('#topics-buttons').empty();

	for (var i = 0; i < topics.length; i++) {
		
		//	HOW DOES THIS JQUERY CALL NOT AFFECT EXISTING BUTTONS?????
		var topicsButton = $('<button>');
		//console.log('initial', topicsButton);
		//add the attributes/ids that need to be attached so button can be used for the search
		topicsButton.attr('type', 'button');
		// console.log('attribute added', topicsButton);
		topicsButton.addClass('btn btn-default topics-styling');
		// console.log('class added', topicsButton);
        topicsButton.attr('data-name', topics[i]);
        // console.log('data-name added', topicsButton);
        topicsButton.text(topics[i]);
        // console.log('text added', topicsButton);
		$('#topics-buttons').append(topicsButton); //INSERT VARIABLE AT END OF THIS	
		// console.log('end of button', topicsButton);
	}
}

$("#add-topic").on("click", function(event) {//may have an issue with teh jquery call
        event.preventDefault();

		// This line will grab the text from the input box
        var userTopicText = $("#topic-input").val();

        // The movie from the textbox is then added to our array
        topics.push(userTopicText);
        userTopicText = $("#topic-input").val("");

        topicsIterator();
});


// $("#add-movie").on("click", function(event) {
// 		var queryTerm = topics[i];
// 		var apiKey = 'dc6zaTOxFJmzC'; //change the api key
// 		var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + queryTerm + '&api_key=' + apiKey + '&limit=10' + queryTerm[i]; //FIX THE LINK AND NAME
		
// 		$.ajax({
// 	      url: queryURL,
// 	      method: 'GET'
// 	    }).done(function(response) {
// 	      console.log(response);

// 	    });


//FUNCTION CALLS
topicsIterator();