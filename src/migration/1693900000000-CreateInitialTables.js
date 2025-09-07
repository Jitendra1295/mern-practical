module.exports = class CreateInitialTables1693900000000 {
  name = 'CreateInitialTables1693900000000'

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "name" text NOT NULL,
      "email" text UNIQUE,
      "domain" text,
      "role" text DEFAULT 'student'
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "courses" (
      "id" SERIAL PRIMARY KEY,
      "title" text NOT NULL,
      "domain" text,
      "is_public" boolean DEFAULT true,
      "instructor_id" integer REFERENCES users(id) ON DELETE SET NULL
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "enrollments" (
      "id" SERIAL PRIMARY KEY,
      "user_id" integer REFERENCES users(id) ON DELETE CASCADE,
      "course_id" integer REFERENCES courses(id) ON DELETE CASCADE,
      "enrolled_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
    )`);

    // sample users
    await queryRunner.query(`INSERT INTO users (name, email, domain, role)
      SELECT 'Alice', 'alice@example.com', 'example.com', 'student' WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='alice@example.com')`);

    await queryRunner.query(`INSERT INTO users (name, email, domain, role)
      SELECT 'Bob', 'bob@school.edu', 'school.edu', 'student' WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='bob@school.edu')`);

    await queryRunner.query(`INSERT INTO users (name, email, domain, role)
      SELECT 'Carol', 'carol@school.edu', 'school.edu', 'instructor' WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='carol@school.edu')`);

    // find Carol id for instructor assignment (may be null if not present)
    const carol = await queryRunner.query(`SELECT id FROM users WHERE email='carol@school.edu' LIMIT 1`);
    const carolId = carol && carol[0] ? carol[0].id : null;

    // sample courses, set instructor_id if available
    await queryRunner.query(`INSERT INTO courses (title, domain, is_public, instructor_id)
      SELECT 'Intro to Node', NULL, true, ${carolId ? carolId : 'NULL'} WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title='Intro to Node')`);

    await queryRunner.query(`INSERT INTO courses (title, domain, is_public, instructor_id)
      SELECT 'School-only Course', 'school.edu', true, ${carolId ? carolId : 'NULL'} WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title='School-only Course')`);

    await queryRunner.query(`INSERT INTO courses (title, domain, is_public, instructor_id)
      SELECT 'Private Workshop', NULL, false, ${carolId ? carolId : 'NULL'} WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title='Private Workshop')`);
  }

  async down(queryRunner) {
    await queryRunner.query('DROP TABLE IF EXISTS "enrollments"');
    await queryRunner.query('DROP TABLE IF EXISTS "courses"');
    await queryRunner.query('DROP TABLE IF EXISTS "users"');
  }
}