const router = require('express').Router();
const quizController = require('./quiz.controller');
const { ensureAuthenticatedAdmin, ensureAuthenticatedStudent } = require('../../../helper/guards');
const multer = require('multer');

router.post('/quiz', ensureAuthenticatedStudent, quizController.quiz)


module.exports = router;