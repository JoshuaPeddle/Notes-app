/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


$(function () {
	$(document).on('click','#submit',function (event) {
		event.preventDefault();
		$.ajax({
			url: '/login/password',
			type: 'post',
			data:{username:$('#username').val(), password:$('#current-password').val()},
			success: function (response) {
				if (response.includes('<meta name="description" content="Note entry page for notesapp.cloud.">')){
					$('.password-popup').remove();
					$('#get_all_notes').click();
				}
				
			},
			//We can use the alert box to show if there's an error in the server-side
			error: function (xhr) {
				var errorMessage = xhr.status + ': ' + xhr.statusText;
				alert('Error - ' + errorMessage);
			}
		});
	});

});

function isLoggedIn(res){

	if (typeof res === 'string' || res instanceof String){

		if (res.includes('<div id="login_container"')){
			hideLoader('fast',1000, ()=>{
				showSuccessCheck(1000);
			});
			let $div = $('<div>');
			$div.addClass('password-popup');
			$div.html(res);

			$div.appendTo($('#title_container'));
			return false;
		}
		return true;  
	}
	return true;
}