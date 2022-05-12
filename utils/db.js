//code unchanged from contacts-app-v4
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNSTRING;

const client = new MongoClient(uri, { useUnifiedTopology: true});
var db;

/**
 * A function to stablish a connection with a MongoDB instance.
 */
async function connectToDB() {
	// Connect the client to the server
	await client.connect();
	db = await client.db(process.env.DBNAME);
	console.log('Connected successfully to mongoDB');
}
/**
 * This method just returns the database instance
 * @returns A Database instance
 */
async function getDb() {
	return db;
}

async function closeDBConnection() {
	await client.close();
	return 'DB Connection closed';
}


module.exports = { connectToDB, getDb, closeDBConnection };