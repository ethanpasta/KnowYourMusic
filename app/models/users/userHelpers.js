/**
 * Method used for Spotify authorization.
 * Two things could happen:
 *   - User is authorizing for the first time, and doesn't exist in the DB - he's created
 *   - User is logged out/logging in from an unrecognized IP, but already exists in the DB, so needs to be updated
 */
function updateOrCreate(
	username,
	display_name,
	access_token,
	refresh_token,
	last_refresh_update,
	last_song_update
) {
	return this.findOneAndUpdate(
		{
			username,
		},
		{
			display_name,
			access_token,
			refresh_token,
			last_refresh_update,
			last_song_update,
		},
		{
			upsert: true,
			new: true,
		}
	)
		.then(doc => doc)
		.catch(err => new Error(err));
}

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

module.exports = {
	upsert: updateOrCreate,
	refreshUpdate,
	needsSongsUpdate,
};
