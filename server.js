const { expressPino } = require("./utils/logger");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const spotifyAuthRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const bodyParser = require("body-parser");

const app = require("express")();
const port = 5000;

app.use(expressPino);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	session({
		secret: "pi3.14159",
		resave: false,
		saveUninitialized: true,
	})
);
app.use("/auth", spotifyAuthRouter);
app.use("/api", apiRouter);

app.listen(port, () => console.log("Back-end is listening on port " + port));
