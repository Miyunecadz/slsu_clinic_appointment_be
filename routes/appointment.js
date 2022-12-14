var express = require('express');
var router = express.Router();

const AppointmentController = require('../controllers/AppointmentController')

router.post('/', AppointmentController.setAppointment)
router.post('/my-appointments', AppointmentController.getAppointments)
router.post('/add-rating', AppointmentController.addAppointmentRating)
router.post('/approve', AppointmentController.approveAppointment)
router.post('/reject', AppointmentController.rejectAppointment)

module.exports = router;