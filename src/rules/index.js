const domainMatch = require('./rules/domainMatch');
const maxCourseStudents = require('./rules/maxCourseStudents');
const userMaxEnrollments = require('./rules/userMaxEnrollments');
const privateCourseEmailCheck = require('./rules/privateCourseEmailCheck');
const duplicateEnrollment = require('./rules/duplicateEnrollment');

const rules = [
  duplicateEnrollment,
  domainMatch,
  privateCourseEmailCheck,
  maxCourseStudents,
  userMaxEnrollments
];

module.exports = async function runRules(context) {
  for (const rule of rules) {
    const result = await rule(context);
    if (!result.ok) return result;
  }
  return { ok: true };
};