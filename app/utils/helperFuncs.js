function sanitizeSongTitle(title) {
	let finalTitle = [];
	const titleWords = title.split(" ");
	const regex = /^[)([\]-]/;
	for (let i = 0; i < titleWords.length; i++) {
		if (regex.test(titleWords[i])) break;
		finalTitle.push(titleWords[i]);
	}

	return finalTitle.join(" ").trim();
}

function sanitizeLyrics(lyrics) {
	let cleanLyrics = lyrics.replace(/\[(.*?)\]/g, "");
	return cleanLyrics.replace(/^\s*\n/gm, "");
}

// Generates a random string used for the state in the Spotify authorization process
function generateRandomString(length) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

module.exports = {
	sanitizeLyrics,
	sanitizeSongTitle,
	generateRandomString,
};
