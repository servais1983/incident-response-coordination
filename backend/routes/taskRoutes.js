const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTasksByIncident,
  getTaskById,
  updateTask,
  deleteTask,
  addTaskNote,
  getTasksByUser,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTask).get(protect, getTasks);
router.route('/incident/:id').get(protect, getTasksByIncident);
router.route('/user/:id').get(protect, getTasksByUser);
router.route('/:id/notes').post(protect, addTaskNote);
router
  .route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;