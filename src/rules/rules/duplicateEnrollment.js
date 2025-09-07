module.exports = async function duplicateEnrollment({ repos, user, course }) {
    // Check if user is already enrolled in this course
    const existingEnrollment = await repos.enrollmentRepo.findOne({
        where: {
            user: { id: user.id },
            course: { id: course.id }
        }
    });

    if (existingEnrollment) {
        return {
            ok: false,
            message: `User is already enrolled in this course`
        };
    }

    return { ok: true };
};

