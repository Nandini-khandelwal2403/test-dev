const User = require('../db/user');
const Activity = require('../db/activity');

exports.RegisterUser = async(req, res) => {
    const user = new User(req.body);
    console.log(user);
    await user.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(422).json({ errors: err })
        } else {
            const userData = {
                name: doc.name,
                number: doc.number,
                email: doc.email, 
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Signed Up',
                userData
            })
        }
    });
};

exports.saveActivity = async(req, res) => {
    const activity = new Activity(req.body);
    console.log(activity);
    await activity.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(422).json({ errors: err })
        } else {
            const activityData = {
                username: doc.username,
                number: doc.usernumber,
                activity: doc.activity,
                work: doc.work,
                date: doc.date,
                hours: doc.hours,
                identity: doc.identity
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Saved Activity',
                activityData
            })
        }
    });
};

exports.LoginUser = (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        console.log("Came to log in user");
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found!' });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                console.log(isMatch);
                //isMatch is eaither true or false
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Wrong Password!' });
                } else {
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send({ err });
                        } else {
                            const data = {
                                    userID: user._id,
                                    name: user.name,
                                    number: user.number,
                                    email: user.email,
                                    address: user.address,
                                    age: user.age,
                                    identity: user.identity,
                                    token: user.token
                                }
                                //saving token to cookie
                            res.cookie('authToken', user.token).status(200).json({
                                success: true,
                                message: 'Successfully Logged In!',
                                userData: data
                            })
                        }
                    });
                }
            });
        }
    });
};

exports.LogoutUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.user._id }, { token: '' },
        (err) => {
            console.log('entered logout');
            if (err) return res.json({ success: false, err })
            console.log('logging out');
            return res.cookie('authToken', '', { maxAge: 1 }).status(200).send({ success: true, message: 'Successfully Logged Out!' });
        })
};

//get authenticated user details
exports.getUserDetails = (req, res) => {
    return res.status(200).json({
        isAuthenticated: true,
        name: req.user.name,
        number: req.user.number,
        contacts: req.user.contacts,
    });
};