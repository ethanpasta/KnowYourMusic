const express = require("express");
const spotifyApi = require("./auth").spotifyApi;
const router = express.Router();

router.get("/me", (req, res) => {
	spotifyApi.getMe().then(
		function (data) {
			res.send(data.body);
		},
		function (err) {
			console.log("Something went wrong!", err);
			res.send({ err });
		}
	);
});

module.exports = router;
