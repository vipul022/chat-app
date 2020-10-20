const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const minlengthErrorMsg =
  "The value of path `{PATH}` (`{VALUE}`) is beneath the limit ({MINLENGTH}).  ";
const minlengthPassword = [6, minlengthErrorMsg];
const minlengthUsername = [3, minlengthErrorMsg];
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: minlengthUsername,
      // minlength: [3, "Too short"],

    },
    password: {
      type: String,
      required: true,
      minlength: minlengthPassword,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model("User", userSchema);
