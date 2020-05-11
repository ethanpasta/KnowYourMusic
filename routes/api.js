const express = require("express");
const sessionApiMapper = require("../controllers/SessionInstanceMap");
const { getMe, getSongs } = require("../controllers/SpotifyApi");
const router = express.Router();

/**
 * Middleware for the api route - add the spotifyApi instance to the request object.
 * If no instance is found in the session mapper, the user is not logged in and is redirected
 */
router.use((req, res, next) => {
	if (req.session.user) {
		if (req.session.user in sessionApiMapper) {
			req.api = sessionApiMapper[req.session.user];
		} else {
			// This happens if server was restarted, session still exists in mongo, but the users api was erased since they are stored in memory dictionary
			// Find user from database, find his access token, create a new spotify web api instance, save it to memory
			/* userModel.findOne({ username: req.session.user })
				.then(doc => (req.api ) */
		}
	} else {
		console.log("User is not logged in");
		res.redirect("/");
	}
	next();
});

router.get("/me", getMe);
router.get("/songs", getSongs);

module.exports = router;
