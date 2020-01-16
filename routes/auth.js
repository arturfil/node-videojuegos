const express = require('express');
const router = express.Router();
const {test, signup, signin} = require('../controllers/authController');

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin)

module.exports = router;