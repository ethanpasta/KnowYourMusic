const mongoose = require("mongoose");

/**
 * Mongoose schema for the songs collection
 */
const gameSchema = new mongoose.Schema({
	player: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
	score: Number,
});

// Attach all helper methods to the static model methods
// Object.keys(helpers).forEach(func => gameSchema.static(func, helpers[func]));

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
