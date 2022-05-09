

$(function () {


    /**
     * This function will get all the values in the inputs
     * and will create a valid object to be send to the server-side
     */
    function assembleNote() {
        let note = {};
        note.title = $("#title_input").val();
        note.body = $("#text_input").val();
        return note;
    }
    /**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
    $("#add_note_button").click(function (event) {
        event.preventDefault();
        let note = assembleNote();

        $.ajax({
            url: '/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(note),
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                alert(JSON.stringify(response))
                //$("#add-out").text(response);
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });




})