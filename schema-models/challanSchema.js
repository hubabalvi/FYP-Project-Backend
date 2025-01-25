const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  user: {
    type: Object,
    required: true
  },
  admin: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  status: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  }
})

const ChallanSchema = mongoose.model('challans', schema)

module.exports = ChallanSchema