const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Course',
  tableName: 'courses',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    title: {
      type: 'text'
    },
    domain: {
      type: 'text',
      nullable: true
    },
    is_public: {
      type: 'boolean',
      default: true
    }
  },
  relations: {
    enrollments: {
      type: 'one-to-many',
      target: 'Enrollment',
      inverseSide: 'course'
    },
    instructor: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'instructor_id' },
      nullable: true,
      onDelete: 'SET NULL'
    }
  }
});