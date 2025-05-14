// src/models/User.ts
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    // Make password optional for Google users
    required: false,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Password reset fields
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // Email verification fields
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpire: Date,
  
  // Google OAuth fields (add these)
  googleId: String,
  avatar: String,
});

// Middleware: Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it exists and has been modified
  if (!this.password || !this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: unknown) {
    next(error as mongoose.CallbackError);
  }
});

// Use the model if it exists (for hot reloading) or create a new one
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;