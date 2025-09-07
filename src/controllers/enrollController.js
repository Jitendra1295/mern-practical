const { AppDataSource } = require('../data-source');
const runRules = require('../rules');

async function enroll(req, res) {
  const { userId, courseId } = req.body;

  try {
    // Validate required fields
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }

    // Validate userId type and format
    const userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum) || userIdNum <= 0) {
      return res.status(400).json({ error: 'userId must be a positive integer' });
    }

    // Validate courseId type and format
    const courseIdNum = parseInt(courseId, 10);
    if (isNaN(courseIdNum) || courseIdNum <= 0) {
      return res.status(400).json({ error: 'courseId must be a positive integer' });
    }

    const userRepo = AppDataSource.getRepository('User');
    const courseRepo = AppDataSource.getRepository('Course');
    const enrollmentRepo = AppDataSource.getRepository('Enrollment');

    const user = await userRepo.findOne({ where: { id: userIdNum } });
    const course = await courseRepo.findOne({ where: { id: courseIdNum }, relations: ['instructor'] });

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const context = { db: AppDataSource, user, course, input: { userId, courseId }, repos: { userRepo, courseRepo, enrollmentRepo } };
    const ruleResult = await runRules(context);
    if (!ruleResult.ok) return res.status(400).json({ error: ruleResult.message });

    const enrollment = enrollmentRepo.create({ user, course });
    await enrollmentRepo.save(enrollment);

    return res.json({ ok: true, message: 'Enrolled successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { enroll };