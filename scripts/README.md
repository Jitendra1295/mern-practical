# Data Seeding Scripts

This directory contains scripts to populate your database with test data for comprehensive API testing.

## Available Scripts

### 1. Full Data Seeding (`seedData.js`)
**Command:** `npm run seed`

Creates comprehensive test data including:
- **12 test users** with different roles and domains
- **14 test courses** with various configurations
- **Pre-configured enrollments** for testing business rules
- **50 enrollments** for max course capacity testing
- **5 enrollments** for max user enrollment testing

**Test Scenarios Covered:**
- ✅ Domain matching validation
- ✅ Private course email restrictions
- ✅ Max course students (50 limit)
- ✅ Max user enrollments (5 limit)
- ✅ Duplicate enrollment prevention
- ✅ Role-based course creation

### 2. Quick Data Seeding (`quickSeed.js`)
**Command:** `npm run seed:quick`

Creates minimal test data for basic testing:
- **3 test users** (student, instructor, school student)
- **3 test courses** (public, private, school domain)

**Perfect for:**
- Quick API testing
- Development environment setup
- Basic validation testing

## Usage

### Prerequisites
1. Ensure your database is set up and migrations are run:
   ```bash
   npm run migration:run
   ```

2. Make sure your `.env` file has the correct `DATABASE_URL`

### Running the Scripts

#### Full Seeding (Recommended for comprehensive testing)
```bash
npm run seed
```

#### Quick Seeding (For basic testing)
```bash
npm run seed:quick
```

## Test Data Overview

### Users Created by Full Seeding

| ID | Name | Email | Domain | Role | Purpose |
|----|------|-------|--------|------|---------|
| 1 | Alice Johnson | alice@example.com | example.com | student | Basic testing |
| 2 | Bob Smith | bob@example.com | example.com | student | Basic testing |
| 3 | Carol Davis | carol@example.com | example.com | instructor | Course creation |
| 4 | David Wilson | david@example.com | example.com | admin | Admin testing |
| 5 | Eva Brown | eva@example.com | example.com | student | Basic testing |
| 6 | Frank Miller | frank@school.edu | school.edu | student | Domain testing |
| 7 | Grace Lee | grace@school.edu | school.edu | student | Domain testing |
| 8 | Henry Taylor | henry@school.edu | school.edu | instructor | School courses |
| 9 | Ivy Chen | ivy@university.edu | university.edu | student | Multi-domain |
| 10 | Jack Anderson | jack@university.edu | university.edu | instructor | Multi-domain |
| 11 | Kate Martinez | kate@example.com | null | student | No domain testing |
| 12 | Liam O'Connor | liam@example.com | example.com | student | Max enrollment (5 courses) |

### Courses Created by Full Seeding

| ID | Title | Domain | Public | Instructor | Purpose |
|----|-------|--------|--------|------------|---------|
| 1 | Introduction to Programming | example.com | ✅ | Carol | Basic enrollment |
| 2 | Web Development Fundamentals | example.com | ✅ | Carol | Basic enrollment |
| 3 | Database Design | example.com | ✅ | David | Admin instructor |
| 4 | Advanced Programming Workshop | example.com | ❌ | Carol | Private course testing |
| 5 | Exclusive Coding Bootcamp | example.com | ❌ | David | Private course testing |
| 6 | School Programming Course | school.edu | ✅ | Henry | Domain testing |
| 7 | University Computer Science | university.edu | ✅ | Jack | Multi-domain |
| 8 | Open Programming Course | null | ✅ | Carol | No domain restriction |
| 9 | Popular Programming Course | example.com | ✅ | Carol | Max students (50) |
| 10-14 | Course X for Max Enrollment Test | example.com | ✅ | Carol | Max enrollment (5) |

## Testing Scenarios

### 1. Domain Matching
- **Success:** User with `example.com` domain enrolling in `example.com` course
- **Failure:** User with `school.edu` domain enrolling in `example.com` course

### 2. Private Course Email Check
- **Success:** User with `@example.com` email enrolling in private course
- **Failure:** User with `@school.edu` email enrolling in private course

### 3. Max Course Students
- **Test:** Try to enroll in "Popular Programming Course" (already has 50 students)
- **Expected:** Error message about course being full

### 4. Max User Enrollments
- **Test:** Try to enroll Liam O'Connor in another course (already has 5)
- **Expected:** Error message about user reaching max enrollments

### 5. Duplicate Enrollment
- **Test:** Try to enroll Alice in "Introduction to Programming" again
- **Expected:** Error message about duplicate enrollment

### 6. Role-based Course Creation
- **Success:** Instructor or admin creating courses
- **Failure:** Student trying to create courses

## Postman Collection Integration

The seeded data works perfectly with the comprehensive Postman collection:

1. **Import** `mern-practical.postman_collection.json` into Postman
2. **Run** the seeding script: `npm run seed`
3. **Execute** the Postman tests using the seeded data
4. **Verify** all validation scenarios work correctly

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `.env` file has correct `DATABASE_URL`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Migration Errors**
   - Run migrations first: `npm run migration:run`
   - Check migration status: `npm run migration:show`

3. **Permission Errors**
   - Ensure database user has CREATE/INSERT permissions
   - Check if tables exist in the database

### Resetting Data

To clear all data and start fresh:
```bash
# Clear all data
npm run migration:revert
npm run migration:run
npm run seed
```

## Customization

You can modify the scripts to:
- Add more test users with specific roles
- Create courses with different configurations
- Set up specific enrollment scenarios
- Add data for additional testing requirements

The scripts are designed to be easily customizable for your specific testing needs.
