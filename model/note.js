const mongo = require('../utils/db');

/**
 * Gets the Notes collection
 * @returns The Notes collection from MongoDB
 */
async function _get_notes_collection() {
    let db = await mongo.getDb();
    return await db.collection('Notes');
};



class Note {

    /**
     * Represent a simple Note. Has a title and body.
     */
    constructor(title, body) {
        this.title = title
        this.body = body
    }

    /**
     * This method async inserts a note into the Notes collection.
     * Awaiting this is optional. 
     * @returns true on success, false on failure
     */
    async insertToDB() {
        let collection = await _get_notes_collection()
        try {
            collection.insertOne(this)
        } catch (e) {
            console.log(e);
            return false;
        }
        return true
    }
}

class AuthoredNote extends Note {

    /**
     * Represent a note with an Author. Has a title, body and author.
     */
    constructor(title, body, author) {
        super(title, body)
        this.author = author
    }
}

module.exports.Note = Note
module.exports.AuthoredNote = AuthoredNote