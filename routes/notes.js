//const Note = require('../model/note').Note;
const AuthoredNote = require('../model/note').AuthoredNote;
const express = require('express');
var router = express.Router();

/**
* This route constructs a Note object from the request data and calls its insertNote() function. 
* This function waits for the note to be inserted so it can respond with a status
*/
router.post('/', async function (req, res) {
    console.log(`Title: ${req.body.title}, Body: ${req.body.body}`);

    let new_note = new AuthoredNote(
        req.body.title,
        req.body.body,
        req.body.author);

    let did_insert_bool = await new_note.insertToDB();

    res.send({ 'was_successful': did_insert_bool });
});


module.exports = router;