const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['free', 'silver', 'gold', 'platinum', 'diamond'],
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    durationDays: {
      type: Number,
      default: 30,
    },
    bonusRate: {
      type: Number,
      default: 0,
    },
    referralBonusRate: {
      type: Number,
      default: 5,
    },
    features: [String],
    benefits: [String],
    color: String,
    icon: String,
    sortOrder: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema);
