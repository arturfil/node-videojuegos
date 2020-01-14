const express = require('express');
const router = express.Router();
const {test} = require('../controllers/authController');

router.get('/', test);
router.post('/signup', signup);

module.exports = router;