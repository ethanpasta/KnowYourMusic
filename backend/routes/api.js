const express = require("express");
const apiController = require("../controllers/apiController");
const middleware = require("./apiMiddleware");
const api = express.Router();

api.get("/user/me", middleware, apiController.getMe);
api.get("/playlists", apiController.getPlaylists);

module.exports = api;
