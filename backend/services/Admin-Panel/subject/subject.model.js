const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    subject_image: {
      type: String,
      // data: Buffer,
    },
    subject_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
    createdBy: {
      type: String,
      default: "",
    },
    updatedAt: {
      field: "updated_at",
      type: Date,
      default: "",
    },
    updatedBy: {
      type: Number,
      default: "",
    },
  },

  {
    versionKey: false,
  }
);

const Subject = mongoose.model("subject", subjectSchema);

module.exports = Subject;
