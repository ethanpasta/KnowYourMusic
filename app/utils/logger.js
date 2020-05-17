const pino = require("pino")({ level: process.env.LOG_LEVEL || "info" });
const expressPino = require("express-pino-logger")({
	logger: pino,
});

module.exports = {
	pino,
	expressPino,
};
