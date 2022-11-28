var express = require('express');
var router = express.Router();

const AppointmentController = require('../controllers/AppointmentController')

router.post('/', AppointmentController.setAppointment)


module.exports = router;