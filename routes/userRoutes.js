const express = require('express')
const router = express.Router()

const { loginUser, SignupUser, readAll, addBalance, getById } = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/signup', SignupUser)
router.get('/readAll', readAll)
router.post('/addBalance', addBalance)
router.get('/getById/:id', getById)

module.exports = router