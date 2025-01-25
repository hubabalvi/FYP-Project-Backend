const ChallanSchema = require('../schema-models/challanSchema')
const UserSchema = require('../schema-models/userSchema')

module.exports.create = (req, res) => {
  console.log('create data ==>', req.body)

  try {
    const ref = new ChallanSchema(req.body)
    ref.save((err, doc) => {
      if (!err) {
        console.log(doc)
        return res.send({
          status: "200",
          message: "Document saved",
          data: doc
        })
      }
      else {
        return res.send({
          status: "500",
          message: "Error",
          data: err.message
        })
      }
    })
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
    })

  }
}

module.exports.readAll = async (req, res) => {
  //database
  try {
    const result = await ChallanSchema.find({})
    if (result[0]) {
      console.log("read: ", result)
      res.send({
        status: "200",
        message: "success",
        data: result
      })
    }
    else {
      res.send({
        status: "200",
        message: "No result",
        data: []
      })
    }
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
    })

  }
}

module.exports.readMy = async (req, res) => {
  //database
  try {
    const { email } = req.params
    const result = await ChallanSchema.find({ email })
    if (result[0]) {
      console.log("read: ", result)
      res.send({
        status: "200",
        message: "Success",
        data: result
      })
    }
    else {
      res.send({
        status: "200",
        message: "no result",
        data: result
      })
    }
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
    })

  }
}

module.exports.readById = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const result = await ChallanSchema.find({ "user._id": id })
    if (result.length > 0) {
      console.log("read: ", result)
      res.send({
        status: "200",
        message: "Success",
        data: result
      })
    }
    else {
      res.send({
        status: "200",
        message: "no result",
        data: result
      })
    }
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
    })

  }
}

module.exports.pay = async (req, res) => {
  const { user_id, challan_id } = req.params
  console.log(user_id, challan_id)
  try {

    const challanData = await ChallanSchema.findOne({ "_id": challan_id })
    const userData = await UserSchema.findOne({ "_id": user_id })
    console.log("userData", userData)
    // console.log("userData.balance", userData.balance)
    // console.log("challanData.amount", parseInt(challanData.amount))

    if (userData.balance >= parseInt(challanData.amount)) {
      let copyUserData = { ...userData }
      let oldUserBal = parseInt(userData.balance)
      let oldChallanAmt = parseInt(challanData.amount)
      // let newBal = Math.abs(oldUserBal - oldChallanAmt)

      copyUserData._doc.balance = Math.abs(oldUserBal - oldChallanAmt)
      copyUserData._doc.updatedAt = new Date()
      console.log("copyUserData", copyUserData)

      const userUpdate = await UserSchema.findByIdAndUpdate({ _id: user_id }, copyUserData)
      console.log("userUpdate", userUpdate)

      let copyChallanData = { ...challanData }
      copyChallanData._doc.status = "paid"
      copyChallanData._doc.updatedAt = new Date()

      const challanUpdate = await ChallanSchema.findByIdAndUpdate({ _id: challan_id }, copyChallanData)
      console.log("challanUpdate", challanUpdate)

      const result = await ChallanSchema.find({ "user._id": user_id })

      res.send({
        status: "200",
        message: "Success",
        data: result
      })
    }

    else {
      res.send({
        status: "500",
        message: "Insufficient Balance",
        data: []
      })
    }
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
    })

  }
}

module.exports.search = async (req, res) => {
  try {
    const { title } = req.params
    console.log(title)
    const result = await ChallanSchema.find({ title: { $regex: title, $options: "i" } })

    if (result) {
      console.log("search: ", result)
      res.send({
        status: "200",
        message: "Found",
        data: result
      })
    }
    else {
      res.send({
        status: "200",
        message: "No result",
        data: []
      })
    }
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
      error: e.message
    })
  }
}

module.exports.readByAdminId = async (req, res) => {
  try {
    const { admin_id } = req.params
    console.log(admin_id)
    const result = await ChallanSchema.find({ "admin._id": admin_id })
    if (result.length > 0) {
      console.log("read: ", result)
      res.send({
        status: "200",
        message: "Success",
        data: result
      })
    }
    else {
      res.send({
        status: "200",
        message: "no result",
        data: result
      })
    }
  }
  catch (e) {
    console.log(e)
    res.send({
      status: "500",
      message: "Something went wrong",
    })

  }
}