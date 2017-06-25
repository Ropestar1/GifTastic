var topics = ['Super Mario', 'Call of Duty', 'Bomberman', 'Megaman'];

function topicsIterator() {
	$('#topics-buttons').empty();
	for (var i = 0; i < topics.length; i++) {
		$('#topics-buttons').append('<button type="button" class="btn btn-default">' + topics[i]); //INSERT VARIABLE AT END OF THIS
	}
}

topicsIterator();