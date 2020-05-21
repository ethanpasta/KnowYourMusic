const mongoose = require("mongoose");
const helpers = require("./userHelpers");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * Mongoose schema for the Users collection
 */
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	display_name: String,
	access_token: String,
	refresh_token: String,
	// Last time the user recieved an access token from Spotify
	last_refresh_update: {
		type: Date,
		default: Date.now(),
	},
	last_song_update: {
		type: Date,
		default: Date.now(),
	},
	songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

// Attach all helper methods to the static model methods
Object.keys(helpers).forEach(func => userSchema.static(func, helpers[func]));

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
