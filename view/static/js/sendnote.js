

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
		});
	});
});


/**
 * Show sucess icon for 'showFor' ms
*/
async function showSuccessCheck(showFor){
	$('#check').html('&#10003;');
	$('#check').fadeTo('fast',1);
	await new Promise(e => {return setTimeout(e, showFor);});	
	$('#check').fadeOut('fast',0);
}

/**
 * Wait 'wait' ms, then fadeOut in 'fadeTime
*/
function showLoader(fadeTime){
	$('#spinner').fadeTo(fadeTime,1);
	
}

/**
 * Wait 'wait' ms, then fadeOut in 'fadeTime
*/
async function hideLoader(fadeTime,wait, cb){
	await new Promise(e => {return setTimeout(e, wait);});	
	$('#spinner').fadeOut(fadeTime,0);
	cb();
}