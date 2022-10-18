const router = require('express').Router();
const resultController = require('./result.controller');
const { ensureAuthenticatedAdmin, ensureAuthenticatedStudent } = require('../../../helper/guards');
const multer = require('multer');

router.post('/result', ensureAuthenticatedStudent, resultController.result)


module.exports = router;