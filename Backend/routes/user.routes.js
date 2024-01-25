const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.controller');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.get('/', userCtrl.findAll)
router.delete('/:id', userCtrl.delete)


module.exports = router;
