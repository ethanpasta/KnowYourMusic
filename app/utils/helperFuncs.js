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

function sanitizeLyrics(lyrics, title) {
	if (!lyrics || !title) return;
	const regex = /(^\s*$|\[(.*?)\])/gm;
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
	const asciiChars = /[\x01-\x7F]/g;
	const cleanStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
	return (cleanStr.match(asciiChars) || []).length / cleanStr.length >= 0.8;
}

module.exports = {
	sanitizeLyrics,
	sanitizeSongTitle,
	generateRandomString,
	checkIfMostlyEnglish,
};
