var express = require('express');
var router = express.Router();

const ScheduleController = require('../controllers/ScheduleController')

router.post('/', ScheduleController.createSchedule)
router.get('/today', ScheduleController.getTodaySchedules)


module.exports = router;