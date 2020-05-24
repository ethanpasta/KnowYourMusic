const { expressPino } = require("./app/utils");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { authRouter, apiRouter } = require("./app/routes");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
require("./app/database");

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
		saveUninitialized: false,
	})
);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
