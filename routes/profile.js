var express = require('express');
var router = express.Router();

const ProfileController = require('../controllers/ProfileController')

router.post('/update', ProfileController.update)


module.exports = router;
