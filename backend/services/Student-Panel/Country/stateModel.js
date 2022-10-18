const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const Stateschema = mongoose.Schema(
    {
        countryCode: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            require: true
        },
        isoCode: {
            type: String,
            require: true
        },
        latitude: {
            type: String,
            require: true
        },
        longitude: {
            type: String,
            require: true
        },


    },

    {
        versionKey: false
    }
)




const State = mongoose.model('state', Stateschema)

module.exports = State