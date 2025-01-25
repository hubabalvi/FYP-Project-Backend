const AlertSchema = require('../schema-models/alertSchema')
const AdminSchema = require('../schema-models/adminSchema')

module.exports.create = async (req, res) => {
  const { user, location } = req.body

  try {
    const alreadyHasPendingAlert = await AlertSchema.findOne({ "user._id": user._id, status: "pending" })
    const alreadyHasActiveAlert = await AlertSchema.findOne({ "user._id": user._id, status: "accepted" })

    if (alreadyHasActiveAlert) {
      return res.send({
        status: "201",
        message: "Accepted Alert Already exists",
        data: alreadyHasActiveAlert
      })
    }
    else if (alreadyHasPendingAlert) {
      console.log("pending alert exists")
      return res.send({
        status: "202",
        message: "Pending Alert Already exists",
        data: alreadyHasPendingAlert
      })
    }
    else {
      console.log("new alert generted")
      const ref = new AlertSchema({
        user,
        userLocation: location,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
        admin: {},
        adminLocation: {}
      })
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
          console.log(err)
          return res.send({
            status: "500",
            message: "Error",
            data: doc,
            error: err
          })
        }
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

module.exports.readAll = async (req, res) => {
  //database
  try {
    const result = await AlertSchema.find({})
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
    const result = await AlertSchema.find({ email })
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
    const result = await AlertSchema.findOne({ _id: id })
    if (result) {
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

module.exports.search = async (req, res) => {
  try {
    const { title } = req.params
    console.log(title)
    const result = await AlertSchema.find({ title: { $regex: title, $options: "i" } })

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

module.exports.checkIfAccepted = async (req, res) => {
  try {
    const { alert_id } = req.params
    const result = await AlertSchema.findOne({ _id: alert_id, status: 'accepted' })

    if (result) {
      console.log("alert accepted")
      res.send({
        status: "200",
        message: "Found",
        data: result
      })
    }
    else {
      console.log("alert not yet accepted")
      res.send({
        status: "300",
        message: "Alert not accepted yet",
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

module.exports.accept = async (req, res) => {
  try {
    const { alert_id } = req.params
    const { admin, location } = req.body

    const result = await AlertSchema.findByIdAndUpdate(
      { _id: alert_id },
      {
        admin, adminLocation: location, status: "accepted", updatedAt: new Date()
      })

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

module.exports.resolve = async (req, res) => {
  try {
    const { alert_id } = req.params

    const result = await AlertSchema.findByIdAndUpdate(
      { _id: alert_id },
      {
        status: "resolved", updatedAt: new Date()
      })

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