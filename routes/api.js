const express = require("express");
const { spotifyApi } = require("../controllers/spotifyController");
const { pino } = require("../utils/logger");
const router = express.Router();

router.get("/me", (req, res) => {
	spotifyApi
		.getMe()
		.then(data => res.send(data.body))
		.catch(err => {
			pino.error("Something went wrong!", err);
			res.send({ err });
		});
});

router.get("/auth", (req, res) => res.send({ loggedIn: req.session.user != undefined }));

module.exports = router;
