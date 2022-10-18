const mongoose = require("mongoose");

const paperMasterSchema = mongoose.Schema(
  {
    paper_name: {
      type: String,
    },

    paper_description: {
      type: String,
    },

    year: {
      type: String,
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

const PaperMaster = mongoose.model("papermaster", paperMasterSchema);

module.exports = PaperMaster;
