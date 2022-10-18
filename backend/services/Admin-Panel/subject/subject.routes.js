const router = require("express").Router();
const subjectController = require("./subject.controller");
const {
  ensureAuthenticatedAdmin,
  ensureAuthenticatedStudent,
  ensureAuthenticatedBoth,
} = require("../../../helper/guards");
const multer = require("multer");
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

router.post(
  "/create",
  ensureAuthenticatedAdmin,
  upload.single("subject_image", "subject_image"),
  subjectController.createSubject
);

router.get(
  "/getallsubject",
  ensureAuthenticatedBoth,
  subjectController.getAllSubject
);
router.get(
  "/getallsubjectname",
  ensureAuthenticatedAdmin,
  subjectController.getsubjectName
);

router.get(
  "/getallsubjectname_student",
  ensureAuthenticatedStudent,
  subjectController.getsubjectName
);
router.get(
  "/get_subject/:id",
  ensureAuthenticatedAdmin,
  subjectController.getSubjectByID
);

router.put(
  "/update/:id",
  ensureAuthenticatedAdmin,
  subjectController.updateSubject
);

router.delete(
  "/delete/:id",
  ensureAuthenticatedAdmin,
  subjectController.deleteSubject
);
router.post(
  "/delete_many",
  ensureAuthenticatedAdmin,
  subjectController.multipalDeleteSubject
);

router.get(
  "/multiple_subject",
  ensureAuthenticatedAdmin,
  subjectController.multipleSelectSubject
);

module.exports = router;
