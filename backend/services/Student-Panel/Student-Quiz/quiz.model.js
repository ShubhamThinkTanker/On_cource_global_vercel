const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const quizSchema = mongoose.Schema(
  {
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    subject_name: {
      type: String,
    },
    stundent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    stundent_name: {
      type: String,
    },
    paper_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "papermaster",
    },
    paper_name: {
      type: String,
    },
    questionnaire_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionnaire",
    },
    questions: {
      type: String,
    },
    total_questions: {
      type: String,
    },
    options: {
      type: Array,
      default: "",
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

    right_answered: {
      type: String,
      enum: [0, 1],
      default: "0",
    },
    student_marks: {
      type: String,
      required: false,
    },
    // start_date: {
    //     type: Date,
    //     required: false,
    // },
    // end_date: {
    //     type: Date,
    //     required: false,
    // },
    // start_time: {
    //     type: Date,
    //     required: false,
    // },
    // end_time: {
    //     type: Date,
    //     required: false,
    // },
    // attampt_time: {
    //     type: Date,
    //     required: false,
    // },
    status: {
      type: String,
      default: "complete",
    },
    is_deleted: {
      type: String,
      enum: [0, 1],
      default: "0",
    },
    createdAt: {
      field: "created_at",
      type: Date,
      default: Date.now,
    },
    created_by: {
      type: String,
    },
    updatedAt: {
      field: "updated_at",
      type: Date,
      default: "",
    },
    updated_by: {
      type: Number,
      default: "",
    },
  },

  {
    versionKey: false,
  }
);

const Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
