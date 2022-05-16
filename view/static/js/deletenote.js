/* eslint-disable no-undef */
/**
     * This function deletes an existing note
	 * Have to use weird syntax due to these object being inserted from AJAX requests
     */
$(document).on('click','.note_delete',function () {
	$.ajax({
		url: '/notes/',
		type: 'delete',
		contentType: 'application/json',
		data: JSON.stringify({noteid:$(this).parent().parent().attr('id')}),
		success: function (response) {
			if(!isLoggedIn(response)){return;}
			$('#get_all_notes').click();
		},
		//We can use the alert box to show if there's an error in the server-side
		error: function (xhr) {
			var errorMessage = xhr.status + ': ' + xhr.statusText;
			alert('Error - ' + errorMessage);
		}
	});
});