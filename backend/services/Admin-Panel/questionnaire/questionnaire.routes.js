const router = require("express").Router();
const questionnaireController = require("./questionnaire.controller");
const {
  ensureAuthenticatedAdmin,
  ensureAuthenticatedStudent,
  ensureAuthenticatedBoth,
} = require("../../../helper/guards");
const multer = require("multer");
const path = require("path");

// var storage = multer.diskStorage({
//   destination: function destination(req, file, cb) {
//     cb(null, `${__dirname}/Files`);
//   },
//   filename: function filename(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// var upload = multer({
//   storage: storage,
// }).single("excell");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function filename(req, file, cb) {
    console.log(file, req, "LLLLLLLaaa");
    cb(
      null,
      Date.now() +
        "-" +
        file.fieldname +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
var upload = multer({
  storage: storage,
});

router.post(
  "/create",
  ensureAuthenticatedAdmin,
  questionnaireController.createQuestionnaire
);

router.get(
  "/getallSATquestionnaire",
  ensureAuthenticatedAdmin,
  questionnaireController.getAllSATQuestionnaire
);

router.get(
  "/getallACTquestionnaire",
  ensureAuthenticatedAdmin,
  questionnaireController.getAllACTQuestionnaire
);

router.get(
  "/getallACTquestionnaire_student",
  ensureAuthenticatedStudent,
  questionnaireController.getAllACTQuestionnaire
);

router.get(
  "/get_questionnaire/:id",
  ensureAuthenticatedAdmin,
  questionnaireController.getQuestionnaireByID
);

router.put(
  "/update/:id",
  ensureAuthenticatedAdmin,
  questionnaireController.updateQuestionnaire
);

router.delete(
  "/delete/:id",
  ensureAuthenticatedAdmin,
  questionnaireController.deleteQuestionnaire
);
router.post(
  "/delete_many",
  ensureAuthenticatedAdmin,
  questionnaireController.multipalDeleteQuestionnaire
);

router.post("/excel-upload", questionnaireController.xlsx);

router.post(
  "/upload-ckeditor-image",
  upload.single("image", "image"),

  questionnaireController.uploadCkeditorImage
);
module.exports = router;
