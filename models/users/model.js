const mongoose = require("mongoose");
const helpers = require("./helpers");

/**
 * Mongoose model for the Users collection
 */

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		// Make sure user is unique
		validate: {
			validator: value => User.countDocuments({ username: value }).then(count => count == 0),
			message: props => `Username ${props.value} already exists`,
		},
	},
	display_name: String,
	access_token: String,
	refresh_token: String,
	// Last time the user recieved an access token from Spotify
	updated_at: {
		type: Date,
		default: Date.now(),
	},
});

// Attach all helper methods to the static model methods
Object.keys(helpers).forEach(func => userSchema.static(func, helpers[func]));

const User = mongoose.model("users", userSchema);

module.exports = User;
