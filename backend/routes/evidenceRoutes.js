const express = require('express');
const router = express.Router();
const {
  createEvidence,
  getAllEvidence,
  getEvidenceByIncident,
  getEvidenceById,
  updateEvidence,
  deleteEvidence,
  addCustodyEntry,
} = require('../controllers/evidenceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createEvidence).get(protect, getAllEvidence);
router.route('/incident/:id').get(protect, getEvidenceByIncident);
router.route('/:id/custody').post(protect, addCustodyEntry);
router
  .route('/:id')
  .get(protect, getEvidenceById)
  .put(protect, updateEvidence)
  .delete(protect, admin, deleteEvidence);

module.exports = router;