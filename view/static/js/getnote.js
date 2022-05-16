/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var notes = undefined;
$(function () {
	$(document).ready(function () {
		$('#get_all_notes').click();
	});
	

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
			success: function (response) {
				if(!isLoggedIn(response)){return;}
				if (response === 'No notes found'){
					$('#all_notes').empty();
					hideLoader('fast',100);
					return;
				}
				hideLoader('fast',100);
				response.reverse();
				addNotesTo(response);
				notes = response;
				
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
	let $note_info = $('<div>').attr({'class':'sub_note_div title_body'});
	let $title = $('<label>').text(title.toString()).attr('class','note_title');
	let $body = $('<label>').text(body.toString()).attr('class','note_body');
	let $note_buttons = $('<div>').attr({'class':'sub_note_div edit_delete'});
	let $editBtn = $('<button>').text('Edit').addClass('note_edit note_btn');
	let $deleteBtn = $('<button>').text('Delete').addClass('note_delete note_btn');
	$title.appendTo($note_info);
	$body.appendTo($note_info);
	$editBtn.appendTo($note_buttons);
	$deleteBtn.appendTo($note_buttons);
	$note_info.appendTo($div);
	$note_buttons.appendTo($div);
	return $div;
}