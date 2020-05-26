/**
 * Function cleans the title of a song. It iterates over the words of the title,
 * until it finds a word that contains one of the characters '()[]-', or the word "feat".
 * Then it returns all the words before the matching one.
 * For example:
 *
 *  - Reaching (feat. Alex) => Reaching
 *  - All For Us - from the ... => All For Us
 *
 * @param {String} title
 */
function sanitizeSongTitle(title) {
	let finalTitle = [];
	const titleWords = title.split(" ");
	const regex = /^[)([\]-]/;
	for (let i = 0; i < titleWords.length; i++) {
		if (regex.test(titleWords[i]) || titleWords[i].toLowerCase().includes("feat")) break;
		finalTitle.push(titleWords[i]);
	}
	return finalTitle.join(" ").trim();
}

/**
 * Function cleans the lyrics of a song. It splits the lyrics into lines, and then removes all lines
 * that don't pass certain criteria:
 *  - REGEX: the line is only whitespace OR the line starts and ends with '[]' or '()'
 *  - There's less than 3 words in the line
 *  - the line includes the title of the song
 * @param {String} lyrics
 * @param {String} title
 */
function sanitizeLyrics(lyrics, title) {
	if (!lyrics || !title) return;
	const regex = /(^\s*$|\[(.*?)\]|\(.*?\))/gm;
	const cleanLines = lyrics.split("\n").filter(line => {
		const words = line.split(" ");
		if (
			regex.test(line) ||
			words.length < 3 ||
			line.toLowerCase().includes(title.toLowerCase())
		) {
			return false;
		}
		return true;
	});
	return [...new Set(cleanLines)].join("\n");
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

function checkIfMostlyEnglish(str) {
	// eslint-disable-next-line
	const asciiChars = /[\x01-\x7F]/g;
	const cleanStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
	return (cleanStr.match(asciiChars) || []).length / cleanStr.length >= 0.8;
}

function listRange(start, end) {
	if (end == undefined) [end, start] = [start, 0];
	return [...Array(end - start).keys()].map(i => i + start);
}

module.exports = {
	sanitizeLyrics,
	sanitizeSongTitle,
	generateRandomString,
	checkIfMostlyEnglish,
	listRange,
};
