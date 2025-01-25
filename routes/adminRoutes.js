const express = require('express')
const router = express.Router()

const { SignupAdmin, LoginAdmin, readAll } = require('../controllers/adminController.js')

router.post('/signup', SignupAdmin)
router.post('/login', LoginAdmin)
router.get('/readAll', readAll)

module.exports = router