var express = require('express');
var router = express.Router();
const { getTypes, getMakes, getYears, getCars } = require('../controllers/data');
/* GET home page. */

router.get("/types", getTypes);
router.get("/makes", getMakes);
router.get("/years", getYears);
router.get("/cars", getCars);

module.exports = router;
