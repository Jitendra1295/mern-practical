const { AppDataSource } = require('../data-source');

async function createCourse(req, res) {
    const { title, domain, is_public = true, instructor_id } = req.body;

    try {
        // Validate required fields
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Title is required and must be a string' });
        }

        // Validate title length and content
        if (title.trim().length < 3) {
            return res.status(400).json({ error: 'Title must be at least 3 characters long' });
        }

        if (title.trim().length > 200) {
            return res.status(400).json({ error: 'Title must be less than 200 characters' });
        }

        // Validate is_public type
        if (typeof is_public !== 'boolean') {
            return res.status(400).json({ error: 'is_public must be a boolean value' });
        }

        // Validate domain if provided
        if (domain && typeof domain === 'string') {
            const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
            if (!domainRegex.test(domain)) {
                return res.status(400).json({ error: 'Invalid domain format' });
            }
        }

        // Validate instructor_id if provided
        if (instructor_id) {
            const instructorId = parseInt(instructor_id, 10);
            if (isNaN(instructorId)) {
                return res.status(400).json({ error: 'Invalid instructor ID' });
            }

            const userRepo = AppDataSource.getRepository('User');
            const instructor = await userRepo.findOne({ where: { id: instructorId } });

            if (!instructor) {
                return res.status(404).json({ error: 'Instructor not found' });
            }

            // Check if instructor has appropriate role
            if (instructor.role !== 'instructor' && instructor.role !== 'admin') {
                return res.status(400).json({ error: 'User must be an instructor or admin to create courses' });
            }
        }

        const courseRepo = AppDataSource.getRepository('Course');

        // Sanitize inputs
        const sanitizedTitle = title.trim();
        const sanitizedDomain = domain ? domain.toLowerCase().trim() : null;

        // Create new course
        const courseData = {
            title: sanitizedTitle,
            domain: sanitizedDomain,
            is_public
        };

        // Add instructor if provided
        if (instructor_id) {
            const userRepo = AppDataSource.getRepository('User');
            const instructor = await userRepo.findOne({ where: { id: instructor_id } });
            courseData.instructor = instructor;
        }

        const course = courseRepo.create(courseData);
        const savedCourse = await courseRepo.save(course);

        // Fetch the saved course with instructor relation
        const courseWithInstructor = await courseRepo.findOne({
            where: { id: savedCourse.id },
            relations: ['instructor'],
            select: {
                id: true,
                title: true,
                domain: true,
                is_public: true,
                instructor: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        });

        return res.status(201).json({
            ok: true,
            message: 'Course created successfully',
            course: courseWithInstructor
        });

    } catch (err) {
        console.error('Error creating course:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function getCourses(req, res) {
    try {
        const courseRepo = AppDataSource.getRepository('Course');
        const courses = await courseRepo.find({
            relations: ['instructor'],
            select: {
                id: true,
                title: true,
                domain: true,
                is_public: true,
                instructor: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        });

        return res.json({ ok: true, courses });
    } catch (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function getCourseById(req, res) {
    const courseId = parseInt(req.params.id, 10);

    try {
        if (isNaN(courseId)) {
            return res.status(400).json({ error: 'Invalid course ID' });
        }

        const courseRepo = AppDataSource.getRepository('Course');
        const course = await courseRepo.findOne({
            where: { id: courseId },
            relations: ['instructor'],
            select: {
                id: true,
                title: true,
                domain: true,
                is_public: true,
                instructor: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.json({ ok: true, course });
    } catch (err) {
        console.error('Error fetching course:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { createCourse, getCourses, getCourseById };
