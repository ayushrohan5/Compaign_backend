const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  campaignName: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
   sent: {
    type: Boolean,
    default: false, 
  },
  emails: {
    type: [String],
    required: true,
    validate: {
      validator: (emails) => emails.length > 0,
      message: 'At least one email is required',
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
