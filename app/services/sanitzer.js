function sanitizeSongTitle(title) {
	let finalTitle = [];
	const titleWords = title.split(" ");
	const regex = /\(|\)|-|\/|\[|\]/;
	for (let i = 0; i < titleWords.length; i++) {
		if (regex.test(titleWords[i])) break;
		finalTitle.push(titleWords[i]);
	}
	return finalTitle.join(" ");
}

function sanitizeLyrics(lyrics) {
	let cleanLyrics = lyrics.replace(/\[(.*?)\]/g, "");
	return cleanLyrics.replace("\n", "");
}

exports = {
	sanitizeLyrics,
	sanitizeSongTitle,
};
