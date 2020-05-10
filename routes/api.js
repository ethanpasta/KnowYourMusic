const express = require("express");
const { pino } = require("../utils/logger");
const sessionApiMapper = require("../controllers/SessionInstanceMap");
const { getMe, getSongs } = require("../controllers/SpotifyApi");
const router = express.Router();

/**
 * Middleware for the api route - add the spotifyApi instance to the request object.
 * If no instance is found in the session mapper, the user is not logged in and is redirected
 */
router.use((req, res, next) => {
	if (req.session.user) {
		req.api = sessionApiMapper[req.session.user];
	} else {
		console.log("User is not logged in");
		res.redirect("/");
	}
	next();
});

router.get("/me", getMe);
router.get("/songs", getSongs);

module.exports = router;
