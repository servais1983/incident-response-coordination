const express = require('express');
const router = express.Router();
const {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
  getActiveIncidents,
  updateIncidentStatus,
} = require('../controllers/incidentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createIncident).get(protect, getIncidents);
router.route('/active').get(protect, getActiveIncidents);
router.route('/:id/status').put(protect, updateIncidentStatus);
router
  .route('/:id')
  .get(protect, getIncidentById)
  .put(protect, updateIncident)
  .delete(protect, admin, deleteIncident);

module.exports = router;