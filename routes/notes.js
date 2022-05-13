//const Note = require('../model/note').Note;
const AuthoredNote = require('../model/note').AuthoredNote;
const getAllNotes = require('../model/note').getAllNotes;
const updateNote = require('../model/note').updateNote;
const deleteNote = require('../model/note').deleteNote;
const express = require('express');
var router = express.Router();


/**
* This route constructs a Note object from the request data and calls its insertNote() function. 
* This function waits for the note to be inserted so it can respond with a status
*/
router.post('/', async function (req, res) {
	res.set('Cache-control', 'no-cache');
	if (req.user === undefined){
		return res.send({ 'was_successful': false });
	}

	let new_note = new AuthoredNote(
		req.body.title,
		req.body.body,
		req.user.username,
		req.user.id
	);

	let did_insert_bool = await new_note.insertToDB();

	res.send({ 'was_successful': did_insert_bool });
});



/**
* This route updates a Note object from the request data and calls its uodateOne() function. 
*/
router.put('/notes/', async function (req, res) {

	if (req.user === undefined){
		return res.send({ 'was_successful': false });
	}

	let did_update = await updateNote(req.body.noteid,req.body.title, req.body.body,);

	res.send({ 'was_successful': did_update });
});


/**
* This route updates a Note object from the request data and calls its uodateOne() function. 
*/
router.delete('/notes/', async function (req, res) {
	if (req.user === undefined){
		return res.send({ 'was_successful': false });
	}

	let did_delete = await deleteNote(req.body.noteid);
	res.send({ 'was_successful': did_delete });
});



/**
* This route constructs a Note object from the request data and calls its insertNote() function. 
* This function waits for the note to be inserted so it can respond with a status
*/
router.get('/notes', async function (req, res) {
	res.set('Cache-control', 'no-cache');

	if (req.user === undefined){
		return res.send({ 'was_successful': false });
	}
	let notes = await getAllNotes(req.user.id);
	if (notes.length <1){
		return res.send('No notes found');
	}
	let cleaned_notes = [];
	notes.forEach(element => {
		let new_note = {title : element.title,
			body : element.body,
			id:element._id};
		cleaned_notes.push(new_note);
	});
	res.send(cleaned_notes);

});



module.exports = router;