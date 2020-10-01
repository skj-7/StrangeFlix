const express = require('express');
var bodyParser = require('body-parser');
const fs=require("fs")
const path=require("path")
const app = express();
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.use("/static",express.static('static')) ;
app.set("view engine", "ejs");
const hostname = 'localhost';
const port = 3000;
mongoose.connect('mongodb://localhost:27017/StrangeFlix', {useNewUrlParser: true,useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected');
});


//Router

mainRouter = require("./modules/router");
app.use("/", mainRouter);
app.listen(port, () => {
	console.log("Server Started!");
})