import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import University from './University.js';

const UniversityStudentAchievement = sequelize.define('UniversityStudentAchievement', {
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING(512),
  date: DataTypes.DATE,
}, {
  tableName: 'university_student_achievement',
  timestamps: false,
});

export default UniversityStudentAchievement;
