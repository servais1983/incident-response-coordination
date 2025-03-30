const asyncHandler = require('../middleware/asyncHandler');
const Timeline = require('../models/timelineModel');

// @desc    Create a new timeline event
// @route   POST /api/timeline
// @access  Private
const createTimelineEvent = asyncHandler(async (req, res) => {
  const {
    incident,
    title,
    description,
    eventTime,
    category,
    source,
    severity,
    evidence,
    system,
    actor,
    isConfirmed,
    tags,
  } = req.body;

  const timelineEvent = await Timeline.create({
    incident,
    title,
    description,
    eventTime,
    category,
    source,
    severity,
    evidence,
    system,
    actor,
    isConfirmed,
    addedBy: req.user._id,
    tags,
  });

  if (timelineEvent) {
    res.status(201).json(timelineEvent);
  } else {
    res.status(400);
    throw new Error('Invalid timeline event data');
  }
});

// @desc    Get all timeline events
// @route   GET /api/timeline
// @access  Private
const getAllTimelineEvents = asyncHandler(async (req, res) => {
  const timelineEvents = await Timeline.find({})
    .populate('incident', 'title')
    .populate('evidence', 'name type')
    .populate('addedBy', 'name email');
  res.json(timelineEvents);
});

// @desc    Get timeline events by incident ID
// @route   GET /api/timeline/incident/:id
// @access  Private
const getTimelineByIncident = asyncHandler(async (req, res) => {
  const timelineEvents = await Timeline.find({ incident: req.params.id })
    .populate('evidence', 'name type')
    .populate('addedBy', 'name email')
    .sort({ eventTime: 1 });
  res.json(timelineEvents);
});

// @desc    Get timeline event by ID
// @route   GET /api/timeline/:id
// @access  Private
const getTimelineEventById = asyncHandler(async (req, res) => {
  const timelineEvent = await Timeline.findById(req.params.id)
    .populate('incident', 'title')
    .populate('evidence', 'name type')
    .populate('addedBy', 'name email');

  if (timelineEvent) {
    res.json(timelineEvent);
  } else {
    res.status(404);
    throw new Error('Timeline event not found');
  }
});

// @desc    Update timeline event
// @route   PUT /api/timeline/:id
// @access  Private
const updateTimelineEvent = asyncHandler(async (req, res) => {
  const timelineEvent = await Timeline.findById(req.params.id);

  if (timelineEvent) {
    timelineEvent.title = req.body.title || timelineEvent.title;
    timelineEvent.description = req.body.description || timelineEvent.description;
    timelineEvent.eventTime = req.body.eventTime || timelineEvent.eventTime;
    timelineEvent.category = req.body.category || timelineEvent.category;
    timelineEvent.source = req.body.source || timelineEvent.source;
    timelineEvent.severity = req.body.severity || timelineEvent.severity;
    timelineEvent.evidence = req.body.evidence || timelineEvent.evidence;
    timelineEvent.system = req.body.system || timelineEvent.system;
    timelineEvent.actor = req.body.actor || timelineEvent.actor;
    timelineEvent.isConfirmed = req.body.isConfirmed !== undefined ? req.body.isConfirmed : timelineEvent.isConfirmed;
    timelineEvent.tags = req.body.tags || timelineEvent.tags;

    const updatedTimelineEvent = await timelineEvent.save();
    res.json(updatedTimelineEvent);
  } else {
    res.status(404);
    throw new Error('Timeline event not found');
  }
});

// @desc    Delete timeline event
// @route   DELETE /api/timeline/:id
// @access  Private
const deleteTimelineEvent = asyncHandler(async (req, res) => {
  const timelineEvent = await Timeline.findById(req.params.id);

  if (timelineEvent) {
    await Timeline.deleteOne({ _id: req.params.id });
    res.json({ message: 'Timeline event removed' });
  } else {
    res.status(404);
    throw new Error('Timeline event not found');
  }
});

// @desc    Get timeline events by category
// @route   GET /api/timeline/category/:category
// @access  Private
const getTimelineEventsByCategory = asyncHandler(async (req, res) => {
  const timelineEvents = await Timeline.find({ category: req.params.category })
    .populate('incident', 'title')
    .populate('evidence', 'name type')
    .populate('addedBy', 'name email')
    .sort({ eventTime: 1 });
  res.json(timelineEvents);
});

module.exports = {
  createTimelineEvent,
  getAllTimelineEvents,
  getTimelineByIncident,
  getTimelineEventById,
  updateTimelineEvent,
  deleteTimelineEvent,
  getTimelineEventsByCategory,
};