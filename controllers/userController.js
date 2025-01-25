const Users = require("../schema-models/userSchema");

module.exports.loginUser = async (req, res) => {
  const { cnic, password } = req.body;
  console.log("users data ==>", req.body);
  try {
    const userRef = await Users.findOne({ cnic });

    if (userRef) {
      const result = userRef.comparePasswords(password);
      console.log("result", result);

      if (result) {
        return res.send({
          status: "200",
          message: result,
          data: userRef
        });
      }
      else {
        return res.send({
          status: "500",
          message: "Wrong email or password",
        });
      }
    }
    res.send({
      status: "500",
      message: "user not found",
    });

  }
  catch (e) {
    console.log(e);
    res.send({
      status: "500",
      message: "Something went wrong",
      error: e.message
    });
  }
};

module.exports.SignupUser = async (req, res) => {
  console.log("SignupUser")
  //database
  const { name, phoneNumber, email,
    password, cnic, vehicleRegistrationNo,
    licenceNo } = req.body;
  console.log(req.body);

  try {
    const userExists = await Users.findOne({ cnic });

    if (userExists) {
      return res.send({
        status: "500",
        message: "User Already Exists",
      })
    }

    const userRef = new Users({
      name,
      phoneNumber,
      email,
      password,
      cnic,
      vehicleRegistrationNo,
      licenceNo,
      status: "active",
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    userRef.save((err, doc) => {
      if (!err) {
        console.log(doc);
        return res.send({
          status: "200",
          message: "Document saved",
          data: doc,
        });
      } else {
        console.log(err);
        return res.send({
          status: "500",
          message: err.message,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({
      status: "500",
      message: "Something went wrong",
    });
  }
};

module.exports.readAll = async (req, res) => {
  //database
  try {
    const result = await Users.find({})
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

module.exports.addBalance = async (req, res) => {
  //database
  const { user, amount } = req.body
  try {
    let copyArr = { ...user }
    copyArr.balance = copyArr.balance + parseInt(amount)
    copyArr.updatedAt = new Date()
    console.log("copyArr", copyArr)

    const result = await Users.findByIdAndUpdate({ _id: user._id }, copyArr)
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

module.exports.getById = async (req, res) => {
  //database
  const { id } = req.params
  try {
    const result = await Users.findOne({ _id: id });
    console.log("read: ", result)
    if (result) {
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
