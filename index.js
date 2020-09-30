const express = require('express');
var bodyParser = require('body-parser');
const fs=require("fs")
const path=require("path")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.use("/static",express.static('static')) ;
app.set("view engine", "ejs");
const hostname = 'localhost';
const port = 27017;



//Router

mainRouter = require("./modules/router");
app.use("/", mainRouter);
app.listen(port, () => {
	console.log("Server Started!");
})