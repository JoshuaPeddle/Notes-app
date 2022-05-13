/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var notes = undefined;
$(function () {




	/**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
	$('#get_all_notes').click(function (event) {
		showLoader(1);
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
				notes = response;
				hideLoader('fast',100);
			},
			//We can use the alert box to show if there's an error in the server-side
			error: function (xhr) {
				var errorMessage = xhr.status + ': ' + xhr.statusText;
				alert('Error - ' + errorMessage);
			}
		});
	});


	/**
     * This function deletes an existing note
	 * Have to use weird syntax due to these object being inserted from AJAX requests
     */
	$(document).on('click','.note_delete',function () {

		$.ajax({
			url: '/notes/'.concat($(this).parent().attr('id')),
			type: 'delete',
			contentType: 'application/json',
			success: function () {
	
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
		let $toAdd =constructNoteDiv(element.title, element.body, element.id);
		$('#all_notes').append($toAdd);
	});
	}
	else{
		let $toAdd =constructNoteDiv(response.title, response.body, element.id);
		$('#all_notes').append($toAdd);
	}	
}


function constructNoteDiv(title, body, id){
	if (title.length >10){
		title = body.slice(0,10) +'...';
	}
	if (body.length >20){
		body = body.slice(0,40) +'...';
	}
	let $div = $('<div>').attr({'id':id, 'class':'note_div'});
	let $title = $('<label>').text('Title: '+title.toString()).attr('class','note_title');
	let $body = $('<label>').text('Body: '+body.toString()).attr('class','note_body');
	let $editBtn = $('<button>').text('Edit').attr('class','note_edit');
	let $deleteBtn = $('<button>').text('Delete').addClass('note_delete');
	$title.appendTo($div);
	$body.appendTo($div);
	$editBtn.appendTo($div);
	$deleteBtn.appendTo($div);
	return $div;
}