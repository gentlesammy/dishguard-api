let mongoose = require("mongoose");
const { Schema, model } = mongoose;
let passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.plugin(passportLocalMongoose);

module.exports = model("User", userSchema);
