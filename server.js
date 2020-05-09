const { expressPino } = require("./utils/logger");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//const MongoClient = require("mongodb").MongoClient;
const spotify_auth = require("./routes/auth");
const api = require("./routes/api");

const app = require("express")();
const port = 5000;

app.use(expressPino);
app.use(cookieParser());
app.use(
	session({
		secret: "pi3.14159",
		resave: false,
		saveUninitialized: true,
	})
);
app.use("/auth", spotify_auth);
app.use("/api", api);

// IMPLEMENT SOON!
/* MongoClient.connect(process.env.MONGO_DB_URL, (err, db) => {
	if (err) throw err;
	console.log("Database created!");
	db.close();
}); */

// console.log that your server is up and running
app.listen(port, () => console.log("Back-end is listening on port " + port));
