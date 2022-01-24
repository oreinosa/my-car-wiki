var express = require('express');
var router = express.Router();
const { getTypes } = require('../controllers/data');
/* GET home page. */

router.get("/types", getTypes);

module.exports = router;
