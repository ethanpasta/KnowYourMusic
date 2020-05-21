// Check if lyrics exist in DB, and return them (or undefined if not)
function findLyricsIfExists(songId) {
	return this.findById(songId, "lyrics broken")
		.then(({ lyrics, broken }) => (broken ? undefined : lyrics))
		.catch(err => {
			throw new Error(err);
		});
}

// Update a song with its matching lyrics
function addLyricsToSong(songId, lyrics) {
	return this.findByIdAndUpdate(songId, { lyrics });
}

// Add multiple songs to the DB
function addManySongs(songs) {
	return this.insertMany(songs);
}

// Update that a certain song has no lyrics
function updateNoLyrics(songId) {
	return this.findByIdAndUpdate(songId, { broken: true });
}

module.exports = {
	findLyricsIfExists,
	addLyricsToSong,
	addManySongs,
	updateNoLyrics,
};
