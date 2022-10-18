const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const tempQuizSchema = mongoose.Schema(
    {
        subject_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        subject_name: {
            type: String,
        },
        stundent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        },
        stundent_name: {
            type: String,

        },
        questionnaire_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questionnaire'
        },
        questions: {
            type: String
        },

        options: {
            type: Array,
            required: true,
            default: ""
        },

        answered: {
            type: String,
            default: "student",
            required: false,
        },

        submited_answered: {
            type: String,
            required: false,
        },

        is_deleted: {
            type: String,
            enum: [0, 1],
            default: "0",
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


const TempQuiz = mongoose.model('tempQuiz', tempQuizSchema)

module.exports = TempQuiz