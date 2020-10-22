const express = require('express');
var bodyParser = require('body-parser');
const fs=require("fs")
const path=require("path")
var mongoose = require('mongoose');
var session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use("/static", express.static('static'));
app.use("/assets", express.static('assets'));
app.set("view engine", "ejs");
require('dotenv').config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;

//DataBase Connection
mongoose.connect('mongodb://localhost:27017/StrangeFlix', {
	useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('DB Connected!');
});

app.use(session({
	key: "user_id",
	secret: process.env.EXP_SESS_SECRET,
	resave: true,
	saveUninitialized: true
}));

//Router
mainRouter = require("./modules/router");
app.use("/", mainRouter);
app.listen(port, () => {
	console.log("Server Started!");
})