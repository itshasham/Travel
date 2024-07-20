const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// Method to generate JWT token
userSchema.methods.generateToken = function() {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        admin: this.admin,
      },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn:"30d",
    }
    );
  } catch (error) {
    console.error(error);
    return null; // Handle the error appropriately
  }
};

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
