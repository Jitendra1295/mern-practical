# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication. For production use, implement JWT-based authentication.

## Response Format
All responses follow this format:
```json
{
  "ok": true|false,
  "message": "Success/Error message",
  "data": {} // Optional data object
}
```

## Error Responses
```json
{
  "error": "Error message description"
}
```

---

## User Endpoints

### Create User
**POST** `/user`

Creates a new user in the system.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "domain": "example.com",
  "role": "student"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "domain": "example.com",
    "role": "student"
  }
}
```

**Validation Rules:**
- `name` is required
- `email` is required and must be valid format
- `role` must be one of: `student`, `instructor`, `admin`
- `email` must be unique

### Get All Users
**GET** `/user`

Retrieves all users in the system.

**Response:**
```json
{
  "ok": true,
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "domain": "example.com",
      "role": "student"
    }
  ]
}
```

### Get User by ID
**GET** `/user/:id`

Retrieves a specific user by ID.

**Parameters:**
- `id` (integer) - User ID

**Response:**
```json
{
  "ok": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "domain": "example.com",
    "role": "student"
  }
}
```

### Get User's Courses
**GET** `/user/:id/courses`

Retrieves all courses a user is enrolled in.

**Parameters:**
- `id` (integer) - User ID

**Response:**
```json
{
  "ok": true,
  "courses": [
    {
      "id": 1,
      "title": "Introduction to Programming",
      "instructor": {
        "id": 2,
        "name": "Jane Smith"
      }
    }
  ]
}
```

---

## Course Endpoints

### Create Course
**POST** `/course`

Creates a new course in the system.

**Request Body:**
```json
{
  "title": "Introduction to Programming",
  "domain": "example.com",
  "is_public": true,
  "instructor_id": 2
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Course created successfully",
  "course": {
    "id": 1,
    "title": "Introduction to Programming",
    "domain": "example.com",
    "is_public": true,
    "instructor": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
}
```

**Validation Rules:**
- `title` is required
- `instructor_id` must reference an existing user with role `instructor` or `admin`
- `is_public` defaults to `true`

### Get All Courses
**GET** `/course`

Retrieves all courses in the system.

**Response:**
```json
{
  "ok": true,
  "courses": [
    {
      "id": 1,
      "title": "Introduction to Programming",
      "domain": "example.com",
      "is_public": true,
      "instructor": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    }
  ]
}
```

### Get Course by ID
**GET** `/course/:id`

Retrieves a specific course by ID.

**Parameters:**
- `id` (integer) - Course ID

**Response:**
```json
{
  "ok": true,
  "course": {
    "id": 1,
    "title": "Introduction to Programming",
    "domain": "example.com",
    "is_public": true,
    "instructor": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
}
```

### Get Course Students
**GET** `/course/:id/students`

Retrieves all students enrolled in a specific course.

**Parameters:**
- `id` (integer) - Course ID

**Response:**
```json
{
  "ok": true,
  "students": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

---

## Enrollment Endpoints

### Enroll User in Course
**POST** `/enroll`

Enrolls a user in a course after validating all business rules.

**Request Body:**
```json
{
  "userId": 1,
  "courseId": 1
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Enrolled successfully"
}
```

**Business Rules Validation:**
1. **Domain Match**: Course domain must match user's domain
2. **Max Course Students**: Course cannot have more than 50 students
3. **User Max Enrollments**: User cannot enroll in more than 5 courses
4. **Private Course Email**: Only @example.com users can enroll in private courses
5. **Duplicate Enrollment**: User cannot enroll in the same course twice

**Error Responses:**
```json
{
  "error": "User domain must match course domain (example.com)"
}
```

```json
{
  "error": "Course has reached maximum students (50)"
}
```

```json
{
  "error": "User has reached max enrollments (5)"
}
```

```json
{
  "error": "Only @example.com users can enroll in private courses"
}
```

```json
{
  "error": "User is already enrolled in this course"
}
```

---

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## Example Usage with cURL

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
    "instructor_id": 2
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

### Get User's Courses
```bash
curl http://localhost:3000/api/user/1/courses
```

### Get Course Students
```bash
curl http://localhost:3000/api/course/1/students
```

## Postman Collection

A Postman collection is included in the repository (`mern-practical.postman_collection.json`) with all API endpoints pre-configured for easy testing.
