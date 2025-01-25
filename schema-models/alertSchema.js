const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Alert = new Schema({
  user: {
    type: Object
  },
  admin: {
    type: Object
  },
  status: {
    type: String,
  },
  userLocation: {
    type: Object
  },
  adminLocation: {
    type: Object
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
})

const AlertSchema = mongoose.model('alerts', Alert)

module.exports = AlertSchema