const mongoose_obj = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = new mongoose_obj.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
});

// password hashing before saving the user to the database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt); // hashed password
});

// compare the entered password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

const User = mongoose_obj.model("User", userSchema);
module.exports = User;
