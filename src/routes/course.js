const express = require('express');
const router = express.Router();
const { AppDataSource } = require('../data-source');
const { createCourse, getCourses, getCourseById } = require('../controllers/courseController');

// POST /api/course - Create a new course
router.post('/', createCourse);

// GET /api/course - Get all courses
router.get('/', getCourses);

// GET /api/course/:id - Get course by ID
router.get('/:id', getCourseById);

// GET /api/course/:id/students
router.get('/:id/students', async (req, res) => {
  const courseId = parseInt(req.params.id, 10);

  try {
    // Validate course ID
    if (isNaN(courseId) || courseId <= 0) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const enrollmentRepo = AppDataSource.getRepository('Enrollment');
    const enrollments = await enrollmentRepo.find({
      where: { course: { id: courseId } },
      relations: ['user']
    });
    const students = enrollments.map(e => ({ id: e.user.id, name: e.user.name, email: e.user.email }));
    return res.json({ ok: true, students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;