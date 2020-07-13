const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const sio = io.of("/game");
require("./backend/middleware")(app, sio);
require("./backend/socket")(sio);
require("./backend/database");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
