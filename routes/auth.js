const express = require("express");
const { login, callback } = require("../controllers/spotifyAuthControl");
const { pino } = require("../utils/logger");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
	login(res);
});
router.get("/callback", (req, res) => {
	callback(req, res);
});
router.get("/logout", (req, res) => {
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
