import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import crypto from 'crypto';
import AuditLog from './AuditLogModel.js'; 


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'supplier', 'customer'],
    default: 'user'
  },  
  twoFactorAuth: {
    enabled: {
      type: Boolean,
      default: false
    },
    secret: String,
    backupCodes: [{
      code: String,
      used: {
        type: Boolean,
        default: false
      }
    }]
  },
  lastActivity: Date,
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add activity logging method
userSchema.methods.logActivity = async function(action, metadata = {}) {
  await AuditLog.create({
    userId: this._id,
    action,
    ipAddress: metadata.ipAddress,
    userAgent: metadata.userAgent,
    metadata: {
      ...metadata,
      userRole: this.role
    }
  });
  
  this.lastActivity = Date.now();
  await this.save();
};

// Generate 2FA secret
userSchema.methods.generateTwoFactorSecret = function() {
  const secret = speakeasy.generateSecret({ length: 20 });
  this.twoFactorAuth = {
    enabled: false,
    secret: secret.base32,
    backupCodes: Array(5).fill().map(() => ({
      code: crypto.randomBytes(4).toString('hex').toUpperCase(),
      used: false
    }))
  };
  return secret;
};

// Verify 2FA token
userSchema.methods.verifyTwoFactorToken = function(token) {
  return speakeasy.totp.verify({
    secret: this.twoFactorAuth.secret,
    encoding: 'base32',
    token,
    window: 1
  });
};

// Password encryption middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Account lockout for failed attempts
userSchema.methods.incrementLoginAttempts = async function() {
  if (this.lockUntil && this.lockUntil > Date.now()) {
    throw new Error('Account is temporarily locked');
  }

  this.loginAttempts += 1;
  
  if (this.loginAttempts >= 5) {
    this.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
  }
  
  await this.save();
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  this.lastLogin = Date.now();
  await this.save();
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for supplier relationship
userSchema.virtual('suppliers', {
  ref: 'Supplier',
  localField: '_id',
  foreignField: 'userId',
  justOne: false
});

// Cascade delete user's suppliers when user is deleted
userSchema.pre('remove', async function(next) {
  await this.model('Supplier').deleteMany({ userId: this._id });
  next();
});

const User = mongoose.model('User', userSchema);

export default User;