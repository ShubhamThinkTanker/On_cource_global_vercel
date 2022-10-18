const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const adminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
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
            required: true,
            default: ""
        },
        gender: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: "admin",
            required: false,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
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


adminSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, name: this.name, email: this.email, mobile_no: this.mobile_no, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin