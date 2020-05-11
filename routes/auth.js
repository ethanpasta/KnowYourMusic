const express = require("express");
const spotifyAuth = require("../controllers/SpotifyAuth");
const { pino } = require("../utils/logger");
require("dotenv").config();

const router = express.Router();

router.get("/", spotifyAuth.login);
router.get("/callback", spotifyAuth.callback);
router.get("/logout", (req, res) => {
	spotifyAuth.logout(req, res);
	req.session.destroy(err => {
		if (err) {
			pino.error("Logout failed: " + err);
		}
		res.redirect("/");
	});
});
router.get("/check", (req, res) => {
	res.send({ loggedIn: req.session.user != undefined });
});

module.exports = router;
