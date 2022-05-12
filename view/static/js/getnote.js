

$(function () {

	/**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
	$('#get_all_notes').click(function (event) {
		event.preventDefault();
		$.ajax({
			url: '/notes',
			type: 'get',
			contentType: 'application/json',
			success: function (response) {
				if (response === 'No notes found'){
					return;
				}
				addNotesTo(response);
			},
			//We can use the alert box to show if there's an error in the server-side
			error: function (xhr) {
				var errorMessage = xhr.status + ': ' + xhr.statusText;
				alert('Error - ' + errorMessage);
			}
		});
	});
});


function addNotesTo(response){
	$('#all_notes').empty();
	if (Array.isArray(response)){response.forEach(element => {
		let $toAdd =constructNoteDiv(element.title, element.body);
		$('#all_notes').append($toAdd);
	});
	}
	else{
		let $toAdd =constructNoteDiv(response.title, response.body);
		$('#all_notes').append($toAdd);
	}	
}


function constructNoteDiv(title, body){
	if (title.length >10){
		title = body.slice(0,10) +'...';
	}
	if (body.length >20){
		body = body.slice(0,40) +'...';
	}
	let $div = $('<div>').attr('id','note_container');
	let $title = $('<label>').text('Title: '+title.toString()).attr('id','note_title');
	let $body = $('<label>').text('Body: '+body.toString()).attr('id','note_body');
	$title.appendTo($div);
	$body.appendTo($div);
	return $div;
}