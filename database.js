const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_DB_URI;

class Database {
	constructor() {
		this._connect();
	}

	_connect() {
		console.log("Connecting to database..");
		mongoose.connect(
			DB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			},
			function (err, db) {
				if (err) console.error("Database connection error: " + err);
				else {
					console.log("Database connection successful");
					// DEV MODE ONLY: Remove all sessions on server start
					/* db.collection("sessions").deleteMany({}, function (err) {
						if (err) console.log(err);
						else console.log("Removed all sessions");
					}); */
				}
			}
		);
	}
}

module.exports = new Database();
