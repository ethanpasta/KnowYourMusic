const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("./app/database");
require("dotenv").config();
require("./app/middleware")(app);

const PORT = process.env.PORT;

const gameConn = io.of("/game");
app.io = gameConn;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
