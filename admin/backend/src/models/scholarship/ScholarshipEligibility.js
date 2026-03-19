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

// Define association
ScholarshipEligibility.belongsTo(Scholarship, { foreignKey: 'scholarship_id' });
Scholarship.hasMany(ScholarshipEligibility, { foreignKey: 'scholarship_id' });

export default ScholarshipEligibility;
