module.exports = async function maxCourseStudents({ repos, course }) {
  // Global limit: max 50 students per course
  const LIMIT = 50;
  const count = await repos.enrollmentRepo.count({ where: { course: { id: course.id } } });
  if (count >= LIMIT) return { ok: false, message: `Course has reached maximum students (${LIMIT})` };
  return { ok: true };
};