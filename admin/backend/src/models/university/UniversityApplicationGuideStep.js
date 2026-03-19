import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import University from './University.js';

const UniversityApplicationGuideStep = sequelize.define('UniversityApplicationGuideStep', {
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  step_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
  tableName: 'university_application_guide_step',
  timestamps: false,
});

export default UniversityApplicationGuideStep;
