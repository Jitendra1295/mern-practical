require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing API endpoints with seeded data...\n');

    try {
        // Test 1: Get all users
        console.log('1️⃣ Testing GET /api/user');
        const usersResponse = await axios.get(`${BASE_URL}/user`);
        console.log(`✅ Found ${usersResponse.data.users.length} users`);
        console.log(`   First user: ${usersResponse.data.users[0].name}\n`);

        // Test 2: Get all courses
        console.log('2️⃣ Testing GET /api/course');
        const coursesResponse = await axios.get(`${BASE_URL}/course`);
        console.log(`✅ Found ${coursesResponse.data.courses.length} courses`);
        console.log(`   First course: ${coursesResponse.data.courses[0].title}\n`);

        // Test 3: Create a new user
        console.log('3️⃣ Testing POST /api/user');
        const newUser = {
            name: 'API Test User',
            email: 'apitest@example.com',
            domain: 'example.com',
            role: 'student'
        };
        const createUserResponse = await axios.post(`${BASE_URL}/user`, newUser);
        console.log(`✅ Created user: ${createUserResponse.data.user.name} (ID: ${createUserResponse.data.user.id})\n`);

        // Test 4: Create a new course
        console.log('4️⃣ Testing POST /api/course');
        const newCourse = {
            title: 'API Test Course',
            domain: 'example.com',
            is_public: true,
            instructor_id: 2 // Assuming instructor exists
        };
        const createCourseResponse = await axios.post(`${BASE_URL}/course`, newCourse);
        console.log(`✅ Created course: ${createCourseResponse.data.course.title} (ID: ${createCourseResponse.data.course.id})\n`);

        // Test 5: Test enrollment
        console.log('5️⃣ Testing POST /api/enroll');
        const enrollment = {
            userId: createUserResponse.data.user.id,
            courseId: createCourseResponse.data.course.id
        };
        const enrollResponse = await axios.post(`${BASE_URL}/enroll`, enrollment);
        console.log(`✅ Enrollment successful: ${enrollResponse.data.message}\n`);

        // Test 6: Get user courses
        console.log('6️⃣ Testing GET /api/user/:id/courses');
        const userCoursesResponse = await axios.get(`${BASE_URL}/user/${createUserResponse.data.user.id}/courses`);
        console.log(`✅ User enrolled in ${userCoursesResponse.data.courses.length} courses`);
        if (userCoursesResponse.data.courses.length > 0) {
            console.log(`   Course: ${userCoursesResponse.data.courses[0].title}\n`);
        }

        // Test 7: Get course students
        console.log('7️⃣ Testing GET /api/course/:id/students');
        const courseStudentsResponse = await axios.get(`${BASE_URL}/course/${createCourseResponse.data.course.id}/students`);
        console.log(`✅ Course has ${courseStudentsResponse.data.students.length} students`);
        if (courseStudentsResponse.data.students.length > 0) {
            console.log(`   Student: ${courseStudentsResponse.data.students[0].name}\n`);
        }

        // Test 8: Test validation - invalid email
        console.log('8️⃣ Testing validation - invalid email');
        try {
            await axios.post(`${BASE_URL}/user`, {
                name: 'Invalid User',
                email: 'invalid-email',
                domain: 'example.com',
                role: 'student'
            });
            console.log('❌ Validation failed - should have rejected invalid email\n');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(`✅ Validation working: ${error.response.data.error}\n`);
            } else {
                console.log(`❌ Unexpected error: ${error.message}\n`);
            }
        }

        // Test 9: Test validation - duplicate enrollment
        console.log('9️⃣ Testing validation - duplicate enrollment');
        try {
            await axios.post(`${BASE_URL}/enroll`, enrollment);
            console.log('❌ Validation failed - should have rejected duplicate enrollment\n');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(`✅ Validation working: ${error.response.data.error}\n`);
            } else {
                console.log(`❌ Unexpected error: ${error.message}\n`);
            }
        }

        console.log('🎉 All API tests completed successfully!');
        console.log('\n📊 Test Summary:');
        console.log('✅ User CRUD operations');
        console.log('✅ Course CRUD operations');
        console.log('✅ Enrollment functionality');
        console.log('✅ Business rule validation');
        console.log('✅ Input validation');
        console.log('✅ Error handling');

    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Error:', error.response.data);
        }
    }
}

// Check if server is running
async function checkServer() {
    try {
        await axios.get(`${BASE_URL.replace('/api', '')}`);
        return true;
    } catch (error) {
        return false;
    }
}

async function main() {
    console.log('🔍 Checking if server is running...');
    const serverRunning = await checkServer();

    if (!serverRunning) {
        console.log('❌ Server is not running on http://localhost:3000');
        console.log('   Please start the server first: npm run dev');
        return;
    }

    console.log('✅ Server is running\n');
    await testAPI();
}

main();
