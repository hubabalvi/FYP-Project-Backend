const AdminSchema = require("../schema-models/adminSchema");

module.exports.LoginAdmin = async (req, res) => {
  const { badgeNumber, password } = req.body;
  console.log("AdminSchema data ==>", req.body);
  try {
    const userRef = await AdminSchema.findOne({ badgeNumber });

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

module.exports.SignupAdmin = async (req, res) => {
  console.log("SignupUser")
  //database
  const { badgeNumber } = req.body
  console.log(req.body);


  try {

    const adminExists = await AdminSchema.findOne({ badgeNumber });

    if (adminExists) {
      return res.send({
        status: "500",
        message: "Badge Number A;ready Registered",
      });
    }

    const userRef = new AdminSchema(req.body);

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
    const result = await AdminSchema.find({})
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