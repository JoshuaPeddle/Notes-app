

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
				// We can print in the front-end console to verify
				// what is coming back from the server side
				console.log(JSON.stringify(response));
				alert(JSON.stringify(response));
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