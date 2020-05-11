const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		access_token: String,
		refresh_token: String,
	},
	display_name: String,
});

module.exports = mongoose.model("users", userSchema);
