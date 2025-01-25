require('dotenv').config()

// MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.2xuaqmz.mongodb.net/TRACKIE_1?retryWrites=true&w=majority`
// MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.2xuaqmz.mongodb.net/TRACKIE_1?retryWrites=true&w=majority`
MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.2xuaqmz.mongodb.net/TRACKIE?retryWrites=true&w=majority`

// console.log(process.env.MONGODB_USERNAME)

module.exports = MONGODB_URL