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
        this.title = title //province/region in canada, or Canada as a whole.
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

module.exports.Note = Note