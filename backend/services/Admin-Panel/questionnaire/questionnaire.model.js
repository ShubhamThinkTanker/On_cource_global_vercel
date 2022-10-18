const mongoose = require("mongoose");

const questionnaireSchema = mongoose.Schema(
  {
    question_number: {
      type: Number,
    },
    is_type: {
      type: String,
      require: true,
    },
    paper_id: {
      type: String,
      require: true
    },
    paper_name: {
      type: String,
      require: true
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    subject_name: {
      type: String,
    },
    question: {
      type: String,
      required: true,
      unique: true,
    },
    question_description: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },

    answer: {
      type: Number,
      required: true,
    },
    answer_description: {
      type: String
    },
    question_marks: {
      type: Number,
      required: true,
    },
    flag: {
      type: String,
      enum: [0, 1],
      default: "0",
    },
    isActive: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    question_status: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Unscored", "Grid-in"],
      default: "Medium",
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
    updatedAt: {
      field: "updated_at",
      type: Date,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

var Questionnaire = mongoose.model("questionnaire", questionnaireSchema);

module.exports = Questionnaire;
