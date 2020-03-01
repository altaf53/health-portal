var port = process.env.PORT || 3000;
var session = require('express-session');
const express = require('express');
const path = require('path');
const Message = require('./models/Message');
const logger = require('morgan');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
// const mysqlBackbone = require('mysql-backbone');
const multer = require('multer');
const fs = require("fs")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const dateTime = require('date-time');
const bcrypt = require('bcrypt');
var session = require('express-session');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('./models/User');
const TestScore = require('./models/TestScore');
const Blog = require('./models/Blog');
const dotenv = require('dotenv').config();
const saltRounds = 10;
var datetime = new Date();
var today_date = datetime.toISOString().slice(0, 10);
let users = {};
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
const MongoDBStore = require('connect-mongodb-session')(session);


const store = new MongoDBStore({
    uri: "mongodb+srv://altaf:Ilafatla@cluster0-hgkj6.mongodb.net/test?retryWrites=true&w=majority"
})

//setting view engine to ejs, to able to render ejs files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));
// app.use(express.cookieParser());
app.use(logger('dev'));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: store,
    resave: false,
    saveUninitialized: false,
    secret: 'sies docs'
}))
//including public folder for accessing files present in public folder
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.sockets.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('new', function (data, callback) {
        console.log(data.name);
        if (data in users) {
            callback(false);
        } else {
            callback(true);
            socket.name = data.name;
            users[socket.name] = socket;
        }
    });

    socket.on('msg', function (data) {
        console.log(data);
        msg = data.msg + "~" + data.to;
        console.log(data, "msg");
        let message = new Message({
            name: data.to,
            message: data.msg
        });
        message.save((err) => {
            if (err) {
                console.log(err);
            } else {
                // io.emit('message', req.body);
                console.log("Successful");

            }
        })

        io.to(users[data.to].emit('priv', msg));
    })


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    // console.log(req.body);
    let message = new Message(req.body);
    message.save((err) => {
        if (err) {
            sendStatus(500);
        } else {
            // io.emit('message', req.body);
            console.log(req.body, "bod");
            res.sendStatus(200);
        }
    })
})
//Setting the homepage or start page Route
app.get('/', function (req, res) {
    // res.redirect('/');
    res.render('pages/index', { title: "Online-Portal", user: req.session });
});
app.get('/homepage', function (req, res) {
    // res.redirect('/');
    res.render('pages/homepage', { title: "check session type" });
});
app.get('/login', function (req, res) {
    // res.redirect('/');
    res.render('pages/login', { user: req.session });
});


app.get('/register', function (req, res) {
    // res.redirect('/');
    res.render('pages/register', { userid: req.session.userid });
});
app.get('/blog', function (req, res) {
    // res.redirect('/');
    res.render('pages/blog');
});
app.get('/Dblog', function (req, res) {
    // res.redirect('/');
    res.render('pages/Dblog');
});
app.get('/anxiety', function (req, res) {
    // res.redirect('/');
    res.render('pages/anxiety');
});
app.get('/question', function (req, res) {
    // res.redirect('/');
    res.render('pages/question');
});


app.get('/obesity', function (req, res) {
    // res.redirect('/');
    res.render('pages/obesity');
});
app.get('/alzheimer', function (req, res) {
    // res.redirect('/');
    res.render('pages/alzheimer');
});
app.get('/chat', function (req, res) {
    // res.redirect('/');
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
            return next(err);
        }
        // console.log(users);
        res.render('pages/chat', { users, session: req.session });

    })
});









//post for register
app.post('/register_user', function (req, res) {
    let userpassword = req.body.userpassword;
    const hash = bcrypt.hashSync(userpassword, saltRounds);
    console.log(hash);
    try {
        var user = new User({
            name: req.body.user_name,
            emailId: req.body.u_email_id,
            mobileNo: req.body.mobileno,
            tags: req.body.tags,
            diagonsedWith: req.body.diagnosed,
            password: hash,
            user_type: req.body.user_type
        });
        user.save();
        res.send("succes");
    } catch (error) {
        console.log(error);
        res.send("unsucces");
    }

});

//Post for login
app.post('/login_submit', function (req, res) {
    try {
        User.find({
            name: req.body.user_name
        }, function (error, result) {
            if (error) {
                console.log(error);
            }

            var compare = bcrypt.compareSync(req.body.userpassword, result[0].password);

            if (compare == true) {
                console.log(result[0].user_type)



                req.session.userid = result[0]._id.toString();
                req.session.username = result[0].name;
                req.session.user_type = result[0].user_type;
                res.locals.user_type = result[0].user_type;
                res.locals.userid = result[0]._id.toString();
                // req.session.img = result[0].imagePath;
                // req.session.gender = result[0].gender;
                res.send("Login Successful");
                console.log(req.session);
            }

        });
    } catch (error) {
        console.log(error);
        res.send("unsuccessful");
    }
});

//point submit
app.post('/point_submit', function (req, res) {
    try {
        var Score = new TestScore({
            score: req.body.points,
            userId: req.session.userid
        });
        Score.save();
    } catch (error) {
        console.log(error);
    }
});

// post for blog entry
app.post('/post_blog', function (req, res) {
    try {
        console.log("helo " + req.session.user_type)
        var blog = new Blog({
            title: req.body.title,
            tags: req.body.tags,
            description: req.body.description,
            createdBy: req.session.username,
            userId: req.session.userid,
            user_type: req.session.user_type
        });
        blog.save();
        res.send("success");

    } catch (error) {
        console.log(error);
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


server.listen(port, function () {
    console.log('Listening at port 3000');
});