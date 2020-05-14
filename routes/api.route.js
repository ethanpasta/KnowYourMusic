const express = require("express");
const apiController = require("../controllers/SpotifyApi");
const middleware = require("./apiMiddle");
const router = express.Router();

router.use(middleware.sessionAttach);
router.use(middleware.checkRefresh);

router.get("/me", apiController.getMe);
router.get("/songs", apiController.getSongs);

module.exports = router;
