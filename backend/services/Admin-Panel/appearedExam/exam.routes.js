const router = require('express').Router();
const examController = require('./exam.controller');
const { ensureAuthenticatedAdmin } = require('../../../helper/guards');



router.post('/', examController.queAnsDisply);
router.get('/summery', examController.studentSummery);
router.get('/summery-byid/:id', examController.studentSummerByID);


module.exports = router;
