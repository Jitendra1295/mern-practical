const express = require('express');
const router = express.Router();
const { AppDataSource } = require('../data-source');
const { createUser, getUsers, getUserById } = require('../controllers/userController');

// POST /api/user - Create a new user
router.post('/', createUser);

// GET /api/user - Get all users
router.get('/', getUsers);

// GET /api/user/:id - Get user by ID
router.get('/:id', getUserById);

// GET /api/user/:id/courses
router.get('/:id/courses', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    // Validate user ID
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const enrollmentRepo = AppDataSource.getRepository('Enrollment');
    const enrollments = await enrollmentRepo.find({
      where: { user: { id: userId } },
      relations: ['course', 'course.instructor']
    });
    const courses = enrollments.map(e => ({
      id: e.course.id,
      title: e.course.title,
      instructor: e.course.instructor ? { id: e.course.instructor.id, name: e.course.instructor.name } : null
    }));
    return res.json({ ok: true, courses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;