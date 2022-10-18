const router = require('express').Router();
const deshboardController = require('./deshboard.controller');
const { ensureAuthenticatedAdmin, ensureAuthenticatedStudent } = require('../../../helper/guards');

router.post('/list', ensureAuthenticatedStudent, deshboardController.deshboard);
router.get('/dashboard', ensureAuthenticatedStudent, deshboardController.countApi);


module.exports = router;