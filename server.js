var port = process.env.PORT || 3000;
var session = require('express-session');
const express = require('express');
const path = require('path');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
// const mysqlBackbone = require('mysql-backbone');
const multer = require('multer');
const fs = require("fs")
const app = express();
const dateTime = require('date-time');
const bcrypt = require('bcryptjs');
var session = require('express-session');
const crypto = require('crypto');
const dotenv = require('dotenv').config();
const saltRounds = 10;
var datetime = new Date();
var today_date = datetime.toISOString().slice(0, 10);
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/uploads');

//memory leak issue solving line and session creation
var MemoryStore = require('memorystore')(session)

//setting view engine to ejs, to able to render ejs files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));

//including public folder for accessing files present in public folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views/partials"));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Setting the homepage or start page Route
app.get('/', function (req, res) {
    // res.redirect('/');
    res.render('pages/index',{title:"Online-Portal"});
});
app.get('/login', function (req, res) {
    // res.redirect('/');
    res.render('pages/login');
});
app.get('/register', function (req, res) {
    // res.redirect('/');
    res.render('pages/register');
});
app.listen(port, function () {
    console.log('Listening at port 3000');
  });