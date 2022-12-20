var express = require('express');
var router = express.Router();

const SpecialistController = require('../controllers/SpecialistController')

router.get('/', SpecialistController.all)
router.post('/', SpecialistController.store)
router.post('/delete', SpecialistController.delete)
router.post('/update/:id', SpecialistController.update)
router.get('/overview', SpecialistController.dashboard)

module.exports = router;