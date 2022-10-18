const router = require('express').Router();
const controller = require('./controller')

router.get(
    '/get_all_country',
    controller.GetAllCountry);


router.get(
    '/get_all_state',
    controller.GetAllState);


router.get(
    '/get_all_city',
    controller.GetAllCity);

module.exports = router;