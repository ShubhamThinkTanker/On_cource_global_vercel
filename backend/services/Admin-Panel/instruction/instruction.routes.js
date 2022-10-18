const router = require("express").Router();
const instructionController = require("./instruction.controller");
const {
  ensureAuthenticatedAdmin,
  ensureAuthenticatedBoth,
} = require("../../../helper/guards");

router.post(
  "/create",
  ensureAuthenticatedAdmin,
  instructionController.createInstruction
);

router.get(
  "/getallinstruction",
  ensureAuthenticatedAdmin,
  instructionController.getAllInstruction
);
router.get(
  "/get_instruction/:id",
  ensureAuthenticatedAdmin,
  instructionController.getInstructionByID
);
router.get(
  "/getallsubject",
  ensureAuthenticatedAdmin,
  instructionController.getAllSubject
);

router.put(
  "/update/:id",
  ensureAuthenticatedAdmin,
  instructionController.updateInstruction
);

router.delete(
  "/delete/:id",
  ensureAuthenticatedAdmin,
  instructionController.deleteInstruction
);
router.post(
  "/delete_many",
  ensureAuthenticatedAdmin,
  instructionController.multipalDeleteInstruction
);

module.exports = router;
