const asyncHandler = require('../middleware/asyncHandler');
const Incident = require('../models/incidentModel');

// @desc    Create a new incident
// @route   POST /api/incidents
// @access  Private
const createIncident = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    affectedSystems,
    severity,
    startDate,
    coordinator,
    team,
    priority,
    incidentType,
    impactAssessment,
    tags,
  } = req.body;

  const incident = await Incident.create({
    title,
    description,
    affectedSystems,
    severity,
    startDate,
    coordinator,
    team,
    priority,
    incidentType,
    impactAssessment,
    tags,
  });

  if (incident) {
    res.status(201).json(incident);
  } else {
    res.status(400);
    throw new Error('Invalid incident data');
  }
});

// @desc    Get all incidents
// @route   GET /api/incidents
// @access  Private
const getIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find({})
    .populate('coordinator', 'name email')
    .populate('team', 'name email');
  res.json(incidents);
});

// @desc    Get incident by ID
// @route   GET /api/incidents/:id
// @access  Private
const getIncidentById = asyncHandler(async (req, res) => {
  const incident = await Incident.findById(req.params.id)
    .populate('coordinator', 'name email')
    .populate('team', 'name email');

  if (incident) {
    res.json(incident);
  } else {
    res.status(404);
    throw new Error('Incident not found');
  }
});

// @desc    Update incident
// @route   PUT /api/incidents/:id
// @access  Private
const updateIncident = asyncHandler(async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (incident) {
    incident.title = req.body.title || incident.title;
    incident.description = req.body.description || incident.description;
    incident.affectedSystems = req.body.affectedSystems || incident.affectedSystems;
    incident.status = req.body.status || incident.status;
    incident.severity = req.body.severity || incident.severity;
    incident.startDate = req.body.startDate || incident.startDate;
    incident.endDate = req.body.endDate || incident.endDate;
    incident.coordinator = req.body.coordinator || incident.coordinator;
    incident.team = req.body.team || incident.team;
    incident.priority = req.body.priority || incident.priority;
    incident.incidentType = req.body.incidentType || incident.incidentType;
    incident.impactAssessment = req.body.impactAssessment || incident.impactAssessment;
    incident.notificationStatus = req.body.notificationStatus || incident.notificationStatus;
    incident.tags = req.body.tags || incident.tags;

    const updatedIncident = await incident.save();
    res.json(updatedIncident);
  } else {
    res.status(404);
    throw new Error('Incident not found');
  }
});

// @desc    Delete incident
// @route   DELETE /api/incidents/:id
// @access  Private/Admin
const deleteIncident = asyncHandler(async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (incident) {
    await Incident.deleteOne({ _id: req.params.id });
    res.json({ message: 'Incident removed' });
  } else {
    res.status(404);
    throw new Error('Incident not found');
  }
});

// @desc    Get active incidents
// @route   GET /api/incidents/active
// @access  Private
const getActiveIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find({ status: { $ne: 'closed' } })
    .populate('coordinator', 'name email')
    .sort({ createdAt: -1 });
  res.json(incidents);
});

// @desc    Update incident status
// @route   PUT /api/incidents/:id/status
// @access  Private
const updateIncidentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const incident = await Incident.findById(req.params.id);

  if (incident) {
    incident.status = status;
    
    // If status is 'closed', set endDate to now
    if (status === 'closed' && !incident.endDate) {
      incident.endDate = Date.now();
    }

    const updatedIncident = await incident.save();
    res.json(updatedIncident);
  } else {
    res.status(404);
    throw new Error('Incident not found');
  }
});

module.exports = {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
  getActiveIncidents,
  updateIncidentStatus,
};