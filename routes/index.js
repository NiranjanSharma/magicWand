var express = require('express');
var router = express.Router();

//routes
router.use('/prepareObject', require('./prepare'));

module.exports = router;
