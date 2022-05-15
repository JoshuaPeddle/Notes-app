const { ObjectId } = require('mongodb');
const mongo = require('../utils/db');

/**
 * Gets the Notes collection
 * @returns The Notes collection from MongoDB
 */
async function _get_notes_collection() {
	let db = await mongo.getDb();
	return await db.collection('Notes');
}



class Note {

	/**
     * Represent a simple Note. Has a title and body.
     */
	constructor(title, body) {
		this.title = title;
		this.body = body;
	}

	/**
     * This method async inserts a note into the Notes collection.
     * Awaiting this is optional. 
     * @returns true on success, false on failure
     */
	async insertToDB() {
		let collection = await _get_notes_collection();
		try {
			collection.insertOne(this);
		} catch (e) {
			return false;
		}
		return true;
	}

}

class AuthoredNote extends Note {

	/**
     * Represent a note with an Author. Has a title, body and author.
     */
	constructor(title, body, author, author_id) {
		super(title, body);
		this.author = author;
		this.author_id = author_id;
	}

}
/**
     * This method async inserts a note into the Notes collection.
     * Awaiting this is optional. 
     * @returns true on success, false on failure
     */
async function updateNote(noteid, notetitle, notebody) {
	let collection = await _get_notes_collection();
	let did_update;
	try {	
		did_update = await collection.updateOne({'_id':ObjectId(noteid)}, {$set:{title:notetitle, body:notebody}});	
	} catch (e) {
		return false;
	}
	if (did_update.matchedCount >=1 ){
		return true;
	}
	return false;
}
/**
     * This method async inserts a note into the Notes collection.
     * Awaiting this is optional. 
     * @returns true on success, false on failure
     */
async function getAllNotes(author_id) {
	let collection = await _get_notes_collection();
	let notes = null;
	try {
		notes = await collection.find({'author_id' :author_id }).toArray();
	} catch (e) {
		return false;
	}
	return notes;
}


/**
     * This method async inserts a note into the Notes collection.
     * Awaiting this is optional. 
     * @returns true on success, false on failure
     */
async function deleteNote(noteid) {
	let collection = await _get_notes_collection();
	let delete_status;
	try {
		delete_status = await collection.deleteOne({'_id':ObjectId(noteid)});
	} catch (e) {
		return false;
	}
	if (delete_status.deletedCount >=1 ){
		return true;
	}
	return false;
	
}


module.exports.Note = Note;
module.exports.AuthoredNote = AuthoredNote;
module.exports.getAllNotes = getAllNotes;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;