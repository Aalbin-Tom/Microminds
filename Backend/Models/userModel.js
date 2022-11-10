const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,

    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    age: {
      type: Number,
      required: true,
    },
     value: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;