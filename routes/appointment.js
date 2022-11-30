var express = require('express');
var router = express.Router();

const AppointmentController = require('../controllers/AppointmentController')

router.post('/', AppointmentController.setAppointment)
router.post('/my-appointments', AppointmentController.getAppointments)


module.exports = router;