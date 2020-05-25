const { pino } = require("../../utils");

/**
 * Users' access token was expired - a refresh happened and the user needs an update
 */
function refreshUpdate(username, access_token, last_refresh_update) {
	return this.updateOne(
		{
			username,
		},
		{
			access_token,
			last_refresh_update,
		}
	)
		.then(res => `Updated ${res.nModified} user: ${username}`)
		.catch(err => new Error(err));
}

function needsSongsUpdate(username) {
	return this.findOne({ username }, "created_at").then(user => {
		if (Date.now() - user.created_at >= 1000 * 60 * 60 * 24 * 10) {
			return;
		}
	});
}

function getUserByAccessToken(access_token) {
	return this.findOne({ access_token }, "username")
		.then(user => {
			pino.info(user);
			return user ? user.username : undefined;
		})
		.catch(err => {
			pino.error(err);
			return;
		});
}

function addSongsToUser(songs, username) {
	return this.findOne({ username }).then(user => {
		pino.info(`>>> Adding ${songs.length} songs to user '${username}'`);
		user.songs.push(...songs);
		user.save();
	});
}

/**
 * Static model function returns random song ids from the users saved songs
 * @param {String} username The user
 * @param {Number} limit Number of random songs to return
 * @param {List} exclude List of song ids to exclude from the search
 */
function getRandomUserSongs(username, limit, exclude = []) {
	exclude = exclude.map(song => song._id);
	return this.aggregate([
		{ $match: { username: { $eq: username } } }, // Match user to 'username'
		{ $project: { _id: 0, song: "$songs" } }, // Get only the song array
		{ $unwind: { path: "$song" } }, // Expand the array
		{ $match: { song: { $nin: exclude } } }, // Match only the id's that aren't in the array 'exclude'
		{ $sample: { size: limit } }, // Return a random set from the matched id's
	]);
}

module.exports = {
	refreshUpdate,
	needsSongsUpdate,
	getUserByAccessToken,
	addSongsToUser,
	getRandomUserSongs,
};
