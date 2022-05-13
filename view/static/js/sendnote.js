/* eslint-disable no-undef */


$(function () {

	/**
     * This function will get all the values in the inputs
     * and will create a valid object to be send to the server-side
     */
	function assembleNote() {
		let note = {};
		note.title = $('#title_input').val();
		note.body = $('#text_input').val();
		return note;
	}

	/**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
	$('#add_note_button').click(function (event) {
		showLoader('slow');
		event.preventDefault();
		let note = assembleNote();
		note.noteid = $('#add_note_button').val();

		if (isEditing){
			$.ajax({
				url: '/notes',
				type: 'PUT',
				contentType: 'application/json',
				data: JSON.stringify(note),
				success: function () {
					hideLoader('fast',1000, ()=>{
						showSuccessCheck(1000);
					});
					doneEditing();
					// We can print in the front-end console to verify
					// what is coming back from the server side
					note.title = $('#title_input').val('');
					note.body = $('#text_input').val('');

					//$("#add-out").text(response);
				},
				//We can use the alert box to show if there's an error in the server-side
				error: function (xhr) {
					var errorMessage = xhr.status + ': ' + xhr.statusText;
					alert('Error - ' + errorMessage);
				}
			});
		}else{
			$.ajax({
				url: '/',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(note),
				success: function () {
					hideLoader('fast',1000, ()=>{
						showSuccessCheck(1000);
					});
					// We can print in the front-end console to verify
					// what is coming back from the server side
					note.title = $('#title_input').val('');
					note.body = $('#text_input').val('');
				//$("#add-out").text(response);
				},
				//We can use the alert box to show if there's an error in the server-side
				error: function (xhr) {
					var errorMessage = xhr.status + ': ' + xhr.statusText;
					alert('Error - ' + errorMessage);
				}
			});}
		$('#get_all_notes').click();
	});
});


