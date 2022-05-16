/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
	
/**
     * This function deletes an existing note
	 * Have to use weird syntax due to these object being inserted from AJAX requests
     */
$(document).on('click','.note_edit',function () {
	const noteId = $(this).parent().parent().attr('id');
	let note = notes.find(e=>{return e.id === noteId;});
	$('#title_input').val(note.title);
	$('#text_input').val(note.body);

	$('#add_note_button').addClass('editing');
	$('#add_note_button').attr('value',noteId);
	$('#add_note_button').html('Submit Edit');
	$('#cancel_editing_button').css('display','inline');
});


$(document).on('click','#cancel_editing_button',function () {
	$('#cancel_editing_button').css('display','none');
	$('#add_note_button').removeClass('editing');
	$('#add_note_button').attr('value','');
	$('#add_note_button').html('Add Note');
	$('#title_input').val('');
	$('#text_input').val('');
});

function isEditing(){
	if ($('#add_note_button').hasClass('editing')){
		return true;
	}
	return false;
}

function doneEditing(){
	$('#add_note_button').removeClass('editing');
	$('#add_note_button').html('Add note');
	$('#cancel_editing_button').css('display','none');
}