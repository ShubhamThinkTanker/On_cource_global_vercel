const router = require("express").Router();
const questionnaireController = require("./questionnaire.controller");
const {
  ensureAuthenticatedAdmin,
  ensureAuthenticatedStudent,
} = require("../../../helper/guards");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, `${__dirname}/Files`);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("excell");

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

module.exports = router;
