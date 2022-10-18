const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const CitySchema = mongoose.Schema(
    {
        countryCode: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            require: true
        },
        stateCode: {
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




const City = mongoose.model('city', CitySchema)

module.exports = City