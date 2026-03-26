import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Scholarship from './Scholarship.js';

const ScholarshipBenefit = sequelize.define('ScholarshipBenefit', {
  scholarship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Scholarship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  benefit: DataTypes.TEXT,
}, {
  tableName: 'scholarship_benefit',
  timestamps: false,
});

// Define association
ScholarshipBenefit.belongsTo(Scholarship, { foreignKey: 'scholarship_id' });
Scholarship.hasMany(ScholarshipBenefit, { foreignKey: 'scholarship_id' });

export default ScholarshipBenefit;
