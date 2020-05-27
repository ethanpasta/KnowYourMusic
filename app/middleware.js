const { expressPino } = require("./utils").logger;
const cookieParser = require("cookie-parser");
const { authRouter, apiRouter } = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = function middlewareSetup(app, sio) {
	app.use((req, res, next) => {
		req.io = app.io;
		next();
	});
	app.use(expressPino);
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	const sessionMid = session({
		store: new MongoStore({
			url: process.env.MONGO_DB_URI,
		}),
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
	});

	app.use(sessionMid);
	sio.use(function (socket, next) {
		sessionMid(socket.request, socket.request.res || {}, next);
	});
	app.use("/auth", authRouter);
	app.use("/api", apiRouter);
};
