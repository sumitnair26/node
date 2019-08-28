const http = require('http');

const express = require('express');

const app = express();

app.use((rq, res, next) => {
    console.log("In the missleware");
    next();
});

app.use((rq, res, next) => {
    console.log("In another the missleware");
    res.send('<h1>Hello from Express!!!</h1>');
});

const server = http.createServer(app);

server.listen(8111);