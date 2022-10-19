const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
require("dotenv").config();
var multer = require("multer");
// var upload = multer();
const path = require("path");
const { mongodb } = require("./helper");
// const routes = require('./services/admin/index')
const indexRouter = require("./routes/index");
var multer = require("multer");
// var upload = multer();
const ejs = require("ejs")
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use("/admin", express.static("./public"));
// app.use(upload.array());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
var http = require('http').Server(app);
// app.use(
//   fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
//   })
// );
// app.use("/", routes);
indexRouter.initialize(app);
app.use("/static", express.static("public"))
app.set("views", path.join('../backend/Templates/views/Index.html'))
app.set('view engine', 'html');

// router.get('/', function (req, res) {
//   res.sendFile(path.join('../backend/Templates/views/Index.html'));
//   //__dirname : It will resolve to your project folder.
// });
console.log(path.join(__dirname), ":::::::::;");
if (process.env.ENVIRONMENT == "Production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("/*", (req, res) => {

    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
