require('reflect-metadata');
require('dotenv').config();
const { AppDataSource } = require('../src/data-source');

async function quickSeed() {
    try {
        console.log('🚀 Quick seeding for testing...');

        await AppDataSource.initialize();
        console.log('✅ Database connected');

        const userRepo = AppDataSource.getRepository('User');
        const courseRepo = AppDataSource.getRepository('Course');

        // Create minimal test data
        console.log('👥 Creating essential test users...');

        // Create users for testing
        const users = [
            {
                name: 'Test Student',
                email: 'student@example.com',
                domain: 'example.com',
                role: 'student'
            },
            {
                name: 'Test Instructor',
                email: 'instructor@example.com',
                domain: 'example.com',
                role: 'instructor'
            },
            {
                name: 'School Student',
                email: 'student@school.edu',
                domain: 'school.edu',
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

        console.log('📚 Creating essential test courses...');

        // Create courses for testing
        const courses = [
            {
                title: 'Test Public Course',
                domain: 'example.com',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor')
            },
            {
                title: 'Test Private Course',
                domain: 'example.com',
                is_public: false,
                instructor: createdUsers.find(u => u.role === 'instructor')
            },
            {
                title: 'School Course',
                domain: 'school.edu',
                is_public: true,
                instructor: createdUsers.find(u => u.role === 'instructor')
            }
        ];

        const createdCourses = [];
        for (const courseData of courses) {
            const course = courseRepo.create(courseData);
            const savedCourse = await courseRepo.save(course);
            createdCourses.push(savedCourse);
            console.log(`✅ Created course: ${savedCourse.title} (ID: ${savedCourse.id})`);
        }

        console.log('\n🎉 Quick seeding completed!');
        console.log('\n🧪 Ready for testing:');
        console.log('👤 Test Student (ID: 1) - example.com student');
        console.log('👤 Test Instructor (ID: 2) - example.com instructor');
        console.log('👤 School Student (ID: 3) - school.edu student');
        console.log('📚 Test Public Course (ID: 1) - example.com public');
        console.log('📚 Test Private Course (ID: 2) - example.com private');
        console.log('📚 School Course (ID: 3) - school.edu public');

    } catch (error) {
        console.error('❌ Error during quick seeding:', error);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('🔌 Database connection closed');
        }
    }
}

quickSeed();
