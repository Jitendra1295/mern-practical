const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Enrollment',
  tableName: 'enrollments',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    enrolled_at: {
      type: 'timestamp with time zone',
      createDate: false,
      default: () => 'NOW()'
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      nullable: false,
      onDelete: 'CASCADE'
    },
    course: {
      type: 'many-to-one',
      target: 'Course',
      joinColumn: { name: 'course_id' },
      nullable: false,
      onDelete: 'CASCADE'
    }
  }
});