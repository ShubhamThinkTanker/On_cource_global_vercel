const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.DB_MONGO_URL || "mongodb://localhost:27017/on_course_global",
  { useNewUrlParser: true },
  function (err, db) {
    if (err) {
      console.log("MongoDB Database Connection Error", err);
    } else {
      console.log("MongoDB Connection Done!!");
    }
  }
);
