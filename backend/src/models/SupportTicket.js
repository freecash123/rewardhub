const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      maxlength: 200,
    },
    category: {
      type: String,
      enum: ['general', 'payment', 'withdrawal', 'account', 'technical', 'referral', 'other'],
      default: 'general',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'waiting_on_user', 'resolved', 'closed'],
      default: 'open',
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        senderRole: {
          type: String,
          enum: ['user', 'admin'],
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        attachments: [String],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: Date,
    closedAt: Date,
  },
  {
    timestamps: true,
  }
);

supportTicketSchema.index({ userId: 1 });
supportTicketSchema.index({ ticketId: 1 });
supportTicketSchema.index({ status: 1 });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
