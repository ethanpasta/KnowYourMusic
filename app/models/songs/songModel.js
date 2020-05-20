const mongoose = require("mongoose");
const helpers = require("./songHelpers");

/**
 * Mongoose schema for the songs collection
 */
const songSchema = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		// Make sure song is unique
		validate: {
			validator: value => Song.countDocuments({ title: value }).then(count => count == 0),
			message: props => `Song ${props.value} already exists`,
		},
	},
	title: String,
	artist: String,
	lyrics: {
		type: String,
		default: undefined,
	},
	broken: {
		type: Boolean,
		default: false,
	},
});

// Attach all helper methods to the static model methods
Object.keys(helpers).forEach(func => songSchema.static(func, helpers[func]));

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
