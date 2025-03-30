const asyncHandler = require('../middleware/asyncHandler');
const Evidence = require('../models/evidenceModel');

// @desc    Create a new evidence
// @route   POST /api/evidence
// @access  Private
const createEvidence = asyncHandler(async (req, res) => {
  const {
    incident,
    name,
    description,
    type,
    location,
    filePath,
    hash,
    size,
    tags,
    metadata,
  } = req.body;

  const evidence = await Evidence.create({
    incident,
    name,
    description,
    type,
    collectedBy: req.user._id,
    location,
    filePath,
    hash,
    size,
    tags,
    metadata,
    chainOfCustody: [{
      user: req.user._id,
      action: 'collected',
      notes: 'Initial collection',
    }],
  });

  if (evidence) {
    res.status(201).json(evidence);
  } else {
    res.status(400);
    throw new Error('Invalid evidence data');
  }
});

// @desc    Get all evidence
// @route   GET /api/evidence
// @access  Private
const getAllEvidence = asyncHandler(async (req, res) => {
  const evidence = await Evidence.find({})
    .populate('incident', 'title')
    .populate('collectedBy', 'name email')
    .populate('chainOfCustody.user', 'name email');
  res.json(evidence);
});

// @desc    Get evidence by incident ID
// @route   GET /api/evidence/incident/:id
// @access  Private
const getEvidenceByIncident = asyncHandler(async (req, res) => {
  const evidence = await Evidence.find({ incident: req.params.id })
    .populate('collectedBy', 'name email')
    .populate('chainOfCustody.user', 'name email')
    .sort({ collectionDate: -1 });
  res.json(evidence);
});

// @desc    Get evidence by ID
// @route   GET /api/evidence/:id
// @access  Private
const getEvidenceById = asyncHandler(async (req, res) => {
  const evidence = await Evidence.findById(req.params.id)
    .populate('incident', 'title')
    .populate('collectedBy', 'name email')
    .populate('chainOfCustody.user', 'name email');

  if (evidence) {
    res.json(evidence);
  } else {
    res.status(404);
    throw new Error('Evidence not found');
  }
});

// @desc    Update evidence
// @route   PUT /api/evidence/:id
// @access  Private
const updateEvidence = asyncHandler(async (req, res) => {
  const evidence = await Evidence.findById(req.params.id);

  if (evidence) {
    evidence.name = req.body.name || evidence.name;
    evidence.description = req.body.description || evidence.description;
    evidence.type = req.body.type || evidence.type;
    evidence.location = req.body.location || evidence.location;
    evidence.filePath = req.body.filePath || evidence.filePath;
    evidence.hash = req.body.hash || evidence.hash;
    evidence.size = req.body.size || evidence.size;
    evidence.tags = req.body.tags || evidence.tags;
    evidence.metadata = req.body.metadata || evidence.metadata;

    // Add entry to chain of custody for modification
    evidence.chainOfCustody.push({
      user: req.user._id,
      action: 'modified',
      notes: req.body.custodyNotes || 'Evidence metadata updated',
    });

    const updatedEvidence = await evidence.save();
    res.json(updatedEvidence);
  } else {
    res.status(404);
    throw new Error('Evidence not found');
  }
});

// @desc    Delete evidence
// @route   DELETE /api/evidence/:id
// @access  Private/Admin
const deleteEvidence = asyncHandler(async (req, res) => {
  const evidence = await Evidence.findById(req.params.id);

  if (evidence) {
    await Evidence.deleteOne({ _id: req.params.id });
    res.json({ message: 'Evidence removed' });
  } else {
    res.status(404);
    throw new Error('Evidence not found');
  }
});

// @desc    Add custody entry
// @route   POST /api/evidence/:id/custody
// @access  Private
const addCustodyEntry = asyncHandler(async (req, res) => {
  const { action, notes } = req.body;
  const evidence = await Evidence.findById(req.params.id);

  if (evidence) {
    const custodyEntry = {
      user: req.user._id,
      action,
      notes,
    };

    evidence.chainOfCustody.push(custodyEntry);
    await evidence.save();
    
    const updatedEvidence = await Evidence.findById(req.params.id)
      .populate('chainOfCustody.user', 'name email');
    
    res.status(201).json(updatedEvidence);
  } else {
    res.status(404);
    throw new Error('Evidence not found');
  }
});

module.exports = {
  createEvidence,
  getAllEvidence,
  getEvidenceByIncident,
  getEvidenceById,
  updateEvidence,
  deleteEvidence,
  addCustodyEntry,
};