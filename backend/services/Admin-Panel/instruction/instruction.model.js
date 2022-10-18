const mongoose = require("mongoose");

const instructionSchema = mongoose.Schema(
  {
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    subject_name: {
      type: String,
    },
    total_marks: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: String,
      enum: [0, 1],
      default: "0"
    },
    time_duration: {
      type: Number,
      required: true,
    },
    isActive: {
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

const Instruction = mongoose.model("instruction", instructionSchema);

module.exports = Instruction;
