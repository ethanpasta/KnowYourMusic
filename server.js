const { expressPino } = require("./utils/logger");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const spotifyAuthRouter = require("./routes/auth.route");
const apiRouter = require("./routes/api.route");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
require("./database");
const mongoose = require("mongoose");

const app = require("express")();
const port = 5000;

app.use(expressPino);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	session({
		store: new MongoStore({
			url: process.env.MONGO_DB_URI,
		}),
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
app.use("/auth", spotifyAuthRouter);
app.use("/api", apiRouter);

app.listen(port, () => console.log("Server listening on port " + port));
