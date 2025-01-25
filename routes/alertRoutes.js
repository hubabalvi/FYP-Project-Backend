const express = require('express')
const router = express.Router()

const { create, readMy, readAll, readById, search, accept, checkIfAccepted, resolve } = require('../controllers/alertController.js')

router.post('/create', create)
router.post('/accept/:alert_id', accept)
router.get('/resolve/:alert_id', resolve)
router.get('/checkIfAccepted/:alert_id', checkIfAccepted)
router.get('/readAll', readAll)
router.get('/readMy/:email', readMy)
router.get('/readById/:id', readById)
router.get('/search/:title', search)

// router.get('/get', (req, res) => {
//   res.send({
//     status: 200,
//     message: "get api working"
//   })
// })

module.exports = router