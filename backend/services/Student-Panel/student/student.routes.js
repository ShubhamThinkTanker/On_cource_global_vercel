const router = require("express").Router();
const studentController = require("./student.controller");
const {
  ensureAuthenticatedAdmin,
  ensureAuthenticatedStudent,
} = require("../../../helper/guards");
const multer = require("multer");
const questionnaireController = require("../../Admin-Panel/questionnaire/questionnaire.controller");
const instructionController = require("../../Admin-Panel/instruction/instruction.controller");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({
  storage: storage,
});

router.post("/login", studentController.login);
router.post("/register", studentController.createstudent);
router.post("/forgotpassword", studentController.forgotPassword);
router.post("/resetPassword/:token", studentController.resetPassword);
router.post(
  "/profile",
  ensureAuthenticatedStudent,
  studentController.userprofile
);
router.post("/logout", ensureAuthenticatedStudent, studentController.logout);
router.post("/Autorization", studentController.Autorization);
router.get(
  "/getallstudent",
  ensureAuthenticatedAdmin,
  studentController.getAllStudent
);
router.get(
  "/get_student/:id",
  ensureAuthenticatedAdmin,
  studentController.getStudentByID
);
router.get(
  "/profile/:id",
  ensureAuthenticatedStudent,
  studentController.getStudentByID
);
router.post("/logout", ensureAuthenticatedStudent, studentController.logout);
router.post("/Autorization", studentController.Autorization);
router.get(
  "/getallstudent",
  ensureAuthenticatedAdmin,
  studentController.getAllStudent
);
router.get(
  "/get_student/:id",
  ensureAuthenticatedAdmin,
  studentController.getStudentByID
);
router.get(
  "/profile/:id",
  ensureAuthenticatedStudent,
  studentController.getStudentByID
);
router.put("/update/:id", ensureAuthenticatedAdmin, studentController.update);
router.delete(
  "/delete/:id",
  ensureAuthenticatedAdmin,
  studentController.delete
);
router.post(
  "/delete_many",
  ensureAuthenticatedAdmin,
  studentController.deleteMulti
);
router.get(
  "/getallquestionnairebystudent",
  ensureAuthenticatedStudent,
  questionnaireController.getAllQuestionnaireByStudent
);
router.get(
  "/getallinstruction",
  ensureAuthenticatedStudent,
  instructionController.getAllInstructionForStudent
);
router.get(
  "/get_questionnaire/:id",
  ensureAuthenticatedStudent,
  questionnaireController.getQuestionnaireByIDForStudent
);
router.post(
  "/flagquestion",
  ensureAuthenticatedStudent,
  questionnaireController.flagQuestion
);
router.post(
  "/changepassword",
  ensureAuthenticatedStudent,
  studentController.Change_Password
);

module.exports = router;
