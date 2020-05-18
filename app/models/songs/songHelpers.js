function findLyricsIfExists(songId) {
	return this.findById(songId, "lyrics", (err, { lyrics }) => (err ? undefined : lyrics));
}

function addLyricsToSong(songId, lyrics) {
	return this.findByIdAndUpdate(songId, { lyrics }, (err, res) => (err ? undefined : res));
}

function addLotsOfSongs(songs) {
	return this.insertMany(songs, (err, docs) => (err ? undefined : docs));
}

module.exports = {
	findLyricsIfExists,
	addLyricsToSong,
	addLotsOfSongs,
};
