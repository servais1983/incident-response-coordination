const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
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
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'blocked'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    phase: {
      type: String,
      enum: ['containment', 'eradication', 'recovery', 'post-incident'],
    },
    notes: [{
      text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    dependencies: [{
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
      type: {
        type: String,
        enum: ['blocks', 'blocked-by'],
      },
    }],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;