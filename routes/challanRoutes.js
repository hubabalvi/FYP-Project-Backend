const express = require('express')
const router = express.Router()

const { create, readMy, readAll, readById, readByAdminId, search, pay } = require('../controllers/challanController.js')

router.post('/create', create)
router.get('/readAll', readAll)
router.get('/readMy/:email', readMy)
router.get('/readById/:id', readById)
router.get('/readByAdminId/:admin_id', readByAdminId)
router.get('/pay/:user_id/:challan_id', pay)
router.get('/search/:title', search)

// router.get('/get', (req, res) => {
//   res.send({
//     status: 200,
//     message: "get api working"
//   })
// })

module.exports = router