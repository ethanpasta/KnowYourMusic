// Check if lyrics exist in DB, and return them (or undefined if not)
function findLyricsIfExists(songId) {
	return this.findById(songId, "lyrics", (err, { lyrics }) => (err ? undefined : lyrics));
}

// Update a song with its matching lyrics
function addLyricsToSong(songId, lyrics) {
	return this.findByIdAndUpdate(songId, { lyrics }, (err, res) => (err ? undefined : res));
}

// Add multiple songs to the DB
function addLotsOfSongs(songs) {
	return this.insertMany(songs, (err, docs) => (err ? undefined : docs));
}

// Update that a certain song has no lyrics
function updateNoLyrics(songId) {
	return this.findByIdAndUpdate(songId, { broken: true }, (err, res) => (err ? undefined : res));
}

module.exports = {
	findLyricsIfExists,
	addLyricsToSong,
	addLotsOfSongs,
	updateNoLyrics,
};
