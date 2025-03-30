const asyncHandler = require('../middleware/asyncHandler');
const Task = require('../models/taskModel');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const {
    incident,
    title,
    description,
    assignedTo,
    priority,
    dueDate,
    phase,
  } = req.body;

  const task = await Task.create({
    incident,
    title,
    description,
    assignedTo,
    priority,
    dueDate,
    phase,
  });

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400);
    throw new Error('Invalid task data');
  }
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({})
    .populate('incident', 'title')
    .populate('assignedTo', 'name email');
  res.json(tasks);
});

// @desc    Get tasks by incident ID
// @route   GET /api/tasks/incident/:id
// @access  Private
const getTasksByIncident = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ incident: req.params.id })
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
  res.json(tasks);
});

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('incident', 'title')
    .populate('assignedTo', 'name email')
    .populate('notes.user', 'name email');

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    task.status = req.body.status || task.status;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.phase = req.body.phase || task.phase;
    task.dependencies = req.body.dependencies || task.dependencies;

    // If status is being set to 'completed' and there's no completedDate yet
    if (req.body.status === 'completed' && !task.completedDate) {
      task.completedDate = Date.now();
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Add note to task
// @route   POST /api/tasks/:id/notes
// @access  Private
const addTaskNote = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    const note = {
      text,
      user: req.user._id,
    };

    task.notes.push(note);
    await task.save();
    
    const updatedTask = await Task.findById(req.params.id)
      .populate('notes.user', 'name email');
    
    res.status(201).json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Get tasks assigned to user
// @route   GET /api/tasks/user/:id
// @access  Private
const getTasksByUser = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.params.id })
    .populate('incident', 'title')
    .sort({ createdAt: -1 });
  res.json(tasks);
});

module.exports = {
  createTask,
  getTasks,
  getTasksByIncident,
  getTaskById,
  updateTask,
  deleteTask,
  addTaskNote,
  getTasksByUser,
};