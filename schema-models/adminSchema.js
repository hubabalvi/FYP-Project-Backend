const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const admin = new Schema({
  name: {
    type: String,
  },
  badgeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
});

admin.pre("save", function () {
  const user = this;
  console.log(this);

  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(user.password, salt);

  user.password = hash;

  console.log("after encryption", this.password);
});

admin.methods.comparePasswords = function (frontendPassword) {
  const user = this;
  //Backend password user.password

  return bcryptjs.compareSync(frontendPassword, user.password);
};

const AdminSchema = mongoose.model("admins", admin);

module.exports = AdminSchema;
