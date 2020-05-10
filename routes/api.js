const express = require("express");
const { pino } = require("../utils/logger");
const sessionApiMapper = require("../controllers/mapSessionControllers");
const { getMe } = require("../controllers/spotifyInfoControl");
const router = express.Router();

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

module.exports = router;
