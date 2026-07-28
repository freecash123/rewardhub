const mongoose = require('mongoose');

const paymentRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    coin: {
      type: String,
      enum: ['BTC', 'ETH', 'LTC', 'DOGE', 'USDT_TRC20'],
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    amountUSD: {
      type: Number,
      required: true,
    },
    cryptoAmount: {
      type: Number,
    },
    minDeposit: {
      type: Number,
      required: true,
    },
    confirmationsRequired: {
      type: Number,
      required: true,
    },
    txHash: String,
    confirmations: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['awaiting_payment', 'payment_detected', 'confirming', 'confirmed', 'rejected', 'expired'],
      default: 'awaiting_payment',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    detectedAt: Date,
    confirmedAt: Date,
    rejectionReason: String,
    blockchainData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

paymentRequestSchema.index({ userId: 1 });
paymentRequestSchema.index({ orderId: 1 });
paymentRequestSchema.index({ walletAddress: 1 });
paymentRequestSchema.index({ status: 1 });
paymentRequestSchema.index({ txHash: 1 });

module.exports = mongoose.model('PaymentRequest', paymentRequestSchema);
