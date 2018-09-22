let mongoose = require('mongoose');
let validator = require('validator');
let _ = require('lodash');


// Add schema so schema methods can be added.
let inspection = new mongoose.Schema({
    venue: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        enum: ['Home', 'Plot', 'Office', 'Vehicle']
    },
    city: {
        required: true,
        type: String,
        minlength: 1,
        // validate: {
        //     validator: validator.isEmpty,
        //     message: "Please select city."
        // },
        trim: true
    },
    location: {
        type: {
            required: false,
            type: String,
            minlength: 1,
            default: 'Point'
        },
        cordinates: {
            required: true,
            type: Array,
            minlength: 1
        }
    },
    status: {
        required: false,
        type: String,
        minlength: 1,
        trim: true,
        enum: ['pending', 'started', 'approved', 'rejected'],
        default: 'pending'
    },
    ownername: {
        required: true,
        type: String,
        minlength: 3
    },
    ownerdetails: {
        address: {
            required: false,
            type: String,
            minlength: 10
        },
        phone: {
            required: true,
            type: Number,
            minlength: 10
        },
    },
    finalreport: {
        required: true,
        type: String,
        minlength: 10
    }
})

let inpector = mongoose.model("inspection", inspection);

module.exports = {
    inpector,
    mongoose
};