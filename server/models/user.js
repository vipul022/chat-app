const mongoose = require("mongoose");

const Schema = mongoose.Shcema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
User.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model("User", userSchema);
