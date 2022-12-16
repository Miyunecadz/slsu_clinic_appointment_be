let express = require('express');
let router = express.Router();

const AccountController = require('../controllers/AccountController')
router.post('/delete', AccountController.destroy)

module.exports = router;