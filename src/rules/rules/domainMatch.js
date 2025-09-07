module.exports = async function domainMatch({ user, course }) {
  // If course.domain is set, user's domain must match
  if (!course.domain) return { ok: true };
  if (!user.domain) return { ok: false, message: 'User has no domain set' };
  if (user.domain.toLowerCase() !== course.domain.toLowerCase()) {
    return { ok: false, message: `User domain must match course domain (${course.domain})` };
  }
  return { ok: true };
};