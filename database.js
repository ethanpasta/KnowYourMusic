const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_DB_URI;

console.log("I'm in here");

class Database {
	constructor() {
		this._connect();
	}

	_connect() {
		mongoose
			.connect(DB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			})
			.then(() => {
				console.log("Database connection successful");
			})
			.catch(err => {
				console.error("Database connection error: " + err);
			});
	}
}

module.exports = new Database();
