import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Scholarship from './Scholarship.js';

const ScholarshipEligibility = sequelize.define('ScholarshipEligibility', {
  scholarship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Scholarship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  eligibility: DataTypes.TEXT,
}, {
  tableName: 'scholarship_eligibility',
  timestamps: false,
});

export default ScholarshipEligibility;
