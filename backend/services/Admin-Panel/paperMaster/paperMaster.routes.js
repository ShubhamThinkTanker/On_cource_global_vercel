const router = require("express").Router();
const paperMasterController = require("./paperMaster.controller");
const {
  ensureAuthenticatedAdmin,
  ensureAuthenticatedStudent,
} = require("../../../helper/guards");

router.post("/create", ensureAuthenticatedAdmin, paperMasterController.createPaperMaster);
router.get("/get_papermaster/:id", ensureAuthenticatedAdmin, paperMasterController.getPaperMasterByID);
router.get("/getallpaperMaster", ensureAuthenticatedAdmin, paperMasterController.getPaperMaster);
router.put("/update/:id", ensureAuthenticatedAdmin, paperMasterController.updatePaperMaster);
router.delete("/delete/:id", ensureAuthenticatedAdmin, paperMasterController.deletePaperMaster);
router.post("/delete_many", ensureAuthenticatedAdmin, paperMasterController.multipalDeletePaperMaster);

router.get("/getallpapername", ensureAuthenticatedAdmin, paperMasterController.getPaperName);
router.get("/getallpapername_student", ensureAuthenticatedStudent, paperMasterController.getPaperName);

module.exports = router;
