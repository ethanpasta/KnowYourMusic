const express = require("express");
const authController = require("../controllers/SpotifyAuth");
require("dotenv").config();

const auth = express.Router();

auth.get("/", authController.login);
auth.get("/callback", authController.callback);
auth.get("/logout", authController.logout);
auth.get("/check", (req, res) => {
	res.send({ loggedIn: req.session.user != undefined });
});

module.exports = auth;
