var express = require('express');
var router = express.Router();

const PatientController = require('../controllers/PatientController')

router.get('/', PatientController.all)
router.post('/', PatientController.register)



module.exports = router;