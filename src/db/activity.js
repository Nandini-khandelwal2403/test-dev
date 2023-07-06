const mongoose = require('mongoose');

const userActivity = new mongoose.Schema({
    usernumber: {
        type: String,
        required: [true, 'The number field is required!'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'The name field is required!'],
        trim: true,
        maxlength: 100
    },
    identity: {
        type: String,
        required: [true, 'The identity field is required!'],
        trim: true,
        maxlength: 100
    },
    activity: {
        type: String,
        required: [true, 'The activity field is required!'],
        trim: true,
        maxlength: 100
    },
    work: {
        type: String,
        required: [true, 'The work field is required!'],
        trim: true,
        maxlength: 100
    },
    date: {
        type: Date,
        required: [true, 'The date field is required!'],
        trim: true,
        maxlength: 100
    },
    peoplehelped: {
        type: Number,
        required: [true, 'The people helped field is required!'],
        trim: true,
        maxlength: 100
    },
    hours: {
        type: Number,
        required: [true, 'The hours field is required!'],
        trim: true,
        maxlength: 100
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    publicKey: {
        type: String
    }
}, { minimize: false });

module.exports = Activity = mongoose.model('activity', userActivity);