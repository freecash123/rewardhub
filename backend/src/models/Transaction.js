const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'referral_bonus', 'membership_bonus', 'admin_adjustment', 'reward'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ['USD', 'BTC', ,ETH', 'LTC', 'DOGE', 'USDT'],
      default: 'USD',
    },
    cryptoAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    coin: {
      type: String,
      enum: ['BTC', 'ETH', 'LTC', 'DOGE', 'USDT_TRC20', null],
    },
    walletAddress: String,
    txHash: {
      type: String,
      sparse: true,
      unique: true,
      partialFilterExpression: { txHash: { $type: 'string' } },
    },
    confirmations: {
      type: Number,
      default: 0,
    },
    confirmationsRequired: {
      type: Number,
      default: 0,
    },
    description: String,
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    processedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
transactionSchema.index({ userId: 1, type: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ txHash: 1 });
transactionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
