module.exports = async function userMaxEnrollments({ repos, user }) {
  const MAX = 5; // example
  const count = await repos.enrollmentRepo.count({ where: { user: { id: user.id } } });
  if (count >= MAX) return { ok: false, message: `User has reached max enrollments (${MAX})` };
  return { ok: true };
};