const express = require("express");
const spotifyController = require("../controllers/spotifyController");
const { pino } = require("../utils/logger");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => spotifyController.login(res));
router.get("/callback", (req, res) => spotifyController.callback(req, res));
router.get("/logout", (req, res) => {
	req.session.destroy(err => {
		if (err) {
			pino.error("Logout failed: " + err);
		}
		res.redirect("/");
	});
});

module.exports = router;
