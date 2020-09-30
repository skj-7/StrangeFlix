const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

//Router

mainRouter = require("./modules/router");

app.use("/", mainRouter);

app.listen(port, () => {
	console.log("Server Started!");
})