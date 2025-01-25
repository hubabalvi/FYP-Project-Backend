const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Has Been Connected ${conn.connection.host}`)
    } catch (error) {
        console.log("Mongodb error", error)
        process.exit(1)
    }
}

module.exports = connectDB