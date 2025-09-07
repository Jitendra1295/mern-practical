# MERN Stack Practical - Course Enrollment System

A comprehensive Node.js + Express backend API for a mini course enrollment system with a custom business logic engine, backed by PostgreSQL database using TypeORM.

## 🚀 Features

- **Course Enrollment System** with business rule validation
- **Modular Rule Engine** for enrollment validation
- **User & Course Management** with CRUD operations
- **PostgreSQL Database** with TypeORM
- **Comprehensive API** with proper error handling
- **Unit Tests** for rule engine
- **Migration System** for database schema management

## 📋 System Requirements

- Node.js (v22 or higher)
- npm 

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Jitendra1295/mern-practical.git
cd mern-practical
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Option A: Using Environment Variables (Recommended)
1. Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/course_enrollment_db
PORT=3000
NODE_ENV=development
```

2. Create the database:
```sql
CREATE DATABASE course_enrollment_db;
```

#### Option B: Using SQL Schema
1. Create the database:
```sql
CREATE DATABASE course_enrollment_db;
```

2. Run the SQL schema:
```bash
psql -U username -d course_enrollment_db -f src/models/schema.sql
```

### 4. Database Migration Setup

#### Run Migrations
```bash
# Run all pending migrations
npm run migration:run

# Check migration status
npm run migration:show

# Revert last migration (if needed)
npm run migration:revert
```

### 5. Start the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Endpoints

### User Management
- `POST /api/user` - Create a new user
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `GET /api/user/:id/courses` - Get courses enrolled by user

### Course Management
- `POST /api/course` - Create a new course
- `GET /api/course` - Get all courses
- `GET /api/course/:id` - Get course by ID
- `GET /api/course/:id/students` - Get students enrolled in course

### Enrollment
- `POST /api/enroll` - Enroll user in course (with business rule validation)

## 🏗️ System Architecture

### Database Schema
- **Users**: `id`, `name`, `email`, `domain`, `role`
- **Courses**: `id`, `title`, `domain`, `is_public`, `instructor_id`
- **Enrollments**: `id`, `user_id`, `course_id`, `enrolled_at`

### Business Rules Engine
The system includes a modular rule engine that validates enrollments:

1. **Domain Match Rule** - Course domain must match user's domain
2. **Max Course Students Rule** - Maximum 50 students per course
3. **User Max Enrollments Rule** - User cannot enroll in more than 5 courses
4. **Private Course Email Check** - Only @example.com users for private courses
5. **Duplicate Enrollment Rule** - Prevents duplicate enrollments

### Project Structure
```
src/
├── controllers/          # Request handlers
├── entities/            # TypeORM entity definitions
├── routes/              # Express route definitions
├── rules/               # Business logic rules engine
├── migration/           # Database migration files
├── data-source.js       # TypeORM configuration
└── index.js            # Application entry point
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The tests cover:
- Domain matching validation
- Private course email validation
- Duplicate enrollment prevention
- Successful enrollment scenarios

## 📝 API Usage Examples

### Create a User
```bash
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "domain": "example.com",
    "role": "student"
  }'
```

### Create a Course
```bash
curl -X POST http://localhost:3000/api/course \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Programming",
    "domain": "example.com",
    "is_public": true,
    "instructor_id": 1
  }'
```

### Enroll User in Course
```bash
curl -X POST http://localhost:3000/api/enroll \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "courseId": 1
  }'
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Database Configuration
The system uses TypeORM with PostgreSQL. Configuration is in `src/data-source.js`.

## 🔧 Current Implementation Details

### Business Rules Engine
The system implements a modular rule engine with the following validation rules:

1. **Domain Match Rule** - Course domain must match user's domain
2. **Max Course Students Rule** - Maximum 50 students per course  
3. **User Max Enrollments Rule** - User cannot enroll in more than 5 courses
4. **Private Course Email Check** - Only @example.com users for private courses
5. **Duplicate Enrollment Rule** - Prevents duplicate enrollments

### Database Features
- TypeORM entities with proper relationships
- Migration system for schema management
- Foreign key constraints and cascading deletes
- Timestamp tracking for enrollments
