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
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv').config();
const saltRounds = 10;
var datetime = new Date();
var today_date = datetime.toISOString().slice(0, 10);
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/uploads');
mongoose.connect("mongodb+srv://altaf:Ilafatla@cluster0-hgkj6.mongodb.net/test?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully Connected to db");
    })
    .catch((err) => {
        console.log("Something went wrong", err);
    })
//memory leak issue solving line and session creation
var MemoryStore = require('memorystore')(session)

//setting view engine to ejs, to able to render ejs files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));

//including public folder for accessing files present in public folder
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting the homepage or start page Route
app.get('/', function (req, res) {
    // res.redirect('/');
    res.render('pages/index', { title: "Online-Portal" });
});
app.get('/login', function (req, res) {
    // res.redirect('/');
    res.render('pages/login');
});

app.post('/register', function (req, res) {
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        emailId: req.body.emailId,
        mobileNo: req.body.mobileNo,
        tags: req.body.tags,
        diagnosedWith: req.body.diagnosedWith
    });
    user.save();
    res.redirect("/");
});
app.get('/register', function (req, res) {
    // res.redirect('/');
    res.render('pages/register');
});
app.get('/blog', function (req, res) {
    // res.redirect('/');
    res.render('pages/blog', { title: "Online-Portal" });
});










// post for blog entry
app.post('/post_blog', urlencodedParser, function (req, res) {
    try {
        console.log(req.body.title);
        console.log(' ');
        console.log(req.body.description);
        console.log(' ');
        console.log(req.body.tag)


    } catch (error) {
        console.log(error);
    }
});



app.listen(port, function () {
    console.log('Listening at port 3000');
});