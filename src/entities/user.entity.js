const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    name: {
      type: 'text'
    },
    email: {
      type: 'text',
      unique: true,
      nullable: true
    },
    domain: {
      type: 'text',
      nullable: true
    },
    role: {
      type: 'text',
      default: 'student'
    }
  },
  relations: {
    enrollments: {
      type: 'one-to-many',
      target: 'Enrollment',
      inverseSide: 'user'
    },
    courses: {
      type: 'one-to-many',
      target: 'Course',
      inverseSide: 'instructor'
    }
  }
});