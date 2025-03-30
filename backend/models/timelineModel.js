const mongoose = require('mongoose');

const timelineSchema = mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ['attack', 'detection', 'response', 'notification', 'recovery', 'other'],
      default: 'other',
    },
    source: {
      type: String,
    },
    severity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low', 'info'],
      default: 'info',
    },
    evidence: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evidence',
    }],
    system: {
      type: String,
    },
    actor: {
      type: String,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;