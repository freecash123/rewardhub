const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    referred: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    referralCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'inactive'],
      default: 'pending',
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    bonusPaid: {
      type: Number,
      default: 0,
    },
    bonusRate: {
      type: Number,
      default: 5,
    },
    activatedAt: Date,
  },
  {
    timestamps: true,
  }
);

referralSchema.index({ referrer: 1 });
referralSchema.index({ referred: 1 });
referralSchema.index({ referralCode: 1 });

module.exports = mongoose.model('Referral', referralSchema);
