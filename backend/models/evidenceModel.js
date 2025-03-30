const mongoose = require('mongoose');

const evidenceSchema = mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ['log', 'image', 'memory-dump', 'network-capture', 'file', 'other'],
      default: 'other',
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    collectionDate: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
    },
    filePath: {
      type: String,
    },
    hash: {
      type: String,
    },
    size: {
      type: Number,
    },
    tags: [{
      type: String,
    }],
    metadata: {
      type: Map,
      of: String,
    },
    chainOfCustody: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      action: {
        type: String,
        enum: ['collected', 'accessed', 'modified', 'transferred', 'analyzed'],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      notes: {
        type: String,
      },
    }],
  },
  {
    timestamps: true,
  }
);

const Evidence = mongoose.model('Evidence', evidenceSchema);

module.exports = Evidence;