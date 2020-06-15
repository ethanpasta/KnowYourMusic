const express = require("express");
const apiController = require("../controllers/SpotifyApi");
const middleware = require("./apiMiddleware");
const api = express.Router();

api.get("/user/me", middleware, apiController.getMe);
api.get("/user/songs", middleware, apiController.getSongs);
api.get("/user/start-game", middleware, apiController.startGame);
api.get("/playlists", apiController.getPlaylists);

module.exports = api;
