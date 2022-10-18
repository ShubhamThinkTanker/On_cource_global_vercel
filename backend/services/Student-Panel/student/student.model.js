const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const studentSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        mobile_no: {
            type: String,
            // required: true,
            default: ""
        },
        gender: {
            type: String,
            // require: true
        },
        role: {
            type: String,
            default: "student",
            required: false,
        },
        profile_image: {
            type: String,
            // data: Buffer,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        birth_date: {
            type: String,
            // require: true
        },
        street_add1: {
            type: String,
            // require: true
        },
        street_add2: {
            type: String,

        },
        city: {
            type: String,
            // require: true
        },
        state: {
            type: String,
            // require: true
        },
        zip: {
            type: String,
            // require: true
        },
        country: {
            type: String,
            // require: true
        },
        is_login: {
            type: String,
            enum: [0, 1],
            default: "0",
        },
        is_deleted: {
            type: String,
            enum: [0, 1],
            default: "0",
        },
        resetPasswordToken: {
            type: String,
            default: "",
        },
        resetPasswordExpires: {
            type: Date,
            default: "",
        },
        createdAt: {
            field: 'created_at',
            type: Date,
            default: Date.now
        },
        created_by: {
            type: String
        },
        updatedAt: {
            field: 'updated_at',
            type: Date,
            default: ""
        },
        updated_by: {
            type: Number,
            default: ""
        },
    },

    {
        versionKey: false
    }
)


studentSchema.methods.getJWTToken = function () {
    return jwt.sign({
        id: this._id,
        username: this.username,
        name: this.name,
        email: this.email,
        mobile_no: this.mobile_no,
        role: this.role,
        gender: this.gender,
        profile_image: this.profile_image,
        birth_date: this.birth_date,
        street_add1: this.street_add1,
        state: this.state,
        zip: this.zip,
        country: this.country,

    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const Student = mongoose.model('student', studentSchema)

module.exports = Student