const mongoose = require("mongoose");

/**
 * Mongoose schema for the songs collection
 */
const songSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		// Make sure song is unique
		validate: {
			validator: value => Song.countDocuments({ title: value }).then(count => count == 0),
			message: props => `Song ${props.value} already exists`,
		},
	},
	artist: String,
	lyrics: String,
});

// Attach all helper methods to the static model methods
/* Object.keys(helpers).forEach(func => userSchema.static(func, helpers[func]));
 */

const Song = mongoose.model("songs", songSchema);

module.exports = Song;
