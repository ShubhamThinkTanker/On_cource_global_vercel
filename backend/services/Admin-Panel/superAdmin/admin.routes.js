const router = require('express').Router();
const adminController = require('./admin.controller');
const { ensureAuthenticatedAdmin, ensureAuthenticatedUser } = require('../../../helper/guards');
const multer = require('multer');

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

router.post('/login', adminController.login);
router.post('/forgotpassword', adminController.forgotPassword);
router.post('/resetPassword/:token', adminController.resetPassword);
router.get('/dashboard', ensureAuthenticatedAdmin, adminController.dashboard);

module.exports = router;