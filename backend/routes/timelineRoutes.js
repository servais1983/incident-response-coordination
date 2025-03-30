const express = require('express');
const router = express.Router();
const {
  createTimelineEvent,
  getAllTimelineEvents,
  getTimelineByIncident,
  getTimelineEventById,
  updateTimelineEvent,
  deleteTimelineEvent,
  getTimelineEventsByCategory,
} = require('../controllers/timelineController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTimelineEvent).get(protect, getAllTimelineEvents);
router.route('/incident/:id').get(protect, getTimelineByIncident);
router.route('/category/:category').get(protect, getTimelineEventsByCategory);
router
  .route('/:id')
  .get(protect, getTimelineEventById)
  .put(protect, updateTimelineEvent)
  .delete(protect, deleteTimelineEvent);

module.exports = router;