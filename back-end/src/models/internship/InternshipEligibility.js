import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Internship from './Internship.js';

const InternshipEligibility = sequelize.define('InternshipEligibility', {
  internship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Internship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  eligibility: DataTypes.TEXT,
}, {
  tableName: 'internship_eligibility',
  timestamps: false,
});

export default InternshipEligibility;
