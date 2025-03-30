const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    affectedSystems: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ['new', 'investigating', 'containment', 'eradication', 'recovery', 'closed'],
      default: 'new',
    },
    severity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'medium',
    },
    detectionDate: {
      type: Date,
      default: Date.now,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    team: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    priority: {
      type: String,
      enum: ['urgent', 'high', 'medium', 'low'],
      default: 'medium',
    },
    incidentType: {
      type: String,
      enum: ['ransomware', 'phishing', 'data-breach', 'ddos', 'malware', 'insider-threat', 'other'],
      default: 'other',
    },
    impactAssessment: {
      financial: {
        type: String,
      },
      operational: {
        type: String,
      },
      reputational: {
        type: String,
      },
      dataImpact: {
        type: String,
      },
    },
    notificationStatus: {
      authorities: {
        required: {
          type: Boolean,
          default: false,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        date: {
          type: Date,
        },
      },
      dataSubjects: {
        required: {
          type: Boolean,
          default: false,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        date: {
          type: Date,
        },
      },
    },
    tags: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;