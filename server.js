const express = require('express');
const pino = require('express-pino-logger')();
const app = express();
const port = process.env.PORT || 5000;

app.use(pino);

// console.log that your server is up and running
app.listen(port, () => console.log("App is listening on port " + port));

// create a GET route
app.get('/api/express_backend', (req, res) => {
    console.log("request from " + req);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }));
});


