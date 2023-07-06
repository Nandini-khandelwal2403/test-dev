require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3008;
const http = require('http');
const https = require('https');

const { connectDB, conn } = require('./src/db/connection');
const User = require('./src/db/user')
const Activity = require('./src/db/activity');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
var crypto = require('crypto');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

connectDB();

const { auth } = require('./src/middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./src/controller/auth_controller');
const { saveActivity } = require('./src/controller/auth_controller');

app.post('/api/user/register', RegisterUser);
app.post('/api/user/login', LoginUser);
app.post('/api/user/updatekey', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    const key = req.body.publicKey;
    console.log(key);

    const user = await User.findOneAndUpdate({ number: req.user.number }, { publicKey: key });
    console.log(user);
    res.json(user);
})

app.post('/api/user/activity', saveActivity);


app.get('/api/user/auth', auth, getUserDetails);
app.get('/api/user/logout', auth, LogoutUser);

app.get('/api/user/data', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    try {
        const user = await User.findOne({ number: req.user.number }, '-password');
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/user/:id', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    try {
        const user = await User.findOne({ number: req.params.id }, '-password');
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/user/activities/:number', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    try {
        //get all activities of the user from userActivity with number = req.params.number and whose isVerified = false
        const activities = await Activity.find({ usernumber: req.params.number });
        res.json(activities);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/coordinator/activities/', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    try {
        const notVerifiedActivities = await Activity.find({ identity: 'volunteer', isVerified: false });
        res.json(notVerifiedActivities);
    } catch (error) {
        console.log(error);
    }
});

// update the isVerified field of the activity with id = req.params.id to true
app.post('/api/coordinator/verify/:id', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    try {
        const activity = await Activity.findOneAndUpdate({ _id: req.params.id }, { isVerified: true });
        res.json(activity);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/verified/activities', auth, async(req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    try {
        const verifiedActivities = await Activity.find({ isVerified: true });
        res.json(verifiedActivities);
    } catch (error) {
        console.log(error);
    }
});

app.get('/login', auth, (req, res) => {
    console.log(req.user);
    if (req.isAuth) {
        if(req.user.identity == 'admin'){
            res.redirect('/admin');
            return;
        }else if(req.user.identity == 'volunteer'){
            res.redirect('/volunteer');
            return;
        }else if(req.user.identity == 'coordinator'){
            res.redirect('/coordinator');
            return;
        }
    }
    res.sendFile(__dirname + '/public/views/login1.html');
});

app.get('/register', (req, res) => {
    if (req.isAuth) {
        res.redirect('/profile');
        return;
    }
    res.sendFile(__dirname + '/public/views/register1.html');
});

app.get('/dashboard', auth, (req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    res.sendFile(__dirname + '/public/views/dashboard.html');
});
    

app.get('/admin', auth, (req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    res.sendFile(__dirname + '/public/views/adminProfile.html');
});

app.get('/volunteer', auth, (req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    res.sendFile(__dirname + '/public/views/volunteerProfile.html');
});

app.get('/coordinator', auth, (req, res) => {
    if (!req.isAuth) {
        res.redirect('/login');
        return;
    }
    res.sendFile(__dirname + '/public/views/coordinatorProfile.html');
});


server.listen(PORT, () => {
    console.log(`Express app listening to PORT ${PORT}`);
})