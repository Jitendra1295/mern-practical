module.exports = async function privateCourseEmailCheck({ user, course }) {
  // If course is not public, only users with @example.com emails can enroll
  if (course.is_public) return { ok: true };
  if (!user.email) return { ok: false, message: 'User has no email' };
  if (!user.email.toLowerCase().endsWith('@example.com')) return { ok: false, message: 'Only @example.com users can enroll in private courses' };
  return { ok: true };
};