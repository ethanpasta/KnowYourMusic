const { pino, expressPino } = require("./logger");
const {
	sanitizeLyrics,
	sanitizeSongTitle,
	generateRandomString,
	checkIfMostlyEnglish,
	listRange,
} = require("./helperFuncs");
const { CREDENTIALS, SCOPES, MY_API, NUM_OF_LEVELS, OPTIONS_PER_LEVEL } = require("./constants");

module.exports = {
	pino,
	expressPino,
	sanitizeLyrics,
	sanitizeSongTitle,
	generateRandomString,
	checkIfMostlyEnglish,
	CREDENTIALS,
	SCOPES,
	MY_API,
	listRange,
	NUM_OF_LEVELS,
	OPTIONS_PER_LEVEL,
};
