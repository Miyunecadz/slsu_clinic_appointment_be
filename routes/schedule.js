var express = require('express');
var router = express.Router();

const ScheduleController = require('../controllers/ScheduleController')

router.post('/', ScheduleController.createSchedule)
router.get('/today', ScheduleController.getTodaySchedules)
router.get('/:specialistId', ScheduleController.getScheduleBySpecialist)
router.post('/:specialistId', ScheduleController.getScheduleOfSpecialistByKeyword)

module.exports = router;