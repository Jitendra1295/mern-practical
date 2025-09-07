require('reflect-metadata');
require('dotenv').config();
const { AppDataSource } = require('../src/data-source');

async function seedData() {
    try {
        console.log('🌱 Starting data seeding...');

        // Initialize database connection
        await AppDataSource.initialize();
        console.log('✅ Database connected');

        const userRepo = AppDataSource.getRepository('User');
        const courseRepo = AppDataSource.getRepository('Course');

        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('🧹 Clearing existing data...');
        await AppDataSource.query('DELETE FROM enrollments');
        await AppDataSource.query('DELETE FROM courses');
        await AppDataSource.query('DELETE FROM users');
        console.log('✅ Existing data cleared');

        // Create test users
        console.log('👥 Creating test users...');
        const users = [
            // Example.com domain users
            {
                name: 'Alice Johnson',
                email: 'alice@example.com',
                domain: 'example.com',
                role: 'student'
            },
            {
                name: 'Bob Smith',
                email: 'bob@example.com',
                domain: 'example.com',
                role: 'student'
            },
            {
                name: 'Carol Davis',
                email: 'carol@example.com',
                domain: 'example.com',
                role: 'instructor'
            },
            {
                name: 'David Wilson',
                email: 'david@example.com',
                domain: 'example.com',
                role: 'admin'
            },
            {
                name: 'Eva Brown',
                email: 'eva@example.com',
                domain: 'example.com',
                role: 'student'
            },

            // School.edu domain users
            {
                name: 'Frank Miller',
                email: 'frank@school.edu',
                domain: 'school.edu',
                role: 'student'
            },
            {
                name: 'Grace Lee',
                email: 'grace@school.edu',
                domain: 'school.edu',
                role: 'student'
            },
            {
                name: 'Henry Taylor',
                email: 'henry@school.edu',
                domain: 'school.edu',
                role: 'instructor'
            },

            // University.edu domain users
            {
                name: 'Ivy Chen',
                email: 'ivy@university.edu',
                domain: 'university.edu',
                role: 'student'
            },
            {
                name: 'Jack Anderson',
                email: 'jack@university.edu',
                domain: 'university.edu',
                role: 'instructor'
            },

            // Users with no domain (for testing)
            {
                name: 'Kate Martinez',
                email: 'kate@example.com',
                domain: null,
                role: 'student'
            },

            // Users for max enrollment testing (will be enrolled in 5 courses)
            {
                name: 'Liam O\'Connor',
                email: 'liam@example.com',
                domain: 'example.com',
                role: 'student'
            }
        ];

        const createdUsers = [];
        for (const userData of users) {
            const user = userRepo.create(userData);
            const savedUser = await userRepo.save(user);
            createdUsers.push(savedUser);
            console.log(`✅ Created user: ${savedUser.name} (ID: ${savedUser.id})`);
        }

        // Create test courses
        console.log('📚 Creating test courses...');
        const courses = [
            // Public courses
            {
                title: 'Introduction to Programming',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Web Development Fundamentals',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Database Design',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'admin' && u.domain === 'example.com')
            },

            // Private courses (only @example.com users can enroll)
            {
                title: 'Advanced Programming Workshop',
                domain: 'example.com',
                is_public: false,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Exclusive Coding Bootcamp',
                domain: 'example.com',
                is_public: false,
                instructor: createdUsers.find(u => u.role === 'admin' && u.domain === 'example.com')
            },

            // School.edu domain courses
            {
                title: 'School Programming Course',
                domain: 'school.edu',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'school.edu')
            },
            {
                title: 'University Computer Science',
                domain: 'university.edu',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'university.edu')
            },

            // Course with no domain restriction
            {
                title: 'Open Programming Course',
                domain: null,
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },

            // Course for max students testing (will have 50 enrollments)
            {
                title: 'Popular Programming Course',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },

            // Course for max enrollment testing (user will be enrolled in 5 courses)
            {
                title: 'Course 1 for Max Enrollment Test',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Course 2 for Max Enrollment Test',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Course 3 for Max Enrollment Test',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Course 4 for Max Enrollment Test',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            },
            {
                title: 'Course 5 for Max Enrollment Test',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor' && u.domain === 'example.com')
            }
        ];

        const createdCourses = [];
        for (const courseData of courses) {
            const course = courseRepo.create(courseData);
            const savedCourse = await courseRepo.save(course);
            createdCourses.push(savedCourse);
            console.log(`✅ Created course: ${savedCourse.title} (ID: ${savedCourse.id})`);
        }

        // Create some test enrollments
        console.log('🎓 Creating test enrollments...');
        const enrollmentRepo = AppDataSource.getRepository('Enrollment');

        // Alice enrolls in some courses
        const alice = createdUsers.find(u => u.name === 'Alice Johnson');
        const introCourse = createdCourses.find(c => c.title === 'Introduction to Programming');
        const webCourse = createdCourses.find(c => c.title === 'Web Development Fundamentals');

        if (alice && introCourse) {
            const enrollment1 = enrollmentRepo.create({ user: alice, course: introCourse });
            await enrollmentRepo.save(enrollment1);
            console.log(`✅ Alice enrolled in Introduction to Programming`);
        }

        if (alice && webCourse) {
            const enrollment2 = enrollmentRepo.create({ user: alice, course: webCourse });
            await enrollmentRepo.save(enrollment2);
            console.log(`✅ Alice enrolled in Web Development Fundamentals`);
        }

        // Liam enrolls in 5 courses (for max enrollment testing)
        const liam = createdUsers.find(u => u.name === 'Liam O\'Connor');
        const maxEnrollmentCourses = createdCourses.filter(c => c.title.includes('Max Enrollment Test'));

        for (const course of maxEnrollmentCourses) {
            if (liam && course) {
                const enrollment = enrollmentRepo.create({ user: liam, course: course });
                await enrollmentRepo.save(enrollment);
                console.log(`✅ Liam enrolled in ${course.title}`);
            }
        }

        // Create 50 enrollments for the popular course (for max students testing)
        const popularCourse = createdCourses.find(c => c.title === 'Popular Programming Course');
        if (popularCourse) {
            console.log('📊 Creating 50 enrollments for Popular Programming Course...');
            for (let i = 0; i < 50; i++) {
                // Create temporary users for this test
                const tempUser = userRepo.create({
                    name: `Temp User ${i + 1}`,
                    email: `tempuser${i + 1}@example.com`,
                    domain: 'example.com',
                    role: 'student'
                });
                const savedTempUser = await userRepo.save(tempUser);

                const enrollment = enrollmentRepo.create({ user: savedTempUser, course: popularCourse });
                await enrollmentRepo.save(enrollment);
            }
            console.log(`✅ Created 50 enrollments for Popular Programming Course`);
        }

        console.log('\n🎉 Data seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`👥 Users created: ${createdUsers.length}`);
        console.log(`📚 Courses created: ${createdCourses.length}`);
        console.log(`🎓 Enrollments created: ${await enrollmentRepo.count()}`);

        console.log('\n🧪 Test Scenarios Available:');
        console.log('✅ Domain matching (example.com vs school.edu)');
        console.log('✅ Private course email validation (@example.com only)');
        console.log('✅ Max course students (50 limit)');
        console.log('✅ Max user enrollments (5 limit)');
        console.log('✅ Duplicate enrollment prevention');
        console.log('✅ Role-based course creation');
        console.log('✅ Input validation testing');

        console.log('\n🔍 Key Test Data:');
        console.log('👤 Alice Johnson (ID: 1) - example.com student');
        console.log('👤 Frank Miller (ID: 6) - school.edu student');
        console.log('👤 Carol Davis (ID: 3) - example.com instructor');
        console.log('👤 Liam O\'Connor (ID: 12) - enrolled in 5 courses');
        console.log('📚 Introduction to Programming (ID: 1) - example.com public');
        console.log('📚 Advanced Programming Workshop (ID: 4) - example.com private');
        console.log('📚 School Programming Course (ID: 6) - school.edu public');
        console.log('📚 Popular Programming Course (ID: 9) - has 50 students');

    } catch (error) {
        console.error('❌ Error during data seeding:', error);
    } finally {
        // Close database connection
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('🔌 Database connection closed');
        }
    }
}

// Run the seeding function
seedData();
