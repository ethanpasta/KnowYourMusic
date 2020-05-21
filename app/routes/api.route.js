const express = require("express");
const apiController = require("../controllers/SpotifyApi");
const middleware = require("./apiMiddleware");
const api = express.Router();

api.use(middleware.sessionAttach);
api.use(middleware.checkRefresh);

api.get("/me", apiController.getMe);
api.get("/songs", apiController.getSongs);
//api.get("/game", apiController.getGame);

module.exports = api;
