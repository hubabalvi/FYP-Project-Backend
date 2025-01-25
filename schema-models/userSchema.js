const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleRegistrationNo: {
    type: String,
    required: true,
  },
  licenceNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  balance: {
    type: Number,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  }
});

userSchema.pre("save", function () {
  const user = this;
  console.log(this);

  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(user.password, salt);

  user.password = hash;

  console.log("after encryption", this.password);
});

userSchema.methods.comparePasswords = function (frontendPassword) {
  const user = this;
  //Backend password user.password

  return bcryptjs.compareSync(frontendPassword, user.password);
};

const Users = mongoose.model("users", userSchema);

module.exports = Users;
